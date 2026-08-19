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

const ESTADO_ESTILO = {
  PENDIENTE: "text-yellow-600",
  APROBADO: "text-green-600",
  RECHAZADO: "text-red-600",
};

export default function TablaGastos({ gastos, onAprobar, onRechazar }) {
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
              <TableHead>Categoria</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gastos.map((gasto) => (
              <TableRow key={gasto.id}>
                <TableCell className="font-medium text-black">
                  {gasto.animalNombre}
                </TableCell>
                <TableCell className="text-gray-500">
                  {gasto.descripcion}
                </TableCell>
                <TableCell className="capitalize text-gray-500">
                  {gasto.categoria.toLowerCase().replaceAll("_", " ")}
                </TableCell>
                <TableCell className="text-black">
                  ${Number(gasto.monto).toLocaleString("es-AR")}
                </TableCell>
                <TableCell className="text-gray-500">{gasto.fecha}</TableCell>
                <TableCell className={`font-medium ${ESTADO_ESTILO[gasto.estado]}`}>
                  {gasto.estado}
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
                    {gasto.estado === "PENDIENTE" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAprobar(gasto)}
                        >
                          Aprobar
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
