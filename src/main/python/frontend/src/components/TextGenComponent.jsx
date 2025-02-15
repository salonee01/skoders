import { useState } from "react";
import { generateText } from "../api";
import { TextField, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";

export default function TextGenComponent() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const data = await generateText(prompt);
            setResult(data.generated_text);
        } catch (error) {
            console.error("Error generating text:", error);
            setResult("Error generating text. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    AI Text Generator
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Enter prompt"
                    variant="outlined"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerate}
                    disabled={loading}
                    sx={{ mb: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
                </Button>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {loading ? "Generating response..." : result}
                </Typography>
            </CardContent>
        </Card>
    );
}
