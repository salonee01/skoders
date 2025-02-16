import { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to Home after logout
    };

    return (
        <AppBar position="sticky" sx={{ width: "100%" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    VentureSage
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">Home</Button>

                    {user ? (
                        <>
                            <Button color="inherit" component={Link} to="/profile">Profile</Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to="/login">Login/Signup</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
