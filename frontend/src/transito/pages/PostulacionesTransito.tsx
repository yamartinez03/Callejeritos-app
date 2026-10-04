import { useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";
import { EmptyState } from "../components/common/EmptyState";
import { ConfirmDialog } from "../components/common/ConfirmDialog";

export interface PostulacionTransito {
  id: string;
  nombre: string;
  telefono: string;
  localidad: string;
  tipoAnimal: "PERRO" | "GATO" | "AMBOS";
  estado: "PENDIENTE" | "APROBADA" | "RECHAZADA";
  fecha: string;
}

export default function PostulacionesTransito() {
  const [postulaciones, setPostulaciones] = useState<PostulacionTransito[]>([]);
  const [selectedPostulacion, setSelectedPostulacion] = useState<PostulacionTransito | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRechazar = (postulacion: PostulacionTransito) => {
    setSelectedPostulacion(postulacion);
    setConfirmOpen(true);
  };

  const confirmRechazar = () => {
    if (selectedPostulacion) {
      setPostulaciones((prev) =>
        prev.map((p) => (p.id === selectedPostulacion.id ? { ...p, estado: "RECHAZADA" } : p))
      );
    }
    setConfirmOpen(false);
    setSelectedPostulacion(null);
  };

  return (
    <div className="p-6">
      <SectionHeader
        title="Postulaciones a Tránsito"
        description="Gestión y revisión de solicitudes de nuevos hogares de tránsito."
      />

      {postulaciones.length === 0 ? (
        <EmptyState
          title="No hay postulaciones registradas"
          description="Actualmente no hay postulaciones pendientes de revisión."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-gray-700">Nombre</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Teléfono</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Localidad</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Preferencia</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Estado</th>
                <th className="px-5 py-4 text-right font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {postulaciones.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-800">{p.nombre}</td>
                  <td className="px-5 py-4 text-gray-600">{p.telefono}</td>
                  <td className="px-5 py-4 text-gray-600">{p.localidad}</td>
                  <td className="px-5 py-4 text-gray-600">{p.tipoAnimal}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                      {p.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleRechazar(p)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Rechazar postulación"
        description={`¿Estás seguro de que deseas rechazar la postulación de ${selectedPostulacion?.nombre}?`}
        confirmText="Rechazar"
        cancelText="Cancelar"
        onConfirm={confirmRechazar}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
