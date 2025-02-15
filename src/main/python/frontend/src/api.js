const API_URL = "http://localhost:8000";

export async function generateText(prompt) {
    const response = await fetch(`${API_URL}/generate-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });
    return response.json();
}

export async function generateUniquenessScore(prompt) {
    const response = await fetch(`${API_URL}/data-unique`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });
    return response.json();
}

export async function generateMarketPositivityScore(prompt) {
    const response = await fetch(`${API_URL}/market-score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });
    return response.json();
}