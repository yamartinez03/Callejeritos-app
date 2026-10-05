import type { PostulacionTransito } from "../types/transito";

const STORAGE_KEY = "callejeritos.postulaciones-transito";

const postulacionDemostracion: PostulacionTransito = {
  id: "DEMO-POST-001",
  nombre: "Sofía",
  apellido: "Ramírez",
  telefono: "221-555-0198",
  email: "sofia.ramirez@example.com",
  localidad: "Villa Elisa",
  tipoVivienda: "Casa con patio cerrado",
  horariosAusencia: "De lunes a viernes, de 9 a 14 h.",
  tienePatio: true,
  consentimientoFamiliar: true,
  tieneOtrasMascotas: true,
  detalleOtrasMascotas: "Una perra adulta, sociable con otros animales.",
  experienciaPrevia: true,
  tipoAnimal: "PERRO",
  estado: "PENDIENTE",
  fechaPostulacion: "2026-10-04T12:00:00.000Z",
};

function esPostulacionTransito(
  valor: unknown,
): valor is PostulacionTransito {
  if (typeof valor !== "object" || valor === null) return false;
  const postulacion = valor as Record<string, unknown>;
  return (
    typeof postulacion.id === "string" &&
    typeof postulacion.nombre === "string" &&
    typeof postulacion.apellido === "string" &&
    typeof postulacion.telefono === "string" &&
    typeof postulacion.email === "string" &&
    typeof postulacion.localidad === "string" &&
    typeof postulacion.tipoVivienda === "string" &&
    typeof postulacion.horariosAusencia === "string" &&
    typeof postulacion.tienePatio === "boolean" &&
    typeof postulacion.consentimientoFamiliar === "boolean" &&
    typeof postulacion.tieneOtrasMascotas === "boolean" &&
    typeof postulacion.detalleOtrasMascotas === "string" &&
    typeof postulacion.experienciaPrevia === "boolean" &&
    ["PERRO", "GATO", "AMBOS"].includes(String(postulacion.tipoAnimal)) &&
    ["PENDIENTE", "EN_EVALUACION", "APROBADA", "RECHAZADA"].includes(
      String(postulacion.estado),
    ) &&
    typeof postulacion.fechaPostulacion === "string"
  );
}

export function leerPostulacionesTransito(): PostulacionTransito[] {
  const guardadas = window.localStorage.getItem(STORAGE_KEY);
  if (!guardadas) return [postulacionDemostracion];

  const postulaciones: unknown = JSON.parse(guardadas);
  if (
    !Array.isArray(postulaciones) ||
    !postulaciones.every(esPostulacionTransito)
  ) {
    throw new Error("Los datos locales de postulaciones tienen un formato inválido.");
  }

  return postulaciones.length > 0 ? postulaciones : [postulacionDemostracion];
}

export function guardarPostulacionTransito(
  postulacion: PostulacionTransito,
): void {
  const postulaciones = leerPostulacionesTransito();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...postulaciones, postulacion]),
  );
}

export function actualizarPostulacionTransito(
  id: string,
  estado: PostulacionTransito["estado"],
): void {
  const postulaciones = leerPostulacionesTransito();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      postulaciones.map((postulacion) =>
        postulacion.id === id ? { ...postulacion, estado } : postulacion,
      ),
    ),
  );
}
