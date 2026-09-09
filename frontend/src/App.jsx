import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { STAFF_ROLES } from "@/lib/roles";
import Login from "./Login/pages/Login";
import LoginSuccess from "./Login/pages/LoginSuccess";
import Registro from "./Login/pages/Registro";
import Unauthorized from "./pages/Unauthorized";
import PublicacionesPage from "./pages/publicaciones/PublicacionesPage";

// No olvidarme de reemplazar  estos placeholders por pantallas reales cuando las chicas las tengan
function Dashboard() {
  return <div className="p-8 text-foreground">Dashboard (placeholder)</div>;
}
function Gastos() {
  return <div className="p-8 text-foreground">Gastos (placeholder)</div>;
}

function AppRoutes() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [justLoggedIn, setJustLoggedIn] = useState(null);

  const handleLogin = async ({ email, password }) => {
    // Mientras no tengamos el  backend real uso  este usuario hardcodeado para poder navegar la app.
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (email !== "admin@callejeritos.com" || password !== "admin123") {
      throw new Error("Correo o contraseña incorrectos.");
    }

    const data = {
      name: "María Acosta",
      email,
      role: "administrador",
      roleLabel: "Administrador",
    };

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
      navigate("/", { replace: true });
    }, 1500);
  };

  const handleRegistro = async ({ name, email, phone, role, password }) => {
    // Mientras no tengamos el  backend real uso  este usuario hardcodeado para poder navegar la app.
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
      <Route path="/" element={<PublicacionesPage />} />

      {/* Rutas de autenticación */}
      <Route path="/login" element={<Login onSubmit={handleLogin} />} />
      <Route
        path="/registro"
        element={<Registro onSubmit={handleRegistro} />}
      />
      <Route path="/no-autorizado" element={<Unauthorized />} />

      {/* Rutas protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* solo Administrador y Núcleo operativo */}
      <Route
        path="/gastos"
        element={
          <ProtectedRoute allowedRoles={STAFF_ROLES}>
            <Gastos />
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
