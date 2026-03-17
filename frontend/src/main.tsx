import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ApplyPage from "@/pages/ApplyPage.tsx";
import TeamPage from "@/pages/TeamPage.tsx";
import Login from "./pages/authorization/Login";
import Signup from "./pages/authorization/Signup";
import Dashboard from "./pages/registration/dashboard";
import Profile from "./pages/registration/profile";
import Register from "./pages/registration/register";
import RegistrationTeam from "./pages/registration/team";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration-team" element={<RegistrationTeam />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
