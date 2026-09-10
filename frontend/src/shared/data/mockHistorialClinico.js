/**
 * mockHistorialClinico.js
 * -----------------------------------------------------------------------
 * Datos y "API" simulada para el módulo de Historial Clínico (GH_01..GH_08).
 *
 * Modelo de datos (según schema.prisma):
 *   HistorialClinico (idanimal, fecha, descripcion)
 *     -> RegistroAtencionMedica (idhistorial, idresponsable, tipo, fecha)
 *          -> RegistroVacuna | RegistroDesparasitacion | RegistroEstudio | RegistroTratamiento (1:1 opcional)
 *
 * Para simplificar el mock, cada "registro" de este archivo representa la
 * combinación ya resuelta de HistorialClinico + RegistroAtencionMedica +
 * su subtipo (lo que en un backend real sería el resultado de un JOIN /
 * `include` de Prisma). Cada registro creado por los formularios genera
 * su propio HistorialClinico "evento" 1 a 1 con su RegistroAtencionMedica,
 * que es el caso de uso más simple y cubre igual todos los flujos de GH.
 *
 * Nota de modelado — GH_02 "Registrar atención veterinaria": el enum
 * TipoAtencionMedica del schema sólo define VACUNA | DESPARASITACION |
 * ESTUDIO | TRATAMIENTO, sin un valor para una atención/consulta general.
 * Se modela acá como tipo "ATENCION" (una RegistroAtencionMedica sin
 * subtipo asociado, con su propia descripción y comprobante) para poder
 * cubrir el caso de uso; a validar con el equipo si conviene agregar ese
 * valor al enum o si "atención veterinaria" debería mapear a alguno de
 * los cuatro tipos existentes.
 *
 * Nota — "Veterinaria o profesional (+ otro)": el modelo Responsable tiene
 * tipo VETERINARIA | PROFESIONAL. La opción "otro" de los formularios no
 * corresponde a un Responsable del directorio, así que se guarda como
 * texto libre (`responsable: { tipo: "OTRO", nombre }`) en vez de un FK.
 * -----------------------------------------------------------------------
 */

import { VETERINARIAS } from "@/shared/data/mockAnimales";

// ---- Catálogos -----------------------------------------------------------

export const VACUNAS = [
  { idvacuna: 1, nombre: "Quíntuple" },
  { idvacuna: 2, nombre: "Séxtuple" },
  { idvacuna: 3, nombre: "Antirrábica" },
  { idvacuna: 4, nombre: "Triple felina" },
  { idvacuna: 5, nombre: "Leucemia felina (FeLV)" },
];

export const TIPOS_ESTUDIO = [
  "Análisis de sangre",
  "Perfil bioquímico",
  "Radiografía",
  "Ecografía",
  "Test FeLV/FIV",
  "Otro",
];

// Responsable.tipo = PROFESIONAL (complementa a VETERINARIAS, que ya
// representa Responsable.tipo = VETERINARIA en mockAnimales.js)
export const PROFESIONALES = [
  { idresponsable: 301, nombre: "Dra. Valeria Suárez", especialidad: "Cirugía" },
  { idresponsable: 302, nombre: "Dr. Martín Ríos", especialidad: "Dermatología" },
  { idresponsable: 303, nombre: "Dra. Noelia Fernández", especialidad: "Clínica general" },
];

/** Directorio unificado para los desplegables "Veterinaria o profesional". */
export const RESPONSABLES_DIRECTORIO = [
  ...VETERINARIAS.map((v) => ({ idresponsable: v.idresponsable, nombre: v.nombre, tipo: "VETERINARIA" })),
  ...PROFESIONALES.map((p) => ({
    idresponsable: p.idresponsable,
    nombre: `${p.nombre} (${p.especialidad})`,
    tipo: "PROFESIONAL",
  })),
];

export const TIPOS_ATENCION = [
  { value: "ATENCION", label: "Atención veterinaria" },
  { value: "ESTUDIO", label: "Estudio" },
  { value: "VACUNA", label: "Vacunación" },
  { value: "DESPARASITACION", label: "Desparasitación" },
  { value: "TRATAMIENTO", label: "Tratamiento" },
];

// ---- Registros por animal --------------------------------------------------
// idanimal -> RegistroHistorial[]. Ver forma del objeto en el comentario de cabecera.

let _correlativoId = 9000;
const nuevoId = () => ++_correlativoId;

