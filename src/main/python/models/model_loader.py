from transformers import pipeline

def load_text_generator():
    return pipeline("text-generation", model="gpt2")

TEXT_GEN_MODEL = load_text_generator()