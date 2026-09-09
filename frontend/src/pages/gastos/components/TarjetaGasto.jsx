import { useState } from "react";
import { CheckCircle, Clock, XCircle, RefreshCw, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogConfirmarReintegro from "./DialogConfirmarReintegro";

/**
 * BadgeEstado
 * Opción A: "Reintegrado" reemplaza a "Aprobado" cuando reintegrado === true.
 * El usuario no ve dos badges — ve el estado más avanzado del gasto.
 *
 * Orden de prioridad:
 *   reintegrado === true           → "Reintegrado"  (gasto cerrado)
 *   aceptado === true              → "Aprobado"      (aprobado, pendiente de reintegro)
 *   aceptado === false             → "Rechazado"
 *   aceptado === null              → "Pendiente"
 */
function BadgeEstado({ aceptado, reintegrado }) {
  if (reintegrado === true)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-info/15 text-info">
        <BadgeCheck className="w-3 h-3" />
        Reintegrado
      </span>
    );
  if (aceptado === true)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-success/15 text-success">
        <CheckCircle className="w-3 h-3" />
        Aprobado
      </span>
    );
  if (aceptado === false)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-danger/15 text-danger">
        <XCircle className="w-3 h-3" />
        Rechazado
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-warning/15 text-warning">
      <Clock className="w-3 h-3" />
      Pendiente
    </span>
  );
}

// TODO: reemplazar por gasto.animal.fotoUrl cuando el campo exista en schema.prisma
function fotoPlaceholder(especie) {
  const s = (especie ?? "").toLowerCase();
  if (s.includes("gato")) return "https://placekitten.com/64/64";
  return "https://placedog.net/64/64";
}

/**
 * TarjetaGasto
 *
 * Regla del botón "Reintegrar":
 *   puedeReintegrar && aceptado === true && reintegrado === false
 *
 * @param {{ gasto, onVerMas, onAceptar, onRechazar, onReintegrar, puedeModerar, puedeReintegrar }} props
 * puedeModerar:    true → operativo (Aprobar/Rechazar visibles)
 * puedeReintegrar: true → operativo (Reintegrar visible)
 */
export default function TarjetaGasto({
  gasto,
  onVerMas,
  onAceptar,
  onRechazar,
  onReintegrar,
  puedeModerar,
  puedeReintegrar,
}) {
  const [confirmarReintegro, setConfirmarReintegro] = useState(false);

  const especie = gasto.animal?.especieanimal?.nombre ?? "";
  const foto = gasto.animal?.fotoUrl ?? fotoPlaceholder(especie);
  const sexo = gasto.animal?.sexo === "MACHO" ? "Macho" : "Hembra";
  const edad = gasto.animal?.edadestimada
    ? `${gasto.animal.edadestimada} año${gasto.animal.edadestimada !== 1 ? "s" : ""}`
    : null;

  const mostrarReintegrar =
    puedeReintegrar && gasto.aceptado === true && gasto.reintegrado === false;

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start">
        {/* Foto del animal */}
        <img
          src={foto}
          alt={gasto.animal?.nombre ?? "Animal"}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback emoji */}
        <div
          className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 items-center justify-center text-3xl hidden"
          aria-hidden
        >
          {especie.includes("gato") ? "🐈" : "🐕"}
        </div>

        {/* Contenido */}
        <div className="flex-1 flex gap-4 min-w-0">
          {/* Columna izquierda */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground leading-tight">
              {gasto.animal?.nombre}
            </p>
            <p className="text-xs text-muted-foreground">
              {[especie, sexo, edad].filter(Boolean).join(" · ")}
            </p>
            <p className="text-sm text-foreground mt-2 truncate">
              {gasto.descripcion}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {gasto.fecha} · {gasto.tipogasto?.nombre}
            </p>
          </div>

          {/* Columna derecha: monto, estado, botones */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <p className="font-bold text-foreground">
              ${Number(gasto.monto).toLocaleString("es-AR")}
            </p>
            <BadgeEstado aceptado={gasto.aceptado} reintegrado={gasto.reintegrado} />
            <div className="flex gap-2 flex-wrap justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onVerMas(gasto)}
              >
                Ver más
              </Button>
              {puedeModerar && gasto.aceptado === null && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-success border-success/40 hover:bg-success/10"
                    onClick={() => onAceptar(gasto)}
                  >
                    Aprobar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-danger border-danger/40 hover:bg-danger/10"
                    onClick={() => onRechazar(gasto)}
                  >
                    Rechazar
                  </Button>
                </>
              )}
              {mostrarReintegrar && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-info border-info/40 hover:bg-info/10"
                  onClick={() => setConfirmarReintegro(true)}
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reintegrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación — gestionado dentro de la tarjeta */}
      <DialogConfirmarReintegro
        abierto={confirmarReintegro}
        gasto={gasto}
        onConfirmar={onReintegrar}
        onCerrar={() => setConfirmarReintegro(false)}
      />
    </>
  );
}