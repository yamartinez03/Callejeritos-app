const API_BASE = "http://localhost:3000/api";

export const especieApi = {
  listar: async () => {
    const res = await fetch(`${API_BASE}/especies`);
    if (!res.ok) throw new Error("Error al cargar especies");
    return res.json();
  },
};
