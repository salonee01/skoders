import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import TextGenComponent from "./components/TextGenComponent";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <TextGenComponent />
        </ThemeProvider>
    );
}

export default App;
