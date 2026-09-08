import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DialogRegistroMovimiento({ insumo, tipo, onConfirmar }) {
  const [cantidad, setCantidad] = useState("");
  const [motivo, setMotivo] = useState("");
  const [open, setOpen] = useState(false);

  const handleConfirmar = () => {
    if (!cantidad || isNaN(cantidad) || Number(cantidad) <= 0) {
      alert("Ingresá una cantidad válida");
      return;
    }
    // Validar stock para salidas
    if (tipo === "salida" && Number(cantidad) > insumo?.stock) {
      alert("La cantidad no puede superar el stock actual");
      return;
    }
    
    if (onConfirmar) {
      onConfirmar(insumo, tipo, Number(cantidad), motivo);
    }
    
    setCantidad("");
    setMotivo("");
    setOpen(false);
  };

  const handleCerrar = () => {
    setCantidad("");
    setMotivo("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          {tipo === "entrada" ? "Entrada" : "Salida"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-3">
          <h4 className="font-semibold">
            {tipo === "entrada" ? "Entrada de" : "Salida de"} {insumo?.nombre}
          </h4>
          <p className="text-sm text-gray-600">
            {tipo === "entrada" 
              ? "Ingrese la cantidad a agregar al stock y el motivo:" 
              : "Ingrese la cantidad a retirar del stock y el motivo:"}
          </p>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Cantidad *
            </label>
            <Input
              type="number"
              min="1"
              placeholder="Ej: 5"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Motivo
            </label>
            <Input
              type="text"
              placeholder={
                tipo === "entrada"
                  ? "Ej: Compra, donación"
                  : "Ej: Entrega a transitante"
              }
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleConfirmar}
              disabled={!cantidad || parseInt(cantidad) <= 0 || (tipo === "salida" && parseInt(cantidad) > insumo?.stock)}
            >
              Confirmar
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleCerrar}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
