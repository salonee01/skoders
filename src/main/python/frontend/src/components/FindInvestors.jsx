import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const investors = [
    { name: "John Doe", company: "Tech Ventures", investment: 50000 },
    { name: "Jane Smith", company: "Innovate Inc.", investment: 75000 },
    { name: "Alice Johnson", company: "Startup Solutions", investment: 100000 },
    { name: "Michael Brown", company: "Growth Capital", investment: 120000 },
    { name: "Emily Davis", company: "Future Fund", investment: 90000 },
    { name: "David Wilson", company: "Seed Investors", investment: 110000 },
    { name: "Sarah Miller", company: "Angel Network", investment: 95000 },
    { name: "James Taylor", company: "Venture Partners", investment: 105000 },
    { name: "Jessica Anderson", company: "Equity Group", investment: 80000 },
    { name: "Daniel Thomas", company: "Capital Ventures", investment: 115000 },
];

const FindInvestors = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [enquiredInvestors, setEnquiredInvestors] = useState([]);

    useEffect(() => {
        if (location.state && location.state.investorName) {
            setEnquiredInvestors((prev) => [...prev, location.state.investorName]);
        }
    }, [location.state]);

    const handleEnquireNow = (investorName) => {
        navigate(`/chat/${investorName}`);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Find Investors
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333', mb: 4 }}>
                You will find the best investors here.
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>Name of Founder</strong></TableCell>
                            <TableCell><strong>Company Name</strong></TableCell>
                            <TableCell><strong>Investment Guaranteed (USD)</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {investors.map((investor, index) => (
                            <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: '#f9f9f9' } }}>
                                <TableCell>{investor.name}</TableCell>
                                <TableCell>{investor.company}</TableCell>
                                <TableCell>${investor.investment.toLocaleString()}</TableCell>
                                <TableCell>
                                    {enquiredInvestors.includes(investor.name) ? (
                                        <Button variant="contained" color="secondary" disabled>
                                            Waiting for response
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleEnquireNow(investor.name)}
                                        >
                                            Enquire Now
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default FindInvestors;