import logging
from huggingface_hub import InferenceClient
import spacy
import os
# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize SpaCy model
nlp = spacy.load("en_core_web_sm")

client = InferenceClient(
    provider="hf-inference", api_key=os.environ["hf_token"]
)

def estimate_required_funding(data):
    prompt = (
        f"Give the total amount of money in numbers not words needed for a startup with following details (don't give breakdwown and don't give a range):\n"
        f"Business Model: {data['businessModel']}\n"
        f"Target Market: {data['targetMarket']}\n"
        f"Goals: {data['goals']}\n"
        f"Product/Service Description: {data['productDescription']}\n"
        f"Competitive Landscape: {data['competitiveLandscape']}\n"
    )
    
    logging.debug(f"Generated prompt: {prompt}")

    response = client.chat.completions.create(
        model="mistralai/Mistral-Nemo-Instruct-2407",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=100,
    )
    estimated_funding_text = response["choices"][0]["message"]["content"]
    logging.debug(f"Generated funding estimate: {estimated_funding_text}")

    return estimated_funding_text

def extract_funding_amount(text):
    """Extract numerical funding amount using SpaCy NER."""
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "MONEY":  # Look for monetary entities
            amount = "".join(filter(str.isdigit, ent.text))
            return float(amount) if amount else None

    return None  # Return None if no monetary amount is found

def check_startup_feasibility(data, available_funding):
    """Check if the startup idea is financially feasible."""
    
    # Step 1: Get estimated funding from AI
    estimated_funding_text = estimate_required_funding(data)
    
    # Step 2: Extract numerical funding amount
    required_funding = extract_funding_amount(estimated_funding_text)
    
    if required_funding is None:
        return "❌ Could not determine funding estimate. Please refine the idea description."
    
    # Step 3: Compare with available funds
    if available_funding >= required_funding:
        return "✅ Sufficient Funds", available_funding
    else:
        return "⚠️ Insufficient Funds", required_funding

if __name__ == "__main__":
    data = {
        "businessModel": "Subscription-based service",
        "targetMarket": "Small businesses in the e-commerce sector",
        "goals": "Achieve 10,000 monthly active users within the first year",
        "productDescription": "A platform that provides e-commerce solutions for small businesses.",
        "competitiveLandscape": "Competing with Shopify and BigCommerce."
    }
    available_funds = 50000
    fund_result, fund_amount = check_startup_feasibility(data, available_funds)
    print("\n🚀 Feasibility Analysis 1:", fund_result)
    print("\n🚀 Feasibility Analysis 2: Required Amount → $", fund_amount)