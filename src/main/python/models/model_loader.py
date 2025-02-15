from transformers import pipeline

def load_text_generator():
    return pipeline("text-generation", model="gpt2")

def load_image_generator():
    return pipeline("text-to-image", model="stabilityai/stable-diffusion-2")

TEXT_GEN_MODEL = load_text_generator()
IMAGE_GEN_MODEL = load_image_generator()
