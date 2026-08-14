import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const estadoInicial = {
  nombre: "",
  tipo: "",
  stock: "",
  stockMinimo: "",
  fechaVencimiento: "",
};

export default function DialogNuevoInsumo({ abierto, onCerrar }) {
  const [form, setForm] = useState(estadoInicial);

  const handleCambio = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleGuardar = () => {
    if (!form.nombre || !form.tipo || !form.stock || !form.stockMinimo) {
      alert("Completá los campos obligatorios");
      return;
    }
    // Acá va la llamada al backend
    console.log(form);
    setForm(estadoInicial);
    onCerrar();
  };

  const handleCerrar = () => {
    setForm(estadoInicial);
    onCerrar();
  };

  return (
    <Dialog open={abierto} onOpenChange={handleCerrar}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo insumo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Nombre *
            </label>
            <Input
              placeholder="Ej: Amoxicilina"
              value={form.nombre}
              onChange={(e) => handleCambio("nombre", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Tipo *
            </label>
            <Select onValueChange={(val) => handleCambio("tipo", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medicamento">Medicamento</SelectItem>
                <SelectItem value="alimento">Alimento</SelectItem>
                <SelectItem value="insumo">Insumo general</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Stock inicial *
              </label>
              <Input
                type="number"
                min="0"
                placeholder="Ej: 10"
                value={form.stock}
                onChange={(e) => handleCambio("stock", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Stock mínimo *
              </label>
              <Input
                type="number"
                min="0"
                placeholder="Ej: 5"
                value={form.stockMinimo}
                onChange={(e) => handleCambio("stockMinimo", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Fecha de vencimiento
            </label>
            <Input
              type="date"
              value={form.fechaVencimiento}
              onChange={(e) => handleCambio("fechaVencimiento", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCerrar}>
            Cancelar
          </Button>
          <Button onClick={handleGuardar}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
