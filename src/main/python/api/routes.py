from fastapi import APIRouter
from models.text_generator import generate_text

router = APIRouter()

@router.post("/generate-text")
async def generate_text_api(prompt: dict):
    return {"generated_text": generate_text(prompt['prompt'])}
