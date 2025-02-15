from transformers import pipeline
import spacy
from huggingface_hub import login

# add hugging face access token here
print("Logging in")
login("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")
# Load Hugging Face model for text generation
generator = pipeline("text-generation", model="mistralai/Mistral-7B-Instruct-v0.3")
print("Logged in")
# Load SpaCy NLP model for Named Entity Recognition (NER)
nlp = spacy.load("en_core_web_sm")
print("Spacy loaded")
startup_idea = input("Enter your startup idea: ")
available_funds = float(input("Enter your available funding amount (in USD): "))

def estimate_required_funding(idea_text):
    """Use Hugging Face model to estimate startup funding"""
    prompt = f"How much amount in dollars would we need for a startup idea of {idea_text}."
    
    response = generator(prompt, max_length=100, do_sample=True, temperature=0.7)
    estimated_funding_text = response[0]["generated_text"]

    return estimated_funding_text

def extract_funding_amount(text):
    """Extract funding amount using SpaCy NER"""
    doc = nlp(text)
    
    for ent in doc.ents:
        if ent.label_ == "MONEY":  # Look for monetary entities
            return float("".join(filter(str.isdigit, ent.text)))  # Convert to number
    
    return None  # No funding amount found

def check_startup_feasibility(idea_text, available_funding):
    """Check startup feasibility and suggest additional funds if needed"""
    
    # Step 1: Get estimated required funding using AI
    estimated_funding_text = estimate_required_funding(idea_text)
    
    # Step 2: Extract numerical funding amount using SpaCy
    required_funding = extract_funding_amount(estimated_funding_text)
    
    if required_funding is None:
        return "❌ Could not determine funding estimate. Please refine the idea description."
    
    # Step 3: Compare with available funds
    if available_funding >= required_funding:
        return "Proper Funds",available_funding
    else:
        #additional_needed = required_funding - available_funding
        return "Less Funds",required_funding


fund_result,fund_amount = check_startup_feasibility(startup_idea, available_funds)
print("\n🚀 Feasibility Analysis 1:", fund_result)
print("\n🚀 Feasibility Analysis 2:", fund_amount)
