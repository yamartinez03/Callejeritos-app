import { FileText, Image, Clock, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// aceptado: null = pendiente | true = aprobado | false = rechazado
function EstadoGasto({ aceptado }) {
  if (aceptado === null)
    return (
      <span className="inline-flex items-center gap-1 text-warning font-medium">
        <Clock className="w-4 h-4" />
        Pendiente de aprobación
      </span>
    );
  if (aceptado === true)
    return (
      <span className="inline-flex items-center gap-1 text-success font-medium">
        <CheckCircle className="w-4 h-4" />
        Aprobado
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-danger font-medium">
      <XCircle className="w-4 h-4" />
      Rechazado
    </span>
  );
}

// Ícono según extensión del archivo
function IconoComprobante({ nombre }) {
  const esPDF = nombre?.toLowerCase().endsWith(".pdf");
  if (esPDF)
    return <FileText className="w-5 h-5 text-danger flex-shrink-0" />;
  return <Image className="w-5 h-5 text-info flex-shrink-0" />;
}

function fotoPlaceholder(especie) {
  const s = (especie ?? "").toLowerCase();
  if (s.includes("gato")) return "https://placekitten.com/80/80";
  return "https://placedog.net/80/80";
}

// Fila de dato: label a la izquierda, valor a la derecha
function FilaDato({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground flex-shrink-0">{label}</span>
      <span className="text-sm text-foreground text-right">{children}</span>
    </div>
  );
}

/**
 * DialogDetalleGasto
 * Compartido entre GastosOperativoPage y GastosTransitantePage.
 */
export default function DialogDetalleGasto({ abierto, gasto, onCerrar }) {
  if (!gasto) return null;

  const especie = gasto.animal?.especieanimal?.nombre ?? "";
  const foto = gasto.animal?.fotoUrl ?? fotoPlaceholder(especie);
  const sexo = gasto.animal?.sexo === "MACHO" ? "Macho" : "Hembra";
  const edad = gasto.animal?.edadestimada
    ? `${gasto.animal.edadestimada} año${gasto.animal.edadestimada !== 1 ? "s" : ""}`
    : null;

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalle del gasto</DialogTitle>
        </DialogHeader>

        {/* Sección animal */}
        <div className="flex items-center gap-3 bg-muted rounded-lg p-3 mb-2">
          <img
            src={foto}
            alt={gasto.animal?.nombre}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div>
            <p className="font-bold text-foreground">{gasto.animal?.nombre}</p>
            <p className="text-xs text-muted-foreground">
              {[especie, sexo, edad].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        {/* Datos del gasto — lista vertical */}
        <div className="divide-y divide-border">
          <FilaDato label="Tipo de gasto">
            {gasto.tipogasto?.nombre}
          </FilaDato>
          <FilaDato label="Descripción">
            {gasto.descripcion}
          </FilaDato>
          <FilaDato label="Monto">
            <span className="font-bold">
              ${Number(gasto.monto).toLocaleString("es-AR")}
            </span>
          </FilaDato>
          <FilaDato label="Fecha">{gasto.fecha}</FilaDato>
          <FilaDato label="Reintegrado">
            {gasto.reintegrado ? "Sí" : "No"}
          </FilaDato>
          <FilaDato label="Estado">
            <EstadoGasto aceptado={gasto.aceptado} />
          </FilaDato>
        </div>

        {/* Comprobante — Opción A: ícono + nombre, sin visor */}
        <div className="mt-3 flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
          <IconoComprobante nombre={gasto.comprobante} />
          <div>
            <p className="text-xs text-muted-foreground">Comprobante adjunto</p>
            <p className="text-sm text-foreground font-medium">
              {gasto.comprobante}
            </p>
          </div>
        </div>
        {/* TODO: cuando el backend defina GET /api/comprobantes/:filename,
            reemplazar el bloque anterior por un <img> o <iframe> con esa URL */}
      </DialogContent>
    </Dialog>
  );
}