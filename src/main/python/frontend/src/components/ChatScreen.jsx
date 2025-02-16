import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Button, Paper } from "@mui/material";
import { useParams } from "react-router-dom";

const ChatScreen = () => {
    const { investorName } = useParams();
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Set the hardcoded message when the component mounts
        setMessage(`Hi ${investorName}, We are looking for investment in our startup idea. Could we please connect?`);
    }, [investorName]);

    const handleSendMessage = () => {
        // Handle sending the message (e.g., API call or state update)
        console.log("Message sent:", message);
        alert("Message sent successfully");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    Chat with {investorName}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                        sx={{ mt: 2, py: 1.5, px: 4, fontSize: '1rem', fontWeight: 'bold' }}
                    >
                        Send Message
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ChatScreen;