export const HISTORIAL = {
  1: [
    {
      idregistro: 9001,
      idanimal: 1,
      tipo: "VACUNA",
      fecha: "2025-05-02T10:00:00",
      responsable: { nombre: "Veterinaria San Roque", tipo: "VETERINARIA", idresponsable: 101 },
      descripcion: "",
      archivo: null,
      vacuna: { nombre: "Quíntuple", fechaVencimiento: "2026-05-02" },
    },
    {
      idregistro: 9002,
      idanimal: 1,
      tipo: "VACUNA",
      fecha: "2025-06-10T10:00:00",
      responsable: { nombre: "Veterinaria San Roque", tipo: "VETERINARIA", idresponsable: 101 },
      descripcion: "",
      archivo: null,
      vacuna: { nombre: "Antirrábica", fechaVencimiento: "2026-06-10" },
    },
    {
      idregistro: 9003,
      idanimal: 1,
      tipo: "DESPARASITACION",
      fecha: "2026-08-10T11:00:00",
      responsable: { nombre: "Veterinaria San Roque", tipo: "VETERINARIA", idresponsable: 101 },
      descripcion: "",
      archivo: null,
      desparasitacion: { producto: "Drontal Plus", dosis: "1 comprimido cada 10kg", proximaAplicacion: "2026-09-10" },
    },
    {
      idregistro: 9004,
      idanimal: 1,
      tipo: "ESTUDIO",
      fecha: "2026-08-10T11:30:00",
      responsable: { nombre: "Veterinaria San Roque", tipo: "VETERINARIA", idresponsable: 101 },
      descripcion: "",
      archivo: "hemograma_luna.pdf",
      estudio: { tipoEstudio: "Análisis de sangre", resultado: "Hemograma dentro de parámetros normales." },
    },
    {
      idregistro: 9005,
      idanimal: 1,
      tipo: "ATENCION",
      fecha: "2026-08-10T12:00:00",
      responsable: { nombre: "Veterinaria San Roque", tipo: "VETERINARIA", idresponsable: 101 },
      descripcion: "Control general de rutina, buen estado nutricional.",
      archivo: null,
    },
  ],
  2: [
    {
      idregistro: 9006,
      idanimal: 2,
      tipo: "VACUNA",
      fecha: "2026-03-01T09:00:00",
      responsable: { nombre: "Clínica Huellitas", tipo: "VETERINARIA", idresponsable: 102 },
      descripcion: "",
      archivo: null,
      vacuna: { nombre: "Triple felina", fechaVencimiento: "2027-03-01" },
    },
    {
      idregistro: 9007,
      idanimal: 2,
      tipo: "DESPARASITACION",
      fecha: "2026-07-25T10:00:00",
      responsable: { nombre: "Clínica Huellitas", tipo: "VETERINARIA", idresponsable: 102 },
      descripcion: "",
      archivo: null,
      desparasitacion: { producto: "Milbemax", dosis: "1/2 comprimido", proximaAplicacion: "2026-09-25" },
    },
    {
      idregistro: 9008,
      idanimal: 2,
      tipo: "TRATAMIENTO",
      fecha: "2026-08-20T14:00:00",
      responsable: { nombre: "Clínica Huellitas", tipo: "VETERINARIA", idresponsable: 102 },
      descripcion: "Otitis en oído izquierdo",
      archivo: "receta_mochi.pdf",
      tratamiento: { fechaInicio: "2026-08-20", fechaFin: "2026-08-30", medicacion: "Otomax, 2 gotas cada 12hs" },
    },
  ],
  3: [
    {
      idregistro: 9009,
      idanimal: 3,
      tipo: "DESPARASITACION",
      fecha: "2025-03-01T10:00:00",
      responsable: { nombre: "Veterinaria San Roque", tipo: "VETERINARIA", idresponsable: 101 },
      descripcion: "",
      archivo: null,
      desparasitacion: { producto: "Drontal", dosis: "1 comprimido cada 10kg", proximaAplicacion: "2025-09-01" },
    },
  ],
  4: [
    {
      idregistro: 9010,
      idanimal: 4,
      tipo: "ATENCION",
      fecha: "2026-07-15T16:00:00",
      responsable: { nombre: "Veterinaria del Parque", tipo: "VETERINARIA", idresponsable: 103 },
      descripcion: "Seguimiento post adopción, adaptación favorable.",
      archivo: null,
    },
  ],
};

