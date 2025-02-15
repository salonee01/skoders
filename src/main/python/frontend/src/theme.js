import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#A8DADC", // Pastel teal
        },
        secondary: {
            main: "#FFB6B9", // Pastel pink
        },
        background: {
            default: "#F1FAEE", // Light pastel background
            paper: "#FFFFFF", // White background for paper components
        },
        text: {
            primary: "#1D3557", // Dark blue text
            secondary: "#457B9D", // Medium blue text
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
    },
});

export default theme;