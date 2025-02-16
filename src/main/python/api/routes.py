from fastapi import APIRouter
from models.text_generator import generate_text
from api.calculate_data_uniqueness import calculate_uniqueness_score
from api.analyze_market_data import analyze_market_demand
from fastapi import FastAPI, Depends, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from bson import ObjectId
from passlib.context import CryptContext
import jwt
import datetime
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from models.pitch_generator import generate_pitch
from models.business_plan import generate_business_plan

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017")
#client = MongoClient("mongodb+srv://saloneevelonde:FczHrpkg8u6qOeMv@cluster0.z6ubj.mongodb.net/", tls=True, tlsAllowInvalidCertificates=True, ssl_cert_reqs=ssl.CERT_NONE)
db = client["invest_nexus"]
users_collection = db["users"]

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

class User(BaseModel):
    username: str
    password: str

class SignupRequest(BaseModel):
    username: str
    password: str
    role: str 

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/generate-text")
async def generate_text_api(prompt: dict):
    return {"generated_text": generate_text(prompt['prompt'])}


@router.post("/login/")
async def login(user: User):
    db_user = users_collection.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    token = create_access_token({"sub": user.username})
    role = db_user.get("role", "user")  # Default role is 'user' if not set
    
    return {"access_token": token, "token_type": "bearer", "role": role}

@router.post("/signup/")
async def signup(user: SignupRequest):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")

    if user.role not in ["founder", "investor"]:
        raise HTTPException(status_code=400, detail="Invalid role selected")

    hashed_password = pwd_context.hash(user.password)
    users_collection.insert_one({"username": user.username, "password": hashed_password, "role": user.role})

    return {"message": "User registered successfully", "role": user.role}

@router.post("/data-unique")
async def generate_text_api(prompt: dict):
    return {"generated_score": calculate_uniqueness_score(prompt['prompt'])}

@router.post("/market-score")
async def generate_market_score(prompt: dict):
    return {"generated_score": analyze_market_demand(prompt['prompt'])}


founders_collection = db["founders"]

class FounderInput(BaseModel):
    name: str
    age: int
    location: str
    industry: str
    startupStage: str
    fundingStatus: str
    skills: list[str]
    cofounderSkills: list[str]
    collaborationStyle: str
    availability: str
    locationPref: str

@router.post("/add-or-update-founder/")
async def add_or_update_founder(founder: FounderInput):
    existing_founder = founders_collection.find_one({"name": founder.name})
    if existing_founder:
        # Update the existing founder
        founders_collection.update_one({"name": founder.name}, {"$set": founder.dict()})
        return {"message": "Founder updated successfully"}
    else:
        # Add new founder
        founders_collection.insert_one(founder.dict())
        return {"message": "Founder added successfully"}

# Function to get all founders from the database
def get_founders(name: str):
    founders = list(founders_collection.find({"name": {"$ne": name}}))
    return founders

# Convert text-based data into numeric vectors for matching (can be enhanced based on actual use case)
def vectorize(founder):
    return np.array([
        founder.get('age', 0),  # Age
        len(founder.get('location', '')),  # Location length
        len(founder.get('industry', '')),  # Industry length
        len(founder.get('startupStage', '')),  # Startup stage length
        len(founder.get('fundingStatus', '')),  # Funding status length
        len(founder.get('skills', [])),  # Skills count
        len(founder.get('cofounderSkills', [])),  # Cofounder skills count
        len(founder.get('collaborationStyle', '')),  # Work style length
        len(founder.get('availability', '')),  # Commitment length
        len(founder.get('locationPref', ''))   # Location preference length
    ]).reshape(1, -1)

@router.post("/match-cofounder/")
async def match_cofounder(founder: dict):
    founders = get_founders(founder['name'])

    input_founder = founders_collection.find_one({"name": founder['name']})
    
    if not founders:
        raise HTTPException(status_code=404, detail="No founders available for matching")

    # Convert founders into feature vectors
    founders_vectors = np.array([vectorize(f) for f in founders]).reshape(len(founders), -1)

    input_vector = vectorize(input_founder)

    # Calculate cosine similarity between the input founder and all others
    similarities = cosine_similarity(input_vector, founders_vectors)[0]
    
    # Find the top 3 matches
    top_match_indices = similarities.argsort()[-3:][::-1]
    top_matches = [founders[i] for i in top_match_indices]

    return {
        "matches": [
            {
                "name": match['name'],
                "match_score": round(similarities[i] * 100, 2)
            }
            for i, match in zip(top_match_indices, top_matches)
        ]
    }
    
    

@router.get("/get-founder/{name}")
async def get_founder(name: str):
    founder = founders_collection.find_one({"name": name})
    if not founder:
        raise HTTPException(status_code=404, detail="Founder not found")
    return {key: value for key, value in founder.items() if key != "_id"}

class PitchRequest(BaseModel):
    prompt: str

@router.post("/generate-pitch")
async def generate_pitch_api(request: PitchRequest):
    try:
        pitch = generate_pitch(request.prompt)
        return {"pitch": pitch}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
class BusinessPlanData(BaseModel):
    businessModel: str
    targetMarket: str
    goals: str

@router.post("/generate-business-plan")
async def generate_business_plan_api(data: BusinessPlanData):
    try:
        plan = generate_business_plan(data.dict())
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
client = MongoClient("mongodb://localhost:27017/")
db = client["invest_nexus"]
roadmap_collection = db["roadmap_status"]

class RoadmapStatus(BaseModel):
    step: int
    status: str
    user_id: str

roadmap_collection = db["roadmap_status"]

@router.get("/get-roadmap-status")
async def get_roadmap_status(user_id: str):
    try:
        status = roadmap_collection.find_one({"user_id": user_id})
        if status:
            return status["steps"]
        else:
            return {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/update-roadmap-status")
async def update_roadmap_status(status: RoadmapStatus):
    try:
        existing_status = roadmap_collection.find_one({"user_id": status.user_id})
        if existing_status:
            roadmap_collection.update_one(
                {"user_id": status.user_id},
                {"$set": {f"steps.{status.step}": status.status}}
            )
        else:
            roadmap_collection.insert_one({"user_id": status.user_id, "steps": {str(status.step): status.status}})
        return {"message": "Roadmap status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))