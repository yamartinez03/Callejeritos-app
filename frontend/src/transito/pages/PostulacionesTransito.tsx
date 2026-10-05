import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "../components/common/SectionHeader";
import { EmptyState } from "../components/common/EmptyState";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import type { PostulacionTransito } from "../types/transito";
import {
  actualizarPostulacionTransito,
  leerPostulacionesTransito,
} from "../mocks/postulacionesStorage";

export default function PostulacionesTransito() {
  const [postulaciones, setPostulaciones] = useState<PostulacionTransito[]>([]);
  const [selectedPostulacion, setSelectedPostulacion] = useState<PostulacionTransito | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setPostulaciones(leerPostulacionesTransito());
    } catch (cause) {
      setError(
        cause instanceof Error
          ? `No se pudieron cargar las postulaciones: ${cause.message}`
          : "No se pudieron cargar las postulaciones.",
      );
    }
  }, []);

  const cambiarEstado = (
    postulacion: PostulacionTransito,
    estado: PostulacionTransito["estado"],
  ) => {
    try {
      actualizarPostulacionTransito(postulacion.id, estado);
      setPostulaciones((prev) =>
        prev.map((actual) =>
          actual.id === postulacion.id ? { ...actual, estado } : actual,
        ),
      );
      setError("");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? `No se pudo actualizar la postulación: ${cause.message}`
          : "No se pudo actualizar la postulación.",
      );
    }
  };

  const handleRechazar = (postulacion: PostulacionTransito) => {
    setSelectedPostulacion(postulacion);
    setConfirmOpen(true);
  };

  const confirmRechazar = () => {
    if (selectedPostulacion) {
      cambiarEstado(selectedPostulacion, "RECHAZADA");
    }
    setConfirmOpen(false);
    setSelectedPostulacion(null);
  };

  return (
    <div className="min-h-screen bg-muted p-6 text-foreground">
      <SectionHeader
        title="Postulaciones a Tránsito"
      />
      <p className="mb-4 text-sm text-muted-foreground" role="status">
        <span className="font-semibold text-foreground">
          {postulaciones.filter((postulacion) => postulacion.estado === "PENDIENTE").length}
        </span>{" "}
        postulaciones pendientes de evaluación
      </p>

      {error && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {postulaciones.length === 0 ? (
        <EmptyState
          title="No hay postulaciones registradas"
          description="Actualmente no hay postulaciones pendientes de revisión."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <table className="w-full min-w-[1120px] table-fixed text-left text-sm">
            <colgroup>
              <col className="w-[14%]" />
              <col className="w-[9%]" />
              <col className="w-[18%]" />
              <col className="w-[9%]" />
              <col className="w-[10%]" />
              <col className="w-[8%]" />
              <col className="w-[10%]" />
              <col className="w-[8%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-3 py-4 font-semibold text-foreground">Nombre</th>
                <th className="px-3 py-4 font-semibold text-foreground">Teléfono</th>
                <th className="px-3 py-4 font-semibold text-foreground">Correo</th>
                <th className="px-3 py-4 font-semibold text-foreground">Localidad</th>
                <th className="px-3 py-4 font-semibold text-foreground">Vivienda</th>
                <th className="px-3 py-4 font-semibold text-foreground">Preferencia</th>
                <th className="px-3 py-4 font-semibold text-foreground">Postulada</th>
                <th className="px-3 py-4 font-semibold text-foreground">Estado</th>
                <th className="px-3 py-4 text-right font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {postulaciones.map((p) => (
                <tr key={p.id} className="hover:bg-muted/70">
                  <td className="px-3 py-4 font-medium text-foreground">
                    {p.nombre} {p.apellido}
                    {p.id.startsWith("DEMO-") && (
                      <span className="ml-2 inline-block rounded-full bg-info/15 px-2 py-0.5 text-[10px] font-semibold text-info">
                        EJEMPLO
                      </span>
                    )}
                    <details className="mt-1 text-xs font-normal text-muted-foreground">
                      <summary className="cursor-pointer">Ver respuestas</summary>
                      <dl className="mt-2 space-y-1">
                        <div>Horarios fuera de casa: {p.horariosAusencia}</div>
                        <div>Patio: {p.tienePatio ? "Sí" : "No"}</div>
                        <div>
                          Otras mascotas:{" "}
                          {p.tieneOtrasMascotas
                            ? p.detalleOtrasMascotas
                            : "No"}
                        </div>
                        <div>
                          Experiencia previa: {p.experienciaPrevia ? "Sí" : "No"}
                        </div>
                        <div>
                          Consentimiento familiar:{" "}
                          {p.consentimientoFamiliar ? "Confirmado" : "No confirmado"}
                        </div>
                      </dl>
                    </details>
                  </td>
                  <td className="break-words px-3 py-4 text-muted-foreground">{p.telefono}</td>
                  <td className="break-all px-3 py-4 text-muted-foreground">{p.email}</td>
                  <td className="break-words px-3 py-4 text-muted-foreground">{p.localidad}</td>
                  <td className="break-words px-3 py-4 text-muted-foreground">{p.tipoVivienda}</td>
                  <td className="break-words px-3 py-4 text-muted-foreground">{p.tipoAnimal}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-muted-foreground">
                    {new Date(p.fechaPostulacion).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-4 text-muted-foreground">
                    <span className="rounded-full bg-warning/20 px-3 py-1 text-xs font-medium text-warning-foreground">
                      {p.estado}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-wrap justify-end gap-2">
                      {p.estado === "PENDIENTE" && (
                        <Button
                          type="button"
                          size="sm"
                          aria-label={`Aprobar postulación de ${p.nombre} ${p.apellido}`}
                          title="Aprobar"
                          className="h-9 w-9 p-0 font-semibold"
                          onClick={() => cambiarEstado(p, "APROBADA")}
                        >
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      )}
                      {p.estado === "PENDIENTE" && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          aria-label={`Rechazar postulación de ${p.nombre} ${p.apellido}`}
                          title="Rechazar"
                          onClick={() => handleRechazar(p)}
                          className="h-9 w-9 border-destructive/40 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      )}
                    </div>
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
