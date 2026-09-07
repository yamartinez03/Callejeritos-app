import { useEffect, useState } from "react";
import { SELF_REGISTER_ROLES, ROLE_LABELS } from "@/lib/roles";

// Ajustá esta ruta a la que exponga tu backend real para listar roles.
const ROLES_ENDPOINT = "/api/roles";

/**
 * Trae los roles disponibles desde la API. Mientras el backend no esté
 * levantado (o la llamada falle), muestra la lista fija de src/lib/roles.js
 * como respaldo, para que el formulario nunca se quede sin opciones.
 */
export function useRoles() {
  const [roles, setRoles] = useState(
    SELF_REGISTER_ROLES.map((value) => ({ value, label: ROLE_LABELS[value] }))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRoles() {
      try {
        const res = await fetch(ROLES_ENDPOINT);
        if (!res.ok) throw new Error("No se pudieron cargar los tipos de cuenta.");
        const data = await res.json();

        // ⚠️ Ajustá este mapeo a como venga realmente tu API/tabla rol.
        // Hoy asume algo como: [{ idrol: 1, nombre: "Socio" }, ...]
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
          // Backend caído/no listo todavía: seguimos con el fallback fijo.
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRoles();
    return () => {
      cancelled = true;
    };
  }, []);

  return { roles, loading, error };
}