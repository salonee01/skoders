from transformers import pipeline
from huggingface_hub import login

# add hugging face access token here
print("Logging in")
login("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")
# Initialize the text generation pipeline with LLaMA
generator = pipeline("text-generation", model="mistralai/Mistral-7B-v0.1", device='mps')

def generate_business_plan(data):
    prompt = (
        f"Generate a comprehensive business plan for a startup with the following details:\n"
        f"Business Model: {data['businessModel']}\n"
        f"Target Market: {data['targetMarket']}\n"
        f"Goals: {data['goals']}\n"
        f"Include projections, key metrics to track, and strategies for growth."
    )
    
    response = generator(prompt, max_length=500, do_sample=True, temperature=0.7)
    business_plan_text = response[0]["generated_text"]

    # Extract sections from the generated text (this is a simple example, you might need more sophisticated parsing)
    projections = "Projections: " + business_plan_text.split("Projections:")[1].split("Key Metrics:")[0].strip()
    key_metrics = "Key Metrics: " + business_plan_text.split("Key Metrics:")[1].split("Strategies:")[0].strip()
    strategies = "Strategies: " + business_plan_text.split("Strategies:")[1].strip()

    return {
        'projections': projections,
        'keyMetrics': key_metrics,
        'strategies': strategies
    }

if __name__=='__main__':
    data = {
        'businessModel': 'Subscription-based service',
        'targetMarket': 'Small businesses in the e-commerce sector',
        'goals': 'Achieve 10,000 monthly active users within the first year'
    }
    plan = generate_business_plan(data)
    print(plan)