import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTipoStyle, formatFecha, formatFechaHora, formatResponsable } from "@/lib/historialUtils";

/*
 Muestra un registro de historial clínico ya resuelto (ver forma en
 mockHistorialClinico.js), con los campos propios de cada tipo.
 accionesExtra permite inyectar botones (ej: "Editar").
 */
export default function RegistroCard({ registro, accionesExtra }) {
  const estilo = getTipoStyle(registro.tipo);

  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`inline-block w-fit rounded-full px-2.5 py-1 text-xs font-medium ${estilo.className}`}>
            {estilo.label}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{formatFechaHora(registro.fecha)}</span>
            {accionesExtra}
          </div>
        </div>

        {registro.descripcion && <p className="text-sm text-foreground">{registro.descripcion}</p>}

        <dl className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
          {registro.tipo === "VACUNA" && (
            <>
              <Dato label="Vacuna" valor={registro.vacuna.nombre} />
              <Dato label="Vencimiento" valor={formatFecha(registro.vacuna.fechaVencimiento)} />
            </>
          )}

          {registro.tipo === "DESPARASITACION" && (
            <>
              <Dato label="Producto" valor={registro.desparasitacion.producto} />
              <Dato label="Dosis" valor={registro.desparasitacion.dosis} />
              <Dato label="Próxima aplicación" valor={formatFecha(registro.desparasitacion.proximaAplicacion)} />
            </>
          )}

          {registro.tipo === "ESTUDIO" && (
            <>
              <Dato label="Tipo de estudio" valor={registro.estudio.tipoEstudio} />
              <Dato label="Resultado" valor={registro.estudio.resultado} full />
            </>
          )}

          {registro.tipo === "TRATAMIENTO" && (
            <>
              <Dato label="Inicio" valor={formatFecha(registro.tratamiento.fechaInicio)} />
              <Dato label="Fin" valor={formatFecha(registro.tratamiento.fechaFin)} />
              <Dato label="Medicación" valor={registro.tratamiento.medicacion} full />
            </>
          )}

          <Dato label="Responsable" valor={formatResponsable(registro.responsable)} />
        </dl>

        {registro.archivo && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5 shrink-0" />
            {registro.archivo}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function Dato({ label, valor, full }) {
  return (
    <div className={`min-w-0 ${full ? "sm:col-span-2" : ""}`}>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="truncate text-foreground">{valor}</dd>
    </div>
  );
}
