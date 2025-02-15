import React, { useState } from "react";
import { Container, Typography, Box, Tabs, Tab, Grid, Card, CardContent, TextField, MenuItem, Stepper, Step, StepLabel, Button, Avatar } from "@mui/material";

const FounderForm = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        location: "",
        industry: "",
        startupStage: "",
        fundingStatus: "",
        skills: [],
        cofounderSkills: [],
        workStyle: "",
        collaborationStyle: "",
        availability: "",
        locationPref: ""
    });
    const [founderExists, setFounderExists] = useState(true); // Assuming founderExists is true for demonstration
    const [matches, setMatches] = useState([
        { name: "John Doe", match_score: 85 },
        { name: "Jane Smith", match_score: 90 },
        { name: "Alice Johnson", match_score: 80 }
    ]); // Sample matches for demonstration

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        // Handle form submission
    };

    const steps = ["Personal Details", "Startup Details", "Skills & Expertise", "Co-founder Preferences"];
    const industries = ["FinTech", "HealthTech", "EdTech", "E-Commerce", "AI/ML", "Blockchain"];
    const skills = ["Technical", "Marketing", "Sales", "Finance", "Operations", "Product Management"];
    const workStyles = ["Visionary", "Execution-Focused"];
    const collaborationStyles = ["Independent Thinker", "Team-Oriented"];
    const availabilityOptions = ["Full-Time", "Part-Time"];
    const startupStages = ["Idea Stage", "Seed Funded"];
    const fundingStatuses = ["Bootstrapped", "Looking for Investors"];

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Co-Founder Matching
            </Typography>

            {founderExists ? (
                <Box>
                    <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{ mb: 4 }}>
                        <Tab label="Matches" sx={{ fontWeight: 'bold' }} />
                        <Tab label="Edit Data" sx={{ fontWeight: 'bold' }} />
                    </Tabs>
                    {tabIndex === 0 && (
                        <Box>
                            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#3f51b5' }}>Your Matches</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {matches.map((match, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card elevation={4} sx={{ borderRadius: 2 }}>
                                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: 'grey.300' }}>
                                                    <Typography variant="h4">{match.name.charAt(0)}</Typography>
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{match.name}</Typography>
                                                <Typography variant="body2" sx={{ color: '#757575' }}>Match Score: {match.match_score}%</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                    {tabIndex === 1 && (
                        <Box sx={{ mt: 4 }}>
                            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                                {steps.map((label, index) => (
                                    <Step key={index}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {activeStep === 0 && (
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Personal Details</Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Name"
                                                fullWidth
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Age"
                                                type="number"
                                                fullWidth
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Location"
                                                fullWidth
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Startup Details</Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Industry"
                                                fullWidth
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                {industries.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Startup Stage"
                                                fullWidth
                                                name="startupStage"
                                                value={formData.startupStage}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                {startupStages.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Funding Status"
                                                fullWidth
                                                name="fundingStatus"
                                                value={formData.fundingStatus}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                {fundingStatuses.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Skills & Expertise</Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Your Skills"
                                                fullWidth
                                                name="skills"
                                                value={formData.skills}
                                                onChange={handleChange}
                                                variant="outlined"
                                                SelectProps={{ multiple: true }}
                                            >
                                                {skills.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {activeStep === 3 && (
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Co-founder Preferences</Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Looking for Skills"
                                                fullWidth
                                                name="cofounderSkills"
                                                value={formData.cofounderSkills}
                                                onChange={handleChange}
                                                variant="outlined"
                                                SelectProps={{ multiple: true }}
                                            >
                                                {skills.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Preferred Work Style"
                                                fullWidth
                                                name="workStyle"
                                                value={formData.workStyle}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                {workStyles.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Collaboration Style"
                                                fullWidth
                                                name="collaborationStyle"
                                                value={formData.collaborationStyle}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                {collaborationStyles.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Availability"
                                                fullWidth
                                                name="availability"
                                                value={formData.availability}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                {availabilityOptions.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Location Preference"
                                                fullWidth
                                                name="locationPref"
                                                value={formData.locationPref}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                <MenuItem value="Remote">Remote</MenuItem>
                                                <MenuItem value="In-Person">In-Person</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                                <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="secondary">
                                    Back
                                </Button>
                                {activeStep === steps.length - 1 ? (
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        Next
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            ) : (
                <Box>
                    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === 0 && (
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Personal Details</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Age"
                                        type="number"
                                        fullWidth
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Location"
                                        fullWidth
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Startup Details</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Industry"
                                        fullWidth
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        variant="outlined"
                                    >
                                        {industries.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Startup Stage"
                                        fullWidth
                                        name="startupStage"
                                        value={formData.startupStage}
                                        onChange={handleChange}
                                        variant="outlined"
                                    >
                                        {startupStages.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Funding Status"
                                        fullWidth
                                        name="fundingStatus"
                                        value={formData.fundingStatus}
                                        onChange={handleChange}
                                        variant="outlined"
                                    >
                                        {fundingStatuses.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {activeStep === 2 && (
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Skills & Expertise</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Your Skills"
                                        fullWidth
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        variant="outlined"
                                        SelectProps={{ multiple: true }}
                                    >
                                        {skills.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {activeStep === 3 && (
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Co-founder Preferences</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Looking for Skills"
                                        fullWidth
                                        name="cofounderSkills"
                                        value={formData.cofounderSkills}
                                        onChange={handleChange}
                                        variant="outlined"
                                        SelectProps={{ multiple: true }}
                                    >
                                        {skills.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Preferred Work Style"
                                        fullWidth
                                        name="workStyle"
                                        value={formData.workStyle}
                                        onChange={handleChange}
                                        variant="outlined"
                                    >
                                        {workStyles.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Collaboration Style"
                                        fullWidth
                                        name="collaborationStyle"
                                        value={formData.collaborationStyle}
                                        onChange={handleChange}
                                        variant="outlined"
                                    >
                                        {collaborationStyles.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Availability"
                                        fullWidth
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleChange}
                                        variant="outlined"
                                    >
                                        {availabilityOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Location Preference"
                                        fullWidth
                                        name="locationPref"
                                        value={formData.locationPref}
                                        onChange={handleChange}
                                        variant="outlined"
                                    >
                                        <MenuItem value="Remote">Remote</MenuItem>
                                        <MenuItem value="In-Person">In-Person</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="secondary">
                            Back
                        </Button>
                        {activeStep === steps.length - 1 ? (
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default FounderForm;