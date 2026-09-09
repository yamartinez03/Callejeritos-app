import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Login from "./Login";
import LoginSuccess from "./LoginSuccess";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [justLoggedIn, setJustLoggedIn] = useState(null);

  const handleLogin = async ({ email, password }) => {
    // Mientras no tengamos el backend real uso este usuario hardcodeado para poder navegar la app.
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
    const destino = location.state?.from?.pathname ?? "/dashboard";
    setTimeout(() => {
      navigate(destino, { replace: true });
    }, 1500);
  };

  if (justLoggedIn) {
    return (
      <LoginSuccess
        userName={justLoggedIn.name}
        role={justLoggedIn.roleLabel ?? justLoggedIn.role}
      />
    );
  }

  return <Login onSubmit={handleLogin} />;
}
