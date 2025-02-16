import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

const ideas = [
    { title: "AI-Powered Health Diagnostics", description: "An AI system that provides instant health diagnostics based on symptoms and medical history." },
    { title: "Sustainable Fashion", description: "A fashion line that uses only sustainable and eco-friendly materials." },
    { title: "Smart Home Automation", description: "A system that automates home appliances and security using IoT technology." },
    { title: "Online Learning Platform", description: "A platform that offers a wide range of online courses with interactive content and live sessions." },
    { title: "Electric Vehicle Charging Stations", description: "A network of fast and reliable charging stations for electric vehicles." },
    { title: "Personal Finance Management App", description: "An app that helps users manage their finances, track expenses, and save money." },
    { title: "Telemedicine Services", description: "A service that connects patients with doctors for virtual consultations and remote monitoring." },
    { title: "Renewable Energy Solutions", description: "A company that provides renewable energy solutions such as solar panels and wind turbines." },
    { title: "Fitness and Wellness App", description: "An app that offers personalized fitness plans, workout routines, and wellness tips." },
    { title: "Food Delivery Service", description: "A service that delivers fresh and healthy meals to customers' doorsteps." },
];

const FindIdeas = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'center' }}>
                Discover the Top 10 Innovative Startup Ideas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                {ideas.map((idea, index) => (
                    <Card key={index} sx={{ width: '100%', maxWidth: 600, boxShadow: 3, borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                {idea.title}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1, color: '#555' }}>
                                {idea.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default FindIdeas;