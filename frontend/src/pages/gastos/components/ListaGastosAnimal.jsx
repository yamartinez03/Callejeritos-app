import { useState } from "react";
import { CheckCircle, Clock, XCircle, BadgeCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogDetalleGasto from "./DialogDetalleGasto";
import DialogConfirmarReintegro from "./DialogConfirmarReintegro";

/**
 * BadgeEstado
 * Muestra UN solo badge según el estado más avanzado del gasto.
 * Prioridad: Reintegrado > Aprobado > Rechazado > Pendiente
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

/**
 * ListaGastosAnimal
 * Tabla compacta para la vista "Gastos por animal".
 * Incluye botón "Reintegrar" con dialog de confirmación.
 *
 * Regla del botón "Reintegrar":
 *   puedeReintegrar && aceptado === true && reintegrado === false
 *
 * @param {{ gastos, onAceptar, onRechazar, onReintegrar, puedeModerar, puedeReintegrar }} props
 */
export default function ListaGastosAnimal({
  gastos,
  onAceptar,
  onRechazar,
  onReintegrar,
  puedeModerar,
  puedeReintegrar,
}) {
  const [gastoDetalle, setGastoDetalle] = useState(null);
  const [gastoAReintegrar, setGastoAReintegrar] = useState(null);

  if (gastos.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
        <p className="text-sm">No hay gastos para este filtro.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gastos.map((gasto) => {
              const mostrarReintegrar =
                puedeReintegrar &&
                gasto.aceptado === true &&
                gasto.reintegrado === false;

              return (
                <TableRow key={gasto.idgasto}>
                  <TableCell className="font-medium text-foreground">
                    {gasto.descripcion}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {gasto.tipogasto?.nombre}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {gasto.fecha}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    ${Number(gasto.monto).toLocaleString("es-AR")}
                  </TableCell>
                  <TableCell>
                    <BadgeEstado aceptado={gasto.aceptado} reintegrado={gasto.reintegrado} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setGastoDetalle(gasto)}
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
                          onClick={() => setGastoAReintegrar(gasto)}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Reintegrar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <DialogDetalleGasto
        abierto={!!gastoDetalle}
        gasto={gastoDetalle}
        onCerrar={() => setGastoDetalle(null)}
      />

      <DialogConfirmarReintegro
        abierto={!!gastoAReintegrar}
        gasto={gastoAReintegrar}
        onConfirmar={onReintegrar}
        onCerrar={() => setGastoAReintegrar(null)}
      />
    </>
  );
}