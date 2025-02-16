import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Stepper, Step, StepLabel, StepButton, Button, StepConnector } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import { styled } from '@mui/material/styles';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const roadmapPoints = [
    {
        label: "Idea Validation",
        description: "Validate your business idea through market research and feedback.",
        path: "/idea-validation"
    },
    {
        label: "Co-Founder Matching (Optional)",
        description: "Find the right co-founder to complement your skills and vision.",
        path: "/cofounder-matching"
    },
    {
        label: "Fund Feasibility",
        description: "Assess the financial feasibility of your startup and secure funding.",
        path: "/fund-feasibility"
    },
    {
        label: "Business Plan",
        description: "Create a comprehensive business plan outlining your strategy and goals.",
        path: "/business-plan"
    },
    {
        label: "Investor Pitch Generation",
        description: "Develop a compelling pitch to attract potential investors.",
        path: "/pitch"
    }
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.divider,
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400],
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: theme.palette.primary.main,
    }),
    '& .QontoStepIcon-completedIcon': {
        color: theme.palette.primary.main,
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <CheckCircleIcon className="QontoStepIcon-completedIcon" />
            ) : (
                <CircleIcon className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const EntrepreneurRoadmap = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const userId = localStorage.getItem("username"); 
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the completion status from the database
        const fetchCompletionStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/get-roadmap-status?user_id=${userId}`);
                setCompleted(response.data);
                const lastCompletedStep = Object.keys(response.data).filter(key => response.data[key] === "completed").length - 1;
                setActiveStep(lastCompletedStep + 1);
            } catch (error) {
                console.error("Error fetching roadmap status:", error);
            }
        };

        fetchCompletionStatus();
    }, [userId]);

    const handleStep = (step) => () => {
        if (step <= activeStep) {
            setActiveStep(step);
            navigate(roadmapPoints[step].path);
        }
    };

    const handleComplete = async () => {
        const newCompleted = { ...completed, [activeStep]: "completed" };
        setCompleted(newCompleted);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Update the completion status in the database
        try {
            await axios.post("http://localhost:8000/update-roadmap-status", { step: activeStep, status: "completed", user_id: userId });
        } catch (error) {
            console.error("Error updating roadmap status:", error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Roadmap to Becoming an Entrepreneur
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Stepper nonLinear activeStep={activeStep} orientation="vertical" connector={<QontoConnector />}>
                    {roadmapPoints.map((point, index) => (
                        <Step key={index} completed={completed[index] === "completed"}>
                            <StepButton onClick={handleStep(index)} disabled={index > activeStep}>
                                <StepLabel StepIconComponent={QontoStepIcon}>{point.label}</StepLabel>
                            </StepButton>
                            <Typography sx={{ mt: 2, mb: 1 }}>{point.description}</Typography>
                        </Step>
                    ))}
                </Stepper>
                {activeStep < roadmapPoints.length && (
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleComplete}>
                            {activeStep === roadmapPoints.length - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default EntrepreneurRoadmap;