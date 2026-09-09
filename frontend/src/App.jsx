import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { STAFF_ROLES } from "@/lib/roles";
import LoginPage from "./Login/pages/LoginPage";
import RegistroPage from "./Login/pages/RegistroPage";
import PublicacionesPage from "./pages/publicaciones/PublicacionesPage";
import Dashboard from "./pages/Dashboard";
import Gastos from "./pages/Gastos";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <Routes>
      {/* pública: es la home del sitio */}
      <Route path="/" element={<PublicacionesPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/no-autorizado" element={<Unauthorized />} />

      {/* cualquier usuario logueado, sin importar el rol */}
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
