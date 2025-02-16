import React, { useState } from "react";
import { TextField, Button, Typography, Box, CircularProgress, Card, CardContent, Container, Grid, Link } from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const FundFeasibility = () => {
    const [prompt, setPrompt] = useState("");
    const [funds, setFunds] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateFeasibility = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/fund-feasibility", { prompt, funds });
            setResult(response.data.generated_score.generated_score);
        } catch (error) {
            console.error("Error generating feasibility:", error);
            setResult("Error generating feasibility. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Fund Feasibility Analysis
            </Typography>
            <Card sx={{ p: 4, mt: 2, mb: 4, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <CardContent>
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
                    <TextField
                        label="Enter available funds"
                        variant="outlined"
                        fullWidth
                        value={funds}
                        onChange={(e) => setFunds(e.target.value)}
                        sx={{ my: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateFeasibility}
                        disabled={loading}
                        sx={{ mt: 2, py: 1.5, px: 4, fontSize: '1rem', fontWeight: 'bold' }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze Feasibility"}
                    </Button>
                </CardContent>
            </Card>
            {result && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        Feasibility Result
                    </Typography>
                    <Card elevation={4} sx={{ borderRadius: 2, backgroundColor: '#ffffff', p: 3 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333' }}>
                                        <strong>Feasibility:</strong> {result[0]}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333' }}>
                                        <strong>Required Funds:</strong> ₹{result[1]}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ fontSize: '1rem', color: '#3f51b5' }}>
                            Trying to find an investor? <Link component={RouterLink} to="/find-investors">Click here</Link>
                        </Typography>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default FundFeasibility;