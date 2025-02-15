import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import TextGenComponent from "./components/TextGenComponent";
import Signup from "./components/Signup";
import { AuthContext } from "./components/AuthContext";
import FounderDashboard from "./components/FounderDashboard";
import FounderForm from "./components/founderDashboard/CoFounderMatching";
import IdeaValidation from "./components/founderDashboard/IdeaValidation";
import PitchGenerator from "./components/founderDashboard/PitchGenerator";

export default function App() {
  const { user } = useContext(AuthContext);

  // Prevent redirection issues by ensuring user is fully loaded
  if (user === undefined) {
      return <div>Loading...</div>;
  }

  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/text-gen" element={<TextGenComponent />} />

              {/* Redirect logged-in users away from login/register */}
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Signup />} />

              {/* Protected Routes */}
              <Route 
                  path="/founder-dashboard" 
                  element={user?.role === "founder" ? <FounderDashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                  path="/cofounder-matching" 
                  element={user?.role === "founder" ? <FounderForm /> : <Navigate to="/login" />} 
              />
              <Route 
                  path="/idea-validation" 
                  element={user?.role === "founder" ? <IdeaValidation /> : <Navigate to="/login" />} 
              />
              <Route 
                  path="/investor-dashboard" 
                  element={user?.role === "investor" ? <InvestorDashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                  path="/pitch" 
                  element={user?.role === "founder" ? <PitchGenerator /> : <Navigate to="/login" />} 
              />
              
          </Routes>
      </Router>
  );
}