import React, { useState } from "react";
import { TextField, Button, Typography, Box, CircularProgress, Card, CardContent, Container, Grid, Link } from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const FundFeasibility = () => {
    const [formData, setFormData] = useState({
        businessModel: "",
        targetMarket: "",
        goals: "",
        productDescription: "",
        competitiveLandscape: "",
        funds: ""
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerateFeasibility = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/fund-feasibility", formData);
            setResult(response.data);
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
                        label="Business Model"
                        variant="outlined"
                        fullWidth
                        name="businessModel"
                        value={formData.businessModel}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Target Market"
                        variant="outlined"
                        fullWidth
                        name="targetMarket"
                        value={formData.targetMarket}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Goals"
                        variant="outlined"
                        fullWidth
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Product/Service Description"
                        variant="outlined"
                        fullWidth
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Competitive Landscape"
                        variant="outlined"
                        fullWidth
                        name="competitiveLandscape"
                        value={formData.competitiveLandscape}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Available Funding"
                        variant="outlined"
                        fullWidth
                        name="funds"
                        value={formData.funds}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
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
                                        <strong>Feasibility:</strong> {result.generated_score[0]}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333' }}>
                                        <strong>Required Funds:</strong> ${result.generated_score[1]}
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