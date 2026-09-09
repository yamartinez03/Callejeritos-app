import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * DialogConfirmarReintegro
 * Modal de confirmación antes de marcar un gasto como reintegrado.
 * Muestra el contexto del gasto para que el operativo confirme conscientemente.
 * Acción permanente: no se puede revertir.
 *
 * @param {{ abierto, gasto, onConfirmar, onCerrar }} props
 */
export default function DialogConfirmarReintegro({ abierto, gasto, onConfirmar, onCerrar }) {
  if (!gasto) return null;

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Confirmar reintegro
          </DialogTitle>
        </DialogHeader>

        {/* Contexto del gasto */}
        <div className="bg-muted rounded-lg px-4 py-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Animal</span>
            <span className="font-medium text-foreground">{gasto.animal?.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tipo</span>
            <span className="text-foreground">{gasto.tipogasto?.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Descripción</span>
            <span className="text-foreground text-right max-w-[60%]">{gasto.descripcion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monto</span>
            <span className="font-bold text-foreground">
              ${Number(gasto.monto).toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Esta acción es permanente y no se puede deshacer.
        </p>

        {/* Acciones */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCerrar}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              onConfirmar(gasto);
              onCerrar();
            }}
          >
            Confirmar reintegro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}