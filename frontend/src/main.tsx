import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ApplyPage from "@/pages/ApplyPage.tsx";
import TeamPage from "@/pages/TeamPage.tsx";
import AdminPage from "@/pages/AdminPage.tsx";
import Login from "./pages/authorization/Login";
import Signup from "./pages/authorization/Signup";
import Dashboard from "./pages/registration/dashboard";
import Profile from "./pages/registration/profile";
import RegistrationTeam from "./pages/registration/team";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RequireAdmin } from "./components/RequireAdmin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/admin" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* Redirect /register to /apply since that's where the actual registration form is */}
        <Route path="/register" element={<Navigate to="/apply" replace />} />
        <Route path="/registration-team" element={<ProtectedRoute><RegistrationTeam /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
