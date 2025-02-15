import { useState, useContext } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, AppBar, Toolbar, Typography, Box, Container, Grid, Card, CardContent, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import GavelIcon from "@mui/icons-material/Gavel";
import MessageIcon from "@mui/icons-material/Message";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const FounderDashboard = () => {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(true);

    const revenueData = [
        { month: "Jan", revenue: 5000 },
        { month: "Feb", revenue: 8000 },
        { month: "Mar", revenue: 12000 },
        { month: "Apr", revenue: 15000 },
        { month: "May", revenue: 18000 },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? 240 : 60,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? 240 : 60,
                        transition: "width 0.3s",
                    },
                }}
            >
                <List>
                    <ListItem button onClick={() => setOpen(!open)}>
                        <ListItemIcon>{open ? <CloseIcon /> : <MenuIcon />}</ListItemIcon>
                        {open && <ListItemText primary="Collapse" />}
                    </ListItem>
                    <ListItem button component={Link} to="/idea-validation">
                        <ListItemIcon><BusinessIcon /></ListItemIcon>
                        {open && <ListItemText primary="Idea Validation" />}
                    </ListItem>
                    <ListItem button component={Link} to="/cofounder-matching">
                        <ListItemIcon><GroupIcon /></ListItemIcon>
                        {open && <ListItemText primary="Co-Founder Matching" />}
                    </ListItem>
                    <ListItem button component={Link} to="/legal-compliance">
                        <ListItemIcon><GavelIcon /></ListItemIcon>
                        {open && <ListItemText primary="Legal Compliance" />}
                    </ListItem>
                    <ListItem button component={Link} to="/investor-messages">
                        <ListItemIcon><MessageIcon /></ListItemIcon>
                        {open && <ListItemText primary="Investor Messages" />}
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Container>
                    <Typography variant="h4" gutterBottom>Founder Dashboard</Typography>
                    <Grid container spacing={3}>
                        {/* Startup Overview */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ backgroundColor: "#f5f5f5" }}>
                                <CardContent>
                                    <Typography variant="h6">Startup Overview</Typography>
                                    <Typography>Total Funding: ₹50,00,000</Typography>
                                    <Typography>Monthly Revenue: ₹18,000</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Investor Messages */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ backgroundColor: "#f5f5f5" }}>
                                <CardContent>
                                    <Typography variant="h6">Investor Messages</Typography>
                                    <Typography>3 Pending Messages</Typography>
                                    <Button variant="contained" sx={{ mt: 1 }}>View Messages</Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Team Management */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ backgroundColor: "#f5f5f5" }}>
                                <CardContent>
                                    <Typography variant="h6">Team Management</Typography>
                                    <Typography>Team Members: 12</Typography>
                                    <Button variant="contained" sx={{ mt: 1 }}>Manage Team</Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Growth Analytics */}
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Growth Analytics</Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Quick Actions */}
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item>
                            <Button variant="contained" color="primary" component={Link} to="/update-investors">
                                Send Investor Update
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" component={Link} to="/funding-request">
                                Create Funding Request
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default FounderDashboard;
