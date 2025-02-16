import torch
import spacy
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from huggingface_hub import login

# 🔹 Hugging Face Login
print("Logging in...")
login("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")  # Add your HF token here
print("Logged in!")

# 🔹 Free Up GPU Memory Before Running
torch.cuda.empty_cache()
torch.cuda.ipc_collect()

# 🔹 Select Model (Use smaller model if memory issues occur)
MODEL_NAME = "google/gemma-2b"  # Change to "google/gemma-1.1b" if 2B is too large

# 🔹 Load Tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

# 🔹 Load Model with Automatic Offloading
print("Loading model...")
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    device_map="auto",  # Auto-distribute model to GPU, CPU, or disk
    offload_folder="offload",  # Folder for disk offloading
    offload_state_dict=True,  # Offload model states to disk if needed
    torch_dtype="auto"
)
print("Model loaded successfully!")

# 🔹 Initialize Text Generation Pipeline
generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

# 🔹 Load SpaCy NLP Model for Named Entity Recognition (NER)
nlp = spacy.load("en_core_web_sm")
print("SpaCy loaded successfully!")

# # 🔹 User Inputs
# startup_idea = input("Enter your startup idea: ")
# available_funds = float(input("Enter your available funding amount (in USD): "))

def estimate_required_funding(idea_text):
    """Generate an estimated funding amount for a startup idea."""
    prompt = f"Estimate the amount of money needed (in USD) for a startup idea: {idea_text}."
    
    response = generator(prompt, max_length=100, do_sample=True, temperature=0.7)
    return response[0]["generated_text"]

def extract_funding_amount(text):
    """Extract numerical funding amount using SpaCy NER."""
    doc = nlp(text)
    
    for ent in doc.ents:
        if ent.label_ == "MONEY":  # Look for monetary entities
            amount = "".join(filter(str.isdigit, ent.text))  # Extract only numbers
            return float(amount) if amount else None

    return None  # Return None if no monetary amount is found

def check_startup_feasibility(idea_text, available_funding):
    """Check if the startup idea is financially feasible."""
    
    # Step 1: Get estimated funding from AI
    estimated_funding_text = estimate_required_funding(idea_text)
    
    # Step 2: Extract numerical funding amount
    required_funding = extract_funding_amount(estimated_funding_text)
    
    if required_funding is None:
        return "❌ Could not determine funding estimate. Please refine the idea description."
    
    # Step 3: Compare with available funds
    if available_funding >= required_funding:
        return "✅ Sufficient Funds", available_funding
    else:
        return "⚠️ Insufficient Funds", required_funding

# # 🔹 Run Feasibility Check
# fund_result, fund_amount = check_startup_feasibility(startup_idea, available_funds)

# # 🔹 Print Results
# print("\n🚀 Feasibility Analysis 1:", fund_result)
# print("\n🚀 Feasibility Analysis 2: Required Amount → $", fund_amount)
