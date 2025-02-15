from fastapi import APIRouter
from models.text_generator import generate_text
from api.calculate_data_uniqueness import calculate_uniqueness_score
from api.analyze_market_data import analyze_market_demand

router = APIRouter()

@router.post("/generate-text")
async def generate_text_api(prompt: dict):
    return {"generated_text": generate_text(prompt['prompt'])}

@router.post("/data-unique")
async def generate_text_api(prompt: dict):
    return {"generated_score": calculate_uniqueness_score(prompt['prompt'])}

@router.post("/market-score")
async def generate_market_score(prompt: dict):
    return {"generated_score": analyze_market_demand(prompt['prompt'])}