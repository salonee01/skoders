import React, { useContext } from "react";
import { Container, Typography, Box, Grid, Button, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Assuming you have an AuthContext to provide user info

const Home = () => {
    const { user } = useContext(AuthContext); // Get user info from context

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Welcome to VectureSage
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Your one-stop platform for startup success. Validate your ideas, find co-founders, secure funding, and create compelling business plans and pitches.
            </Typography>
            {!user && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Empowering Entrepreneurs and Investors
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
                        VectureSage is dedicated to helping entrepreneurs turn their ideas into successful startups and providing investors with opportunities to support innovative ventures. Join us to explore a world of possibilities.
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://boisestate.pressbooks.pub/app/uploads/sites/101/2021/04/Two-women-entrepreneurs-jump-next-to-a-large-lightbulb-of-a-business-idea-taking-off-like-a-rocket..jpg"
                                    alt="Entrepreneurship"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Entrepreneurship
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Discover resources and tools to help you start and grow your business.
                                    </Typography>
                                    <Button component={Link} to="/learn-more" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://ieefa.org/sites/default/files/styles/header_full/public/2023-01/shutterstock_2081393545.jpg?itok=npsBcU1p"
                                    alt="Investment"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Investment Opportunities
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Explore investment opportunities and support innovative startups.
                                    </Typography>
                                    <Button component={Link} to="/learn-more" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://i0.wp.com/nxtdecade.com/wp-content/uploads/2021/02/nxtdecade-community.png?fit=930%2C620&ssl=1"
                                    alt="Community"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Community
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Join a community of like-minded entrepreneurs and investors.
                                    </Typography>
                                    <Button component={Link} to="/learn-more" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
            {user?.role === "founder" && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        For Founders
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/idea-validation.jpg"
                                    alt="Idea Validation"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Idea Validation
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Validate your business idea through market research and feedback.
                                    </Typography>
                                    <Button component={Link} to="/idea-validation" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/cofounder-matching.jpg"
                                    alt="Co-Founder Matching"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Co-Founder Matching
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Find the right co-founder to complement your skills and vision.
                                    </Typography>
                                    <Button component={Link} to="/cofounder-matching" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/fund-feasibility.jpg"
                                    alt="Fund Feasibility"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Fund Feasibility
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Assess the financial feasibility of your startup and secure funding.
                                    </Typography>
                                    <Button component={Link} to="/fund-feasibility" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/business-plan.jpg"
                                    alt="Business Plan"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Business Plan
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Create a comprehensive business plan outlining your strategy and goals.
                                    </Typography>
                                    <Button component={Link} to="/business-plan" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/investor-pitch.jpg"
                                    alt="Investor Pitch Generation"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Investor Pitch Generation
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Develop a compelling pitch to attract potential investors.
                                    </Typography>
                                    <Button component={Link} to="/pitch" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
            {user?.role === "investor" && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        For Investors
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/investor-dashboard.jpg"
                                    alt="Investor Dashboard"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Investor Dashboard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Access a curated list of startups and track your investments.
                                    </Typography>
                                    <Button component={Link} to="/investor-dashboard" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/market-analysis.jpg"
                                    alt="Market Analysis"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Market Analysis
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Analyze market trends and identify investment opportunities.
                                    </Typography>
                                    <Button component={Link} to="/market-analysis" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default Home;