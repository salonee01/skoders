import React, { useState } from "react";
import { TextField, Button, Typography, Box, CircularProgress, Card, CardContent, Paper, Grid, IconButton, Container } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "axios";

const PitchGenerator = () => {
    const [prompt, setPrompt] = useState("");
    const [pitch, setPitch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    const handleGeneratePitch = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/generate-pitch", { prompt });
            const pitchText = response.data.pitch;
            const pitchDeck = pitchText.split('**').filter(paragraph => paragraph.trim() !== ""); // Split pitch into paragraphs
            setPitch(pitchDeck);
            setPage(0); // Reset to the first page

            // Update the roadmap status to mark the pitch generation step as completed
            await axios.post("http://localhost:8000/update-roadmap-status", { step: 4, status: "completed", user_id: localStorage.getItem("username") });
        } catch (error) {
            console.error("Error generating pitch:", error);
            setPitch(["Error generating pitch. Please try again."]);
        }
        setLoading(false);
    };

    const handleNext = () => {
        if (page < pitch.length - 1) {
            setPage(page + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Generate Investor Pitch
            </Typography>
            <Paper elevation={4} sx={{ p: 4, mt: 2, mb: 4, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <TextField
                    label="Enter your startup idea"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    sx={{ my: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGeneratePitch}
                    disabled={loading}
                    sx={{ mt: 2, py: 1.5, px: 4, fontSize: '1rem', fontWeight: 'bold' }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Pitch"}
                </Button>
            </Paper>
            {pitch.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        Generated Pitch Deck
                    </Typography>
                    <Grid container justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={10} md={8}>
                            <Card elevation={4} sx={{ borderRadius: 2, backgroundColor: '#ffffff' }}>
                                <CardContent>
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333' }}>
                                        {pitch[page]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
                        <IconButton onClick={handlePrevious} disabled={page === 0} sx={{ mx: 2 }}>
                            <ArrowBack fontSize="large" />
                        </IconButton>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3f51b5' }}>
                            {page + 1} / {pitch.length}
                        </Typography>
                        <IconButton onClick={handleNext} disabled={page === pitch.length - 1} sx={{ mx: 2 }}>
                            <ArrowForward fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default PitchGenerator;