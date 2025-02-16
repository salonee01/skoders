import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, CircularProgress, Card, CardContent, Pagination } from "@mui/material";
import axios from "axios";

const BusinessPlan = () => {
    const [formData, setFormData] = useState({
        businessModel: "",
        targetMarket: "",
        goals: ""
    });
    const [loading, setLoading] = useState(false);
    const [businessPlan, setBusinessPlan] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;

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

    const renderBusinessPlan = (text) => {
        const sections = text.split(/\*\*\d+\.\s/).filter(section => section.trim() !== "");
        const indexOfLastCard = currentPage * cardsPerPage;
        const indexOfFirstCard = indexOfLastCard - cardsPerPage;
        const currentCards = sections.slice(indexOfFirstCard, indexOfLastCard);

        return currentCards.map((section, index) => {
            const [heading, ...content] = section.split("\n");
            return (
                <Box key={index} sx={{ mt: 4 }}>
                    <Card elevation={4} sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                {heading.replace("**", "").replace("**", "")}
                            </Typography>
                            <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
                                {content.join("\n")}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            );
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
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
                    {renderBusinessPlan(businessPlan)}
                    <Pagination
                        count={Math.ceil(businessPlan.split(/\*\*\d+\.\s/).filter(section => section.trim() !== "").length / cardsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ mt: 4 }}
                    />
                </Box>
            )}
        </Container>
    );
};

export default BusinessPlan;