from fastapi import APIRouter
from models.text_generator import generate_text
from fastapi import FastAPI, Depends, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from bson import ObjectId
from passlib.context import CryptContext
import jwt
import datetime

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017")
db = client["invest_nexus"]
users_collection = db["users"]

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

class User(BaseModel):
    username: str
    password: str

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
    return {"access_token": token, "token_type": "bearer"}

@router.post("/signup/")
async def signup(user: User):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_password = pwd_context.hash(user.password)
    users_collection.insert_one({"username": user.username, "password": hashed_password})
    return {"message": "User created successfully"}