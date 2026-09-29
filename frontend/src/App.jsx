import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./Login/pages/Login";
import LoginSuccess from "./Login/pages/LoginSuccess";
import Registro from "./Login/pages/Registro";
import Unauthorized from "./pages/Unauthorized";
import PublicacionesHeader from "./pages/publicaciones/PublicacionesHeader";
import DashboardPage from "./pages/dashboard/DashboardPage";

function AppRoutes() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [justLoggedIn, setJustLoggedIn] = useState(null);

  const handleLogin = async ({ email, password }) => {
    // Mientras no tengamos el backend real uso este usuario hardcodeado para poder navegar la app.
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Login con diferentes roles para pruebas transitante y admin
    let data;
    if (email === "admin@callejeritos.com" && password === "admin123") {
      data = {
        name: "María Acosta",
        email,
        role: "administrador",
        roleLabel: "Administrador",
      };
    } else if (
      email === "transitante@callejeritos.com" &&
      password === "trans123"
    ) {
      data = {
        name: "Juan Pérez",
        email,
        role: "transitante",
        roleLabel: "Transitante",
      };
    } else {
      throw new Error("Correo o contraseña incorrectos.");
    }

    /* Cuando tengamos el back borramos lo de arriba y usamos esto
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Correo o contraseña incorrectos.");
    }

    const data = await res.json(); // se espera al menos: { name, email, role }
    --- */

    login(data);
    setJustLoggedIn(data);
    setTimeout(() => {
      setJustLoggedIn(null);
      navigate("/dashboard", { replace: true });
    }, 1500);
  };

  const handleRegistro = async ({ name, email, phone, role, password }) => {
    // Mientras no tengamos el backend real uso este usuario hardcodeado para poder navegar la app.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Registro simulado:", { name, email, phone, role, password });

    /* Cuando tengamos el back borramos lo de arriba y usamos esto
    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, role, password }),
    });

    if (!res.ok) {
      throw new Error("No pudimos crear tu cuenta. Probá de nuevo.");
    }
    --- */
  };

  if (justLoggedIn) {
    return (
      <LoginSuccess
        userName={justLoggedIn.name}
        role={justLoggedIn.roleLabel ?? justLoggedIn.role}
      />
    );
  }

  return (
    <Routes>
      {/* Ruta pública - página principal */}
      <Route path="/" element={<PublicacionesHeader />} />

      {/* Rutas de autenticación */}
      <Route path="/login" element={<Login onSubmit={handleLogin} />} />
      <Route
        path="/registro"
        element={<Registro onSubmit={handleRegistro} />}
      />
      <Route path="/no-autorizado" element={<Unauthorized />} />

      {/* Rutas protegidas - Dashboard con subrutas anidadas */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}
