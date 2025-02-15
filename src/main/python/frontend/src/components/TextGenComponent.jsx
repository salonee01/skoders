import { useState } from "react";
import { Box, TextField, Button, Card, CardContent, Typography, Container } from "@mui/material";
import { generateText } from "../api";

export default function TextGenComponent() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");

    const handleGenerate = async () => {
        const data = await generateText(prompt);
        setResult(data.generated_text);
    };

    return (
        <Container 
            maxWidth="sm" 
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "90vh" // Ensures it centers properly
            }}
        >
            <Card sx={{ width: "100%", p: 3, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                        AI Text Generator
                    </Typography>
                    <TextField
                        label="Enter your prompt..."
                        fullWidth
                        multiline
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleGenerate}>
                            Generate
                        </Button>
                    </Box>
                    {result && (
                        <Card sx={{ mt: 3, p: 2, backgroundColor: "#f5f5f5" }}>
                            <Typography variant="body1">{result}</Typography>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}
