import { useState, useContext } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Get login function

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/login/", 
                { username, password }, 
                { headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" } } // Disable caching
            );
    
            setSuccess("Login successful!");
            setError("");
            console.log(response.data)
            
            const access_token = response.data.access_token;
            const role = response.data.role;
            // localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in local storage
            login(access_token, role, username); // Update AuthContext
    
            // Redirect based on role
            setTimeout(() => {
                navigate(role === "founder" ? "/founder-dashboard" : "/investor-dashboard");
            }, 100);
    
        } catch (err) {
            if (err.response?.status === 404) {
                setError("User not found. Please sign up.");
            } else if (err.response?.status === 401) {
                setError("Incorrect password.");
            } else {
                setError("An error occurred. Try again.");
            }
            setSuccess("");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
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
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
                    Login
                </Button>
                <Button variant="text" color="secondary" sx={{ mt: 1 }} onClick={() => navigate("/register")}>
                    Don't have an account? Sign Up
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
