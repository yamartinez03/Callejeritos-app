import { useState } from "react";
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

// aceptado: null = pendiente | true = aceptado | false = rechazado
function EstadoTexto({ aceptado }) {
  if (aceptado === null) {
    return <span className="font-medium text-yellow-600">Pendiente</span>;
  }
  if (aceptado === true) {
    return <span className="font-medium text-green-600">Aceptado</span>;
  }
  return <span className="font-medium text-red-600">Rechazado</span>;
}

export default function TablaGastos({ gastos, onAceptar, onRechazar }) {
  const [gastoDetalle, setGastoDetalle] = useState(null);

  if (gastos.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
        No hay gastos registrados para este filtro.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Animal</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Tipo de gasto</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gastos.map((gasto) => (
              <TableRow key={gasto.idgasto}>
                <TableCell className="font-medium text-black">
                  {gasto.animal.nombre}
                </TableCell>
                <TableCell className="text-gray-500">
                  {gasto.descripcion}
                </TableCell>
                <TableCell className="text-gray-500">
                  {gasto.tipogasto.nombre}
                </TableCell>
                <TableCell className="text-black">
                  ${Number(gasto.monto).toLocaleString("es-AR")}
                </TableCell>
                <TableCell className="text-gray-500">{gasto.fecha}</TableCell>
                <TableCell>
                  <EstadoTexto aceptado={gasto.aceptado} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setGastoDetalle(gasto)}
                    >
                      Ver más
                    </Button>
                    {gasto.aceptado === null && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAceptar(gasto)}
                        >
                          Aceptar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRechazar(gasto)}
                        >
                          Rechazar
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DialogDetalleGasto
        abierto={!!gastoDetalle}
        gasto={gastoDetalle}
        onCerrar={() => setGastoDetalle(null)}
      />
    </>
  );
}