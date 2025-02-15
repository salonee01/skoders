from .model_loader import TEXT_GEN_MODEL

def generate_pitch(prompt: str) -> str:
    response = TEXT_GEN_MODEL(prompt, max_length=200, do_sample=True, temperature=0.7)
    return response[0]["generated_text"]