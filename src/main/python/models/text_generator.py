from .model_loader import TEXT_GEN_MODEL

def generate_text(prompt, max_length=100):
    result = TEXT_GEN_MODEL(prompt, max_length=max_length, do_sample=True)
    return result[0]['generated_text']
