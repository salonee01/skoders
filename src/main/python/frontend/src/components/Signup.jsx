import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); // ✅ Added role state
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/signup/", {
                username,
                password,
                role, // ✅ Send role to backend
            });

            setSuccess("Signup successful! Redirecting to login...");
            setError("");

            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError("Error signing up. Try again.");
            setSuccess("");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}>
                <Typography variant="h4" gutterBottom>Signup</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <MenuItem value="founder">Founder</MenuItem>
                        <MenuItem value="investor">Investor</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSignup}>
                    Signup
                </Button>
                <Button variant="text" color="secondary" sx={{ mt: 1 }} onClick={() => navigate("/login")}>
                    Already have an account? Login
                </Button>
            </Box>
        </Container>
    );
};

export default Signup;
