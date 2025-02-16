import logging
from huggingface_hub import InferenceClient
import os

# Configure logging
logging.basicConfig(level=logging.INFO)

client = InferenceClient(
    provider="hf-inference", api_key=os.environ["hf_token"]
)

def generate_business_plan(data):
    prompt = (
        f"Generate a comprehensive business plan for a startup with the following details:\n"
        f"Business Model: {data['businessModel']}\n"
        f"Target Market: {data['targetMarket']}\n"
        f"Goals: {data['goals']}\n"
        f"Include projections, key metrics to track, and strategies for growth."
    )

    logging.debug(f"Generated prompt: {prompt}")

    response = client.chat.completions.create(
        model="mistralai/Mistral-Nemo-Instruct-2407",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500,
    )
    business_plan_text = response["choices"][0]["message"]["content"]
    logging.debug(f"Generated business plan: {business_plan_text}")

    return business_plan_text

if __name__ == "__main__":
    data = {
        "businessModel": "Subscription-based service",
        "targetMarket": "Small businesses in the e-commerce sector",
        "goals": "Achieve 10,000 monthly active users within the first year",
    }
    plan = generate_business_plan(data)
    print(plan)