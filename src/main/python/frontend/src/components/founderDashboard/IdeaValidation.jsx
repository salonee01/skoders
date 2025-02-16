import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { generateUniquenessScore, generateMarketPositivityScore } from "../../api";
import { TextField, Button, CircularProgress, Typography, Box, Link } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Link as RouterLink } from "react-router-dom";

const IdeaValidation = () => {
    const { user } = useContext(AuthContext);
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [score, setScore] = useState(null);
    const [marketScores, setMarketScores] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            console.log("User is logged in:", user.username);
        }
    }, [user]);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const uniquenessData = await generateUniquenessScore(prompt);
            setResult(`Uniqueness Score: ${uniquenessData.generated_score}%`);
            setScore(parseFloat(uniquenessData.generated_score));

            const marketData = await generateMarketPositivityScore(prompt);
            setMarketScores(marketData.generated_score);
            await axios.post("http://127.0.0.1:8000/update-roadmap-status", { step: 0, status: "completed", user_id: user.username });
        } catch (error) {
            console.error("Error generating text:", error);
            setResult("Error generating text. Please try again.");
            setScore(null);
            setMarketScores([]);
        }
        setLoading(false);
    };

    // Data for Pie Charts
    const pieData = [
        { name: "Uniqueness", value: score || 0 },
        { name: "Similarity", value: 100 - (score || 0) },
    ];

    const marketPieData = [
        { name: "Positive", value: marketScores[0] || 0 },
        { name: "Negative", value: marketScores[1] || 0 },
    ];

    const COLORS = ["#3f51b5", "#b0bec5"]; // Changed color for Similarity
    const MARKET_COLORS = ["#4caf50", "#f44336"];

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f4f4f4",
                p: 3,
            }}
        >
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
                AI-Powered Idea Validation
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={3}
                label="Enter your idea..."
                variant="outlined"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{ mb: 2, width: "50%", bgcolor: "white", borderRadius: 1 }}
                InputLabelProps={{ style: { color: "#555", fontSize: "1rem" } }}
                inputProps={{ style: { color: "#222", fontSize: "1.2rem" } }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleGenerate}
                disabled={loading}
                sx={{ mb: 2, fontSize: "1.2rem", px: 4, py: 1 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Validate Idea"}
            </Button>

            <Typography variant="body1" sx={{ mt: 2, fontSize: "1.2rem", color: "#222" }}>
                {loading ? "Generating response..." : result}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 5, mt: 5, width: "100%" }}>
                {score !== null && (
                    <Box sx={{ width: "40%", height: "50vh", bgcolor: "white", p: 3, borderRadius: 3, boxShadow: 2 }}>
                        <Typography variant="h5" sx={{ textAlign: "center", mb: 2, fontWeight: "bold", color: "#333" }}>
                            Uniqueness Score
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%" style={{ paddingBottom: '40px' }}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="90%"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend wrapperStyle={{ color: "#222", fontSize: "1rem", marginTop: '40px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                )}

                {marketScores.length > 0 && (
                    <Box sx={{ width: "40%", height: "50vh", bgcolor: "white", p: 3, borderRadius: 3, boxShadow: 2 }}>
                        <Typography variant="h5" sx={{ textAlign: "center", mb: 2, fontWeight: "bold", color: "#333" }}>
                            Market Acceptance
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%" style={{ paddingBottom: '40px' }}>
                            <PieChart>
                                <Pie
                                    data={marketPieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="90%"
                                    dataKey="value"
                                >
                                    {marketPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={MARKET_COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend wrapperStyle={{ color: "#222", fontSize: "1rem", marginTop: '40px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center', mb: 10 }}>
                <Typography variant="body1" sx={{ fontSize: '1rem', color: '#3f51b5', marginTop: '40px', marginBottom: '40px' }}>
                    Looking for better ideas? <Link component={RouterLink} to="/find-ideas">Click here</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default IdeaValidation;