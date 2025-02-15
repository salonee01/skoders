import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const LegalCompliance = () => {
    const legalChecklist = [
        "Register your startup",
        "Get a business bank account",
        "Obtain necessary licenses",
        "Set up founder agreements",
        "Protect intellectual property",
        "Understand tax obligations"
    ];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Legal Compliance</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Here are key legal steps to ensure your startup is compliant:
            </Typography>
            <List>
                {legalChecklist.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`✅ ${item}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default LegalCompliance;
