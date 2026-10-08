import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * Envolvé cualquier <Route element={...}> con esto.
 *
 * - Sin sesión: redirige a /login (y recuerda a dónde iba)
 * - Con sesión: rol no permitido, redirige a /no-autorizado
 * - allowedRoles omitido : alcanza con estar logueado, sin importar el rol
 * Por ejemplo:
 *   <Route
 *     path="/gastos"
 *     element={
 *       <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.NUCLEO_OPERATIVO]}>
 *         <Gastos />
 *       </ProtectedRoute>
 *     }
 *   />
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
}