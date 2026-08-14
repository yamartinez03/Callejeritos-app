import { useState } from "react";
//import { Badge } from '@/components/ui/badge'
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogDetalleInsumo from "./DialogDetalleInsumo";

export default function TablaInsumos({ insumos, onEntrada, onSalida }) {
  const [insumoDetalle, setInsumoDetalle] = useState(null);
  if (insumos.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
        No hay insumos registrados para este filtro.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Stock actual</TableHead>
              <TableHead>Vencimiento</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insumos.map((insumo) => (
              <TableRow key={insumo.id}>
                <TableCell className="font-medium text-black">
                  {insumo.nombre}
                </TableCell>
                <TableCell className="capitalize text-gray-500">
                  {insumo.descripcion}
                </TableCell>
                <TableCell className="capitalize text-gray-500">
                  {insumo.tipo}
                </TableCell>
                <TableCell className="text-black">{insumo.stock}</TableCell>
                <TableCell className="text-gray-500">
                  {insumo.fechaVencimiento ?? "—"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setInsumoDetalle(insumo)}
                    >
                      Ver más
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEntrada(insumo)}
                    >
                      Entrada
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSalida(insumo)}
                    >
                      Salida
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DialogDetalleInsumo
        abierto={!!insumoDetalle}
        insumo={insumoDetalle}
        onCerrar={() => setInsumoDetalle(null)}
      />
    </>
  );
}
