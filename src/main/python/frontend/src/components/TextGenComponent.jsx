import { useState } from "react";
import { generateText } from "../api";

export default function TextGenComponent() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");

    const handleGenerate = async () => {
        const data = await generateText(prompt);
        setResult(data.generated_text);
    };

    return (
        <div>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <button onClick={handleGenerate}>Generate</button>
            <p>{result}</p>
        </div>
    );
}
