const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Error en la solicitud");
  return data;
}

// Convierte la respuesta del backend al formato plano que usan los componentes
export function adaptarInsumo(i) {
  const tipo = i.medicamento
    ? "medicamento"
    : i.alimento
      ? "alimento"
      : "insumo";
  return {
    id: i.idinsumo,
    nombre: i.nombre,
    descripcion: i.descripcion,
    tipo,
    stock: i.stock,
    fechaVencimiento: i.fechavencimiento
      ? i.fechavencimiento.slice(0, 10)
      : null,
    // medicamento
    numerolote: i.medicamento?.numerolote ?? null,
    concentracion: i.medicamento?.concentracion ?? null,
    viaadministracion: i.medicamento?.viaadministracion ?? null,
    // alimento
    marca: i.alimento?.marca ?? null,
    tipoalimento: i.alimento?.tipoalimento?.toLowerCase() ?? null,
    peso: i.alimento?.peso ?? null,
    especieDestino: i.alimento?.especieanimal?.nombre ?? null,
  };
}

export const inventarioApi = {
  listar: async () => (await request("/inventario")).map(adaptarInsumo),
  estadisticas: () => request("/inventario/estadisticas"),
  crear: (datos) =>
    request("/inventario", { method: "POST", body: JSON.stringify(datos) }),
  darDeBaja: (id) => request(`/inventario/${id}`, { method: "DELETE" }),
  registrarMovimiento: (datos) =>
    request("/inventario/movimientos", {
      method: "POST",
      body: JSON.stringify(datos),
    }),
};
