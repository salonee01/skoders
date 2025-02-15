import { Container, Typography } from "@mui/material";

export default function Home() {
    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4">Welcome to AI Tools</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Use our AI-powered text generator to create content effortlessly.
            </Typography>
        </Container>
    );
}
