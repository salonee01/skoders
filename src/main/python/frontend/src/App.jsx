import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TextGenComponent from "./components/TextGenComponent";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/text-gen" element={<TextGenComponent />} />
            </Routes>
        </Router>
    );
}
