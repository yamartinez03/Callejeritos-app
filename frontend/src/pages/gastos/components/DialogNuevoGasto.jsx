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

const categorias = [
  { valor: "CONSULTA_VETERINARIA", etiqueta: "Consulta veterinaria" },
  { valor: "INTERNACION", etiqueta: "Internación" },
  { valor: "ESTUDIOS", etiqueta: "Estudios (análisis/eco/radio)" },
  { valor: "MEDICACION", etiqueta: "Medicación" },
  { valor: "TRASLADO", etiqueta: "Traslado" },
  { valor: "ALIMENTO", etiqueta: "Alimento" },
  { valor: "OTRO_INSUMO", etiqueta: "Otro insumo" },
];

// TODO: esto es un mock temporal para poder probar el formulario. Cuando la
// búsqueda de animal (GCA_05) esté lista, reemplazar este <Select> por ese
// componente y borrar animalesMock.
const animalesMock = [
  { id: "luna", nombre: "Luna" },
  { id: "mochi", nombre: "Mochi" },
  { id: "tobi", nombre: "Tobi" },
  { id: "roque", nombre: "Roque" },
  { id: "manchas", nombre: "Manchas" },
];

const formVacio = {
  animalId: "",
  categoria: "",
  monto: "",
  fecha: "",
  descripcion: "",
  proveedor: "",
  cargadoPor: "",
};

export default function DialogNuevoGasto({ abierto, onCerrar, onGuardar }) {
  const [form, setForm] = useState(formVacio);
  const [comprobante, setComprobante] = useState(null);

  const setCampo = (campo, valor) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

  const handleGuardar = () => {
    if (
      !form.animalId ||
      !form.categoria ||
      !form.monto ||
      !form.fecha ||
      !form.descripcion ||
      !form.cargadoPor
    ) {
      alert("Completá los campos obligatorios (*)");
      return;
    }

    const animal = animalesMock.find((a) => a.id === form.animalId);

    onGuardar({
      ...form,
      monto: Number(form.monto),
      animalNombre: animal?.nombre,
      comprobanteUrl: comprobante ? comprobante.name : null,
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
              value={form.animalId}
              onValueChange={(v) => setCampo("animalId", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar animal…" />
              </SelectTrigger>
              <SelectContent>
                {animalesMock.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Categoría *</label>
            <Select
              value={form.categoria}
              onValueChange={(v) => setCampo("categoria", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría…" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((c) => (
                  <SelectItem key={c.valor} value={c.valor}>
                    {c.etiqueta}
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
            <label className="text-sm text-gray-500">
              Proveedor / Veterinaria
            </label>
            <Input
              value={form.proveedor}
              onChange={(e) => setCampo("proveedor", e.target.value)}
              placeholder="Ej: Vet. Pellegrino"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Cargado por *</label>
            <Input
              value={form.cargadoPor}
              onChange={(e) => setCampo("cargadoPor", e.target.value)}
              placeholder="Nombre del hogar o colaborador"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Comprobante (opcional)
            </label>
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
