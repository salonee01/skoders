import { useState } from "react";
import { TextField, Button, Alert, Box, Typography } from "@mui/material";
import axios from "axios";

const CoFounderMatching = () => {
    const [skills, setSkills] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleMatchRequest = async () => {
        if (!skills.trim()) {
            setMessage({ type: "error", text: "Please enter your skills and preferences!" });
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/find-cofounder/", { skills });

            if (response.data.match_found) {
                setMessage({ type: "success", text: `Match Found: ${response.data.match_name}` });
            } else {
                setMessage({ type: "info", text: "No match found. Try updating your skills." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error finding co-founder. Try again later!" });
        }
    };

    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>Find a Co-founder</Typography>
            {message.text && <Alert severity={message.type}>{message.text}</Alert>}
            <TextField
                label="Enter Your Skills & Co-founder Preferences"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                sx={{ my: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleMatchRequest}>
                Find Co-founder
            </Button>
        </Box>
    );
};

export default CoFounderMatching;
