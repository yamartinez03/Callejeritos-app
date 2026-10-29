import { useEffect, useState } from "react";
import { ROLE_LABELS, ROLES } from "@/lib/roles";

const ROLES_ENDPOINT = "/api/roles";

/**
 * Trae todos los roles disponibles desde la API.
 *
 * Este hook se utiliza para tareas administrativas,
 * por ejemplo, para que un administrador pueda asignar
 * o modificar el rol de un usuario.
 */
export function useRoles() {
  const [roles, setRoles] = useState(
    Object.values(ROLES).map((value) => ({
      value,
      label: ROLE_LABELS[value],
    }))
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRoles() {
      try {
        const res = await fetch(ROLES_ENDPOINT);

        if (!res.ok) {
          throw new Error("No se pudieron cargar los roles.");
        }

        const data = await res.json();

        const mapped = data.map((r) => ({
          value: r.idrol ?? r.id ?? r.value,
          label: r.nombre ?? r.label,
        }));

        if (!cancelled && mapped.length > 0) {
          setRoles(mapped);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          // Si el backend todavía no está disponible,
          // mantenemos los roles definidos localmente.
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRoles();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    roles,
    loading,
    error,
  };
}