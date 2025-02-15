from huggingface_hub import login,whoami
from transformers import pipeline

# add hugging face access token here
print("Logging in")
login("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")
print("Loggedin")
user_info = whoami()
print(user_info)
generator = pipeline("text-generation", model="mistralai/Mistral-7B-Instruct-v0.1")
print("Model loaded")
