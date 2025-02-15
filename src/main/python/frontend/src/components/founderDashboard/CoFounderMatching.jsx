import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext"; // Import the AuthContext
import {
    Container,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    TextField,
    Grid,
    Box,
    MenuItem,
    Card,
    CardContent,
    Avatar,
    CircularProgress,
    Tabs,
    Tab
} from "@mui/material";
import axios from "axios";

const steps = ["Personal Details", "Startup Details", "Skills & Expertise", "Co-Founder Preferences"];
const industries = ["FinTech", "HealthTech", "EdTech", "E-Commerce", "AI/ML", "Blockchain"];
const skills = ["Technical", "Marketing", "Sales", "Finance", "Operations", "Product Management"];
const workStyles = ["Visionary", "Execution-Focused"];
const collaborationStyles = ["Independent Thinker", "Team-Oriented"];
const availabilityOptions = ["Full-Time", "Part-Time"];
const startupStages = ["Idea Stage", "Seed Funded"];
const fundingStatuses = ["Bootstrapped", "Looking for Investors"];
const businessModels = ["B2B", "B2C", "SaaS"];

const FounderForm = () => {
    const { user } = useContext(AuthContext); // Get user from AuthContext
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

    const [founderExists, setFounderExists] = useState(false);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);

    // Fetch founder data if it exists
    useEffect(() => {
        const fetchFounderData = async () => {
            try {
                if (user) { // Ensure user is logged in
                    console.log("Fetching founder data for user:", user.username); // Debug log
                    try {
                        const response = await axios.get(`http://localhost:8000/get-founder/${user.username}`);
                        setFormData(response.data);
                        setFounderExists(true);
                        console.log("Founder data retrieved:", response.data); // Debug log
                        await handleMatch(response.data);
                    } catch (error) {
                        console.error("Founder data not found", error);
                    }
                }
            } catch (error) {
                console.error("Error fetching founder data", error);
                setFounderExists(false);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchFounderData();
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8000/add-or-update-founder/", formData);
            window.location.reload();
        } catch (error) {
            alert("Error submitting the form!");
        }
    };

    const handleMatch = async (founderData) => {
        try {
            const response = await axios.post("http://localhost:8000/match-cofounder/", { "name": founderData.name });
            const sortedMatches = response.data.matches.sort((a, b) => b.match_score - a.match_score);
            setMatches(sortedMatches.slice(0, 3)); // Get top 3 matches
            console.log("Matches found:", sortedMatches.slice(0, 3)); // Debug log
        } catch (error) {
            console.error("Error fetching matches:", error); // Debug log
            alert("Error fetching matches!");
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Co-Founder Matching
            </Typography>

            {founderExists ? (
                <Box>
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Matches" />
                        <Tab label="Edit Data" />
                    </Tabs>
                    {tabIndex === 0 && (
                        <Box>
                            <Typography variant="h6" sx={{ mt: 2 }}>Your Matches</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {matches.map((match, index) => (
                                    <Grid item xs={4} key={index}>
                                        <Card>
                                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Box
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        backgroundColor: 'grey.300',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mb: 1
                                                    }}
                                                >
                                                    <Typography variant="h6">P</Typography> {/* Placeholder for profile photo */}
                                                </Box>
                                                <Typography variant="body1">{match.name}</Typography>
                                                <Typography variant="body2">Match Score: {match.match_score}%</Typography>
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
                                    <Typography variant="h6">Personal Details</Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Name"
                                                fullWidth
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
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
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Location"
                                                fullWidth
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box>
                                    <Typography variant="h6">Startup Details</Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Industry"
                                                fullWidth
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleChange}
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
                                    <Typography variant="h6">Skills & Expertise</Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Your Skills"
                                                fullWidth
                                                name="skills"
                                                value={formData.skills}
                                                onChange={handleChange}
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
                                    <Typography variant="h6">Co-founder Preferences</Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                label="Looking for Skills"
                                                fullWidth
                                                name="cofounderSkills"
                                                value={formData.cofounderSkills}
                                                onChange={handleChange}
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
                                            >
                                                <MenuItem value="Remote">Remote</MenuItem>
                                                <MenuItem value="In-Person">In-Person</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                                <Button disabled={activeStep === 0} onClick={handleBack}>
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
                            <Typography variant="h6">Personal Details</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Location"
                                        fullWidth
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <Box>
                            <Typography variant="h6">Startup Details</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Industry"
                                        fullWidth
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
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
                            <Typography variant="h6">Skills & Expertise</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Your Skills"
                                        fullWidth
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
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
                            <Typography variant="h6">Co-founder Preferences</Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Looking for Skills"
                                        fullWidth
                                        name="cofounderSkills"
                                        value={formData.cofounderSkills}
                                        onChange={handleChange}
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
                                    >
                                        <MenuItem value="Remote">Remote</MenuItem>
                                        <MenuItem value="In-Person">In-Person</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
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