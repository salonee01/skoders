from googlesearch import search
import requests
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer, util

# Load NLP model for semantic similarity
model = SentenceTransformer("all-MiniLM-L6-v2")

def get_competitors(idea):
    """Find competitors using Google Search"""
    query = f"{idea} startup site:crunchbase.com OR site:angel.co"
    results = [url for url in search(query, num_results = 10,sleep_interval=2)]
    
    competitors = []
    for url in results:
        try:
            response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
            soup = BeautifulSoup(response.text, "html.parser")

            # Extract title and description
            title = soup.find("title").text if soup.find("title") else "No Title"
            desc = soup.find("meta", {"name": "description"})
            desc = desc["content"] if desc else "No Description"

            competitors.append({"title": title, "description": desc, "url": url})
        except Exception as e:
            print(f"Error processing {url}: {e}")

    return competitors

def calculate_uniqueness(idea, competitors):
    """Compare idea against competitors to calculate uniqueness score"""
    idea_embedding = model.encode(idea, convert_to_tensor=True)
    
    scores = []
    for competitor in competitors:
        comp_text = competitor["title"] + " " + competitor["description"]
        comp_embedding = model.encode(comp_text, convert_to_tensor=True)
        similarity = util.pytorch_cos_sim(idea_embedding, comp_embedding).item()
        scores.append(similarity)
    
    avg_similarity = sum(scores) / len(scores) if scores else 0
    uniqueness_score = (1 - avg_similarity) * 100  # Convert to percentage
    return uniqueness_score


startup_idea = input("Enter your startup idea: ")

print("\nFinding competitors...")
competitors = get_competitors(startup_idea)

if not competitors:
    print("No competitors found. Your idea might be unique!")
else:
    print("\nCompetitors Found:")
    for comp in competitors:
        print(f"- {comp['title']} ({comp['url']})")

    print("\nCalculating uniqueness score...")
    uniqueness = calculate_uniqueness(startup_idea, competitors)
    print(f"\n🚀 Uniqueness Score: {uniqueness:.2f}%")
