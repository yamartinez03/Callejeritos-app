import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { eliminarAnimal } from "@/shared/data/mockAnimales";

/**
 * Botón + ventana de confirmación para eliminar un animal (operación
 * destructiva e irreversible en este mock, por eso pide confirmación
 * explícita con AlertDialog en vez de un simple `window.confirm`).
 *
 * Props:
 * - animal: el animal a eliminar.
 * - onEliminado: callback ejecutado luego de eliminar (para navegar o refrescar un listado).
 * - trigger: elemento opcional que dispara el diálogo (por defecto, un botón "Eliminar").
 */
export default function EliminarAnimalDialog({ animal, onEliminado, trigger }) {
  const [abierto, setAbierto] = useState(false);

  function confirmarEliminacion() {
    eliminarAnimal(animal.idanimal);
    setAbierto(false);
    onEliminado?.(animal);
  }

  return (
    <AlertDialog open={abierto} onOpenChange={setAbierto}>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
            Eliminar
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar a {animal.nombre}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el registro de {animal.nombre}
            {animal.responsable ? ` (actualmente a cargo de ${animal.responsable.nombre})` : ""}, junto con su
            historial clínico y de gastos asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmarEliminacion}
            className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20"
          >
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}