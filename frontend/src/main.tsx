import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ToastProvider from "./components/Toast/ToastProvider";
import TeamPage from "@/pages/TeamPage.tsx";
import AdminPage from "@/pages/AdminPage.tsx";
import Login from "./pages/authorization/Login";
import Signup from "./pages/authorization/Signup";
import Dashboard from "./pages/registration/dashboard";
import Profile from "./pages/registration/profile";
import RegistrationTeam from "./pages/registration/team";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/apply" element={<Navigate to="/dashboard" replace />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={import.meta.env.DEV ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={import.meta.env.DEV ? <Signup /> : <Navigate to="/" replace />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* Redirect /register to /apply since that's where the actual registration form is */}
        <Route path="/register" element={<Navigate to="/apply" replace />} />
        <Route path="/registration-team" element={<ProtectedRoute><RegistrationTeam /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </ToastProvider>
  </StrictMode>
);
