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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import PopoverDetalleInsumo from "./DetalleInsumo";
import DialogRegistroMovimiento from "./RegistroMovimiento";

export default function TablaInsumos({
  insumos,
  onMovimiento,
  onEliminar,
  esStaff,
}) {
  const [eliminarOpen, setEliminarOpen] = useState(null);
  const [insumoAEliminar, setInsumoAEliminar] = useState(null);

  const handleConfirmarMovimiento = (insumo, tipo, cantidad, motivo) => {
    if (onMovimiento) {
      onMovimiento(insumo, tipo, cantidad, motivo);
    }
  };

  if (insumos.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
        No hay insumos registrados para este filtro.
      </div>
    );
  }

  return (
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
              <TableCell className="text-center">
                <div className="flex gap-2 justify-center">
                  {/* Popover para Ver más - siempre visible */}
                  <PopoverDetalleInsumo insumo={insumo} />

                  {/* Botones de staff */}
                  {esStaff && (
                    <>
                      {/* Popover Entrada */}
                      <DialogRegistroMovimiento
                        insumo={insumo}
                        tipo="entrada"
                        onConfirmar={handleConfirmarMovimiento}
                      />

                      {/* Popover Salida */}
                      <DialogRegistroMovimiento
                        insumo={insumo}
                        tipo="salida"
                        onConfirmar={handleConfirmarMovimiento}
                      />

                      {/* Botón eliminar - solo admin */}
                      <AlertDialog
                        open={eliminarOpen === insumo.id}
                        onOpenChange={(open) =>
                          setEliminarOpen(open ? insumo.id : null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => setInsumoAEliminar(insumo)}
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Eliminar insumo?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Está a punto de eliminar "
                              {insumoAEliminar?.nombre}" del inventario. Esta
                              acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex gap-2 justify-end">
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                if (insumoAEliminar) {
                                  onEliminar(insumoAEliminar);
                                  setEliminarOpen(null);
                                  setInsumoAEliminar(null);
                                }
                              }}
                            >
                              Eliminar
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
