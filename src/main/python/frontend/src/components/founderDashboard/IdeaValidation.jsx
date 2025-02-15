import { useState } from "react";
import { TextField, Button, Alert, Box, Typography } from "@mui/material";
import axios from "axios";

const IdeaValidation = () => {
    const [idea, setIdea] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleIdeaSubmit = async () => {
        if (!idea.trim()) {
            setMessage({ type: "error", text: "Idea cannot be empty!" });
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/validate-idea/", { idea });

            if (response.data.valid) {
                setMessage({ type: "success", text: "Your idea has potential!" });
            } else {
                setMessage({ type: "error", text: "Your idea needs improvement." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error validating idea. Try again later!" });
        }
    };

    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>Idea Validation</Typography>
            {message.text && <Alert severity={message.type}>{message.text}</Alert>}
            <TextField
                label="Describe your startup idea"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                sx={{ my: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleIdeaSubmit}>
                Validate Idea
            </Button>
        </Box>
    );
};

export default IdeaValidation;
