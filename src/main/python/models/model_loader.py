from transformers import pipeline
from diffusers import StableDiffusionPipeline
import torch

def load_text_generator():
    return pipeline("text-generation", model="gpt2")

def load_image_generator():
    return StableDiffusionPipeline.from_pretrained(
        "stabilityai/stable-diffusion-2", torch_dtype=torch.bfloat16
    )

TEXT_GEN_MODEL = load_text_generator()
IMAGE_GEN_MODEL = load_image_generator()
