import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // Custom primary color
        },
        secondary: {
            main: "#ff4081", // Custom secondary color
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
    },
});

export default theme;
