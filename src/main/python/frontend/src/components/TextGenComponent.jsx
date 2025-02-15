import { useState } from "react";
import { generateText } from "../api";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function TextGenComponent() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");

    const handleGenerate = async () => {
        const data = await generateText(prompt);
        setResult(data.generated_text);
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h4" gutterBottom>
                AI Text Generator
            </Typography>
            <TextField
                label="Enter your prompt"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleGenerate}>
                    Generate
                </Button>
            </Box>
            {result && (
                <Typography variant="h6" style={{ marginTop: "20px" }}>
                    {result}
                </Typography>
            )}
        </Container>
    );
}
