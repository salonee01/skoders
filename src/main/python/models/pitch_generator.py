import logging
from huggingface_hub import InferenceClient

# Configure logging
logging.basicConfig(level=logging.DEBUG)
client = InferenceClient(api_key="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")


def generate_pitch(prompt: str) -> str:
    try:
        ai_prompt = (
            f"Generate an investor pitch for a startup idea with the following details:\n"
            f"Startup Name: {prompt}\n"
            f"Include the following key points:\n"
            f"1. Introduction: Briefly introduce the startup and its mission.\n"
            f"2. Problem Statement: Describe the problems the startup aims to solve.\n"
            f"3. Solution: Explain the innovative solutions the startup offers.\n"
            f"4. Market Opportunity: Highlight the market potential and target audience.\n"
            f"5. Business Model: Outline the business model and revenue streams.\n"
            f"6. Competitive Advantage: Discuss what sets the startup apart from competitors.\n"
            f"7. Team: Introduce the founding team and their expertise.\n"
            f"8. Financial Projections: Provide a summary of financial projections and funding requirements.\n"
            f"9. Call to Action: Conclude with a call to action for investors."
        )

        # logging.debug(f"Generated AI prompt: {ai_prompt}")

        response = client.chat.completions.create(
            model="mistralai/Mistral-Nemo-Instruct-2407",
            messages=[{"role": "user", "content": ai_prompt}],
            max_tokens=500,
        )

        pitch_text = response["choices"][0]["message"]["content"]
        logging.debug(f"Generated pitch: {pitch_text}")

        return pitch_text

    except Exception as e:
        logging.error(f"Error generating pitch: {e}")
        return "An error occurred while generating the pitch."


if __name__ == "__main__":
    prompt = "EcoTech Solutions"
    pitch = generate_pitch(prompt)
    print(pitch)