/** GH_07 — Consultar historial clínico: todos los registros del animal, más recientes primero. */
export function listarHistorial(idanimal) {
  const registros = HISTORIAL[idanimal] ?? [];
  return [...registros].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

/** true si existe una desparasitación vigente (próxima aplicación aún no vencida) — precondición de GH_06. */
export function tieneDesparasitacionVigente(idanimal) {
  const hoy = new Date();
  return (HISTORIAL[idanimal] ?? []).some(
    (r) => r.tipo === "DESPARASITACION" && new Date(r.desparasitacion.proximaAplicacion) >= hoy
  );
}

/** Resuelve el campo "responsable" del formulario (id de RESPONSABLES_DIRECTORIO u "OTRO" + texto libre). */
export function resolverResponsable({ responsableId, responsableOtro }) {
  if (responsableId === "OTRO") {
    return { nombre: responsableOtro?.trim() || "Otro", tipo: "OTRO", idresponsable: null };
  }
  const encontrado = RESPONSABLES_DIRECTORIO.find((r) => String(r.idresponsable) === responsableId);
  return encontrado
    ? { nombre: encontrado.nombre, tipo: encontrado.tipo, idresponsable: encontrado.idresponsable }
    : null;
}

/** Valores de formulario (responsableId/responsableOtro) a partir de un responsable ya resuelto — usado al precargar la edición. */
export function responsableAFormulario(responsable) {
  if (!responsable) return { responsableId: "", responsableOtro: "" };
  if (responsable.tipo === "OTRO") return { responsableId: "OTRO", responsableOtro: responsable.nombre };
  return { responsableId: String(responsable.idresponsable), responsableOtro: "" };
}

function agregarRegistro(idanimal, registro) {
  if (!HISTORIAL[idanimal]) HISTORIAL[idanimal] = [];
  const nuevo = { idregistro: nuevoId(), idanimal, ...registro };
  HISTORIAL[idanimal].push(nuevo);
  return nuevo;
}

/** GH_02 — Registrar atención veterinaria. */
export function registrarAtencionVeterinaria(idanimal, datos) {
  return agregarRegistro(idanimal, {
    tipo: "ATENCION",
    fecha: datos.fecha,
    responsable: resolverResponsable(datos),
    descripcion: datos.descripcion.trim(),
    archivo: datos.archivo,
  });
}

/** GH_03 — Registrar estudio. Acepta un array porque el formulario permite duplicar bloques ("Otro estudio"). */
export function registrarEstudios(idanimal, bloques) {
  return bloques.map((datos) =>
    agregarRegistro(idanimal, {
      tipo: "ESTUDIO",
      fecha: datos.fecha,
      responsable: resolverResponsable(datos),
      descripcion: "",
      archivo: datos.archivo,
      estudio: { tipoEstudio: datos.tipoEstudio, resultado: datos.resultado.trim() },
    })
  );
}

/** GH_05 — Registrar vacunación. Acepta un array ("Otra vacunación"). */
export function registrarVacunaciones(idanimal, bloques) {
  return bloques.map((datos) =>
    agregarRegistro(idanimal, {
      tipo: "VACUNA",
      fecha: datos.fechaAplicacion,
      responsable: resolverResponsable(datos),
      descripcion: "",
      archivo: null,
      vacuna: { nombre: datos.nombreVacuna, fechaVencimiento: datos.fechaVencimiento },
    })
  );
}

/** GH_06 — Registrar desparasitación (un único registro por precondición de negocio). */
export function registrarDesparasitacion(idanimal, datos) {
  return agregarRegistro(idanimal, {
    tipo: "DESPARASITACION",
    fecha: datos.fechaAplicacion,
    responsable: resolverResponsable(datos),
    descripcion: "",
    archivo: null,
    desparasitacion: {
      producto: datos.producto.trim(),
      dosis: datos.dosis.trim(),
      proximaAplicacion: datos.proximaAplicacion,
    },
  });
}

/** GH_08 — Registrar tratamiento. Acepta un array ("Otro tratamiento"). */
export function registrarTratamientos(idanimal, bloques) {
  return bloques.map((datos) =>
    agregarRegistro(idanimal, {
      tipo: "TRATAMIENTO",
      fecha: datos.fecha,
      responsable: resolverResponsable(datos),
      descripcion: datos.descripcion.trim(),
      archivo: datos.archivo,
      tratamiento: {
        fechaInicio: datos.fechaInicio,
        fechaFin: datos.fechaFin,
        medicacion: datos.medicacion.trim(),
      },
    })
  );
}

/** GH_04 — Modificar historial clínico: actualiza un registro puntual por id. */
export function actualizarRegistro(idanimal, idregistro, cambios) {
  const lista = HISTORIAL[idanimal] ?? [];
  const idx = lista.findIndex((r) => r.idregistro === idregistro);
  if (idx === -1) return null;
  lista[idx] = { ...lista[idx], ...cambios };
  return lista[idx];
}