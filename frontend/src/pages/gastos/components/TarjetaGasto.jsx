import { useState } from "react";
import { CheckCircle, Clock, XCircle, RefreshCw, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogConfirmarReintegro from "./DialogConfirmarReintegro";

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

function fotoPlaceholder(especie) {
  const s = (especie ?? "").toLowerCase();
  if (s.includes("gato")) return "https://placekitten.com/64/64";
  return "https://placedog.net/64/64";
}

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
      <div className="bg-card border border-border rounded-xl p-4">

        {/* ── MOBILE: layout apilado ── */}
        <div className="flex flex-col gap-3 sm:hidden">
          {/* Fila 1: foto + nombre + monto/estado */}
          <div className="flex items-start gap-3">
            <img
              src={foto}
              alt={gasto.animal?.nombre ?? "Animal"}
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground leading-tight">
                {gasto.animal?.nombre}
              </p>
              <p className="text-xs text-muted-foreground">
                {[especie, sexo, edad].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <p className="font-bold text-foreground text-sm">
                ${Number(gasto.monto).toLocaleString("es-AR")}
              </p>
              <BadgeEstado aceptado={gasto.aceptado} reintegrado={gasto.reintegrado} />
            </div>
          </div>

          {/* Fila 2: descripción + fecha */}
          <div>
            <p className="text-sm text-foreground">{gasto.descripcion}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {gasto.fecha} · {gasto.tipogasto?.nombre}
            </p>
          </div>

          {/* Fila 3: botones */}
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={() => onVerMas(gasto)}>
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

        {/* ── DESKTOP: layout horizontal (original) ── */}
        <div className="hidden sm:flex gap-4 items-start">
          <img
            src={foto}
            alt={gasto.animal?.nombre ?? "Animal"}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
          <div
            className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 items-center justify-center text-3xl hidden"
            aria-hidden
          >
            {especie.includes("gato") ? "🐈" : "🐕"}
          </div>

          <div className="flex-1 flex gap-4 min-w-0">
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
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <p className="font-bold text-foreground">
                ${Number(gasto.monto).toLocaleString("es-AR")}
              </p>
              <BadgeEstado aceptado={gasto.aceptado} reintegrado={gasto.reintegrado} />
              <div className="flex gap-2 flex-wrap justify-end">
                <Button size="sm" variant="outline" onClick={() => onVerMas(gasto)}>
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

      </div>

      <DialogConfirmarReintegro
        abierto={confirmarReintegro}
        gasto={gasto}
        onConfirmar={onReintegrar}
        onCerrar={() => setConfirmarReintegro(false)}
      />
    </>
  );
}