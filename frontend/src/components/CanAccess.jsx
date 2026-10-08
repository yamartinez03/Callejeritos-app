import { useAuth } from "@/context/AuthContext";

/**
 *Ocultar botones dentro de una página sin necesitar una ruta nueva. 
 * Por ejemplo : mostrar el botón "Aprobar gasto" solo a Administrador y Núcleo operativo.
 *  Asi seria el codigo 
 *   <CanAccess roles={[ROLES.ADMIN, ROLES.NUCLEO_OPERATIVO]}>
 *     <Button>Aprobar gasto</Button>
 *   </CanAccess>
 */
export function CanAccess({ roles, children, fallback = null }) {
  const { role } = useAuth();
  if (!roles.includes(role)) return fallback;
  return children;
}