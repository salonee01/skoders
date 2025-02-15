import { useState } from "react";
import { generateUniquenessScore, generateMarketPositivityScore } from "../api";
import { TextField, Button, Card, CardContent, CircularProgress, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function TextGenComponent() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [score, setScore] = useState(null); // Store uniqueness score
    const [marketScores, setMarketScores] = useState([]); // Store market positivity scores
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const uniquenessData = await generateUniquenessScore(prompt);
            setResult(`Uniqueness Score: ${uniquenessData.generated_score}%`);
            setScore(parseFloat(uniquenessData.generated_score)); // Convert score to number

            const marketData = await generateMarketPositivityScore(prompt);
            setMarketScores(marketData.generated_score); // Store market positivity scores
        } catch (error) {
            console.error("Error generating text:", error);
            setResult("Error generating text. Please try again.");
            setScore(null);
            setMarketScores([]);
        }
        setLoading(false);
    };

    // Data for Pie Chart
    const pieData = [
        { name: "Uniqueness", value: score || 0 },
        { name: "Remaining", value: 100 - (score || 0) },
    ];

    const marketPieData = [
        { name: "Positive", value: marketScores[0] || 0 },
        { name: "Negative", value: marketScores[1] || 0 },
    ];

    const COLORS = ["#3f51b5", "#e0e0e0"]; // Colors for the Pie Chart
    const MARKET_COLORS = ["#4caf50", "#f44336"]; // Colors for the Market Positivity Pie Chart

    return (
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    AI Uniqueness Score
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Enter prompt"
                    variant="outlined"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerate}
                    disabled={loading}
                    sx={{ mb: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
                </Button>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {loading ? "Generating response..." : result}
                </Typography>

                {score !== null && (
                    <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70} // Makes it a Donut Chart
                                    outerRadius={90}
                                    startAngle={90}
                                    endAngle={-270} // Ensures it fills clockwise
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Centered Uniqueness Score Text */}
                        <Typography 
                            variant="h5" 
                            sx={{ position: "absolute", fontWeight: "bold", color: "#3f51b5" }}
                        >
                            {score.toFixed(1)}%
                        </Typography>
                    </Box>
                )}

                {marketScores.length > 0 && (
                    <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={marketPieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70} // Makes it a Donut Chart
                                    outerRadius={90}
                                    startAngle={90}
                                    endAngle={-270} // Ensures it fills clockwise
                                    dataKey="value"
                                >
                                    {marketPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={MARKET_COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Centered Market Positivity Score Text */}
                        <Typography 
                            variant="h5" 
                            sx={{ position: "absolute", fontWeight: "bold", color: "#4caf50" }}
                        >
                            {marketScores[0].toFixed(1)}%
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}