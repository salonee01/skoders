import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, CircularProgress, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";

const BusinessPlan = () => {
    const [formData, setFormData] = useState({
        businessModel: "",
        targetMarket: "",
        goals: ""
    });
    const [loading, setLoading] = useState(false);
    const [businessPlan, setBusinessPlan] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/generate-business-plan", formData);
            setBusinessPlan(response.data);
        } catch (error) {
            console.error("Error generating business plan:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Generate Business Plan
            </Typography>
            <Box sx={{ mt: 4 }}>
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Business Plan"}
                </Button>
            </Box>
            {businessPlan && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Business Plan
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card elevation={4} sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="body1"><strong>Projections:</strong> {businessPlan.projections}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card elevation={4} sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="body1"><strong>Key Metrics:</strong> {businessPlan.keyMetrics}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card elevation={4} sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="body1"><strong>Strategies:</strong> {businessPlan.strategies}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default BusinessPlan;