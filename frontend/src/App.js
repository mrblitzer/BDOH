import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SubjectHubs from "./components/SubjectHubs";
import PracticeArena from "./components/PracticeArena";
import CompetitionCenter from "./components/CompetitionCenter";
import Community from "./components/Community";
import BdohPanelists from "./components/BdohPanelists";
import PresidentsCorner from "./components/PresidentsCorner";
import Footer from "./components/Footer";
import AdminDashboard from "./components/admin/AdminDashboard";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SubjectHubs />
      <PracticeArena />
      <CompetitionCenter />
      <BdohPanelists />
      <PresidentsCorner />
      <Community />
      <Footer />
    </div>
  );
};

const Admin = () => {
  return (
    <div className="min-h-screen">
      <AdminDashboard />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;