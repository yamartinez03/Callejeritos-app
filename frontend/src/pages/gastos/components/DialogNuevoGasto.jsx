import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// TODO: animal lo va a resolver el componente de búsqueda de otra compañera
// (GCA_05). Mientras tanto, mock temporal.
const animalesMock = [
  { idanimal: 1, nombre: "Luna" },
  { idanimal: 2, nombre: "Mochi" },
  { idanimal: 3, nombre: "Tobi" },
];

// Reemplazar este mock por un fetch a
// GET /api/tipos-gasto ni bien exista ese endpoint.
const tiposGastoMock = [
  { idtipogasto: 1, nombre: "Consulta veterinaria" },
  { idtipogasto: 2, nombre: "Internación" },
  { idtipogasto: 3, nombre: "Medicación" },
  { idtipogasto: 4, nombre: "Alimento" },
  { idtipogasto: 5, nombre: "Traslado" },
];

const formVacio = {
  idanimal: "",
  idtipogasto: "",
  monto: "",
  fecha: "",
  descripcion: "",
};

export default function DialogNuevoGasto({ abierto, onCerrar, onGuardar }) {
  const [form, setForm] = useState(formVacio);
  const [comprobante, setComprobante] = useState(null);

  const setCampo = (campo, valor) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

  const handleGuardar = () => {
    if (
      !form.idanimal ||
      !form.idtipogasto ||
      !form.monto ||
      !form.fecha ||
      !form.descripcion ||
      !comprobante
    ) {
      // comprobante es obligatorio en el schema (String, sin "?")
      alert("Completá todos los campos, incluido el comprobante.");
      return;
    }

    const animal = animalesMock.find(
      (a) => a.idanimal === Number(form.idanimal)
    );
    const tipogasto = tiposGastoMock.find(
      (t) => t.idtipogasto === Number(form.idtipogasto)
    );

    onGuardar({
      idanimal: Number(form.idanimal),
      idtipogasto: Number(form.idtipogasto),
      monto: Number(form.monto),
      fecha: form.fecha,
      descripcion: form.descripcion,
      comprobante: comprobante.name,
      reintegrado: false,
      aceptado: null, // nace sin evaluar
      animal, // desnormalizado solo para pintar la tabla sin pedir de nuevo
      tipogasto,
    });

    setForm(formVacio);
    setComprobante(null);
    onCerrar();
  };

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar gasto</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Animal *</label>
            <Select
              value={form.idanimal}
              onValueChange={(v) => setCampo("idanimal", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar animal…" />
              </SelectTrigger>
              <SelectContent>
                {animalesMock.map((a) => (
                  <SelectItem key={a.idanimal} value={String(a.nombre)}>
                    {a.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Tipo de gasto *</label>
            <Select
              value={form.idtipogasto}
              onValueChange={(v) => setCampo("idtipogasto", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo…" />
              </SelectTrigger>
              <SelectContent>
                {tiposGastoMock.map((t) => (
                  <SelectItem key={t.idtipogasto} value={String(t.nombre)}>
                    {t.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-500">Monto ($) *</label>
              <Input
                type="number"
                min="0"
                value={form.monto}
                onChange={(e) => setCampo("monto", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Fecha *</label>
              <Input
                type="date"
                value={form.fecha}
                onChange={(e) => setCampo("fecha", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Descripción *</label>
            <Input
              value={form.descripcion}
              onChange={(e) => setCampo("descripcion", e.target.value)}
              placeholder="Ej: Consulta por vómitos, antibiótico..."
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Comprobante *</label>
            <Input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setComprobante(e.target.files?.[0] ?? null)}
            />
          </div>

          <Button onClick={handleGuardar} className="w-full">
            Guardar gasto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}