
import { useState } from "react";
import {
  Home,
  User,
  Phone,
  MapPin,
  Users,
  PawPrint,
  Plus,
  X,
} from "lucide-react";

import type { HogarTransito, TipoAnimal } from "../../types/transito";

interface HogarFormProps {
  initialData?: Partial<HogarTransito>;
  onSubmit: (data: Omit<HogarTransito, "id" | "estado" | "ocupacion">) => void;
  onCancel?: () => void;
}

interface FormData {
  nombreTransitante: string;
  apellidoTransitante: string;
  telefono: string;
  direccion: string;
  localidad: string;
  tipoVivienda: string;
  tipoAnimal: TipoAnimal;
  capacidad: number;
  restricciones: string[];
  tieneOtrasMascotas: boolean;
}

const INITIAL_FORM: FormData = {
  nombreTransitante: "",
  apellidoTransitante: "",
  telefono: "",
  direccion: "",
  localidad: "",
  tipoVivienda: "",
  tipoAnimal: "PERRO",
  capacidad: 1,
  restricciones: [],
  tieneOtrasMascotas: false,
};

export function HogarForm({
  initialData,
  onSubmit,
  onCancel,
}: HogarFormProps) {
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_FORM,
    ...initialData,
    capacidad: initialData?.capacidad ?? 1,
    restricciones: initialData?.restricciones ?? [],
    tieneOtrasMascotas: initialData?.tieneOtrasMascotas ?? false,
    tipoAnimal: initialData?.tipoAnimal ?? "PERRO",
  });

  const [nuevaRestriccion, setNuevaRestriccion] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});

  const actualizarCampo = <K extends keyof FormData>(
    campo: K,
    valor: FormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));

    setErrores((prev) => ({
      ...prev,
      [campo]: "",
    }));
  };

  const agregarRestriccion = () => {
    const restriccion = nuevaRestriccion.trim();

    if (!restriccion) {
      return;
    }

    if (formData.restricciones.includes(restriccion)) {
      return;
    }

    actualizarCampo("restricciones", [
      ...formData.restricciones,
      restriccion,
    ]);

    setNuevaRestriccion("");
  };

  const eliminarRestriccion = (restriccion: string) => {
    actualizarCampo(
      "restricciones",
      formData.restricciones.filter((item) => item !== restriccion),
    );
  };

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!formData.nombreTransitante.trim()) {
      nuevosErrores.nombreTransitante = "Ingresá el nombre del transitario.";
    }

    if (!formData.apellidoTransitante.trim()) {
      nuevosErrores.apellidoTransitante =
        "Ingresá el apellido del transitario.";
    }

    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = "Ingresá un teléfono de contacto.";
    }

    if (!formData.direccion.trim()) {
      nuevosErrores.direccion = "Ingresá la dirección del hogar.";
    }

    if (!formData.localidad.trim()) {
      nuevosErrores.localidad = "Ingresá la localidad.";
    }

    if (!formData.tipoVivienda) {
      nuevosErrores.tipoVivienda =
        "Seleccioná el tipo de vivienda.";
    }

    if (formData.capacidad < 1) {
      nuevosErrores.capacidad =
        "La capacidad debe ser de al menos 1 animal.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    onSubmit({
      nombreTransitante: formData.nombreTransitante.trim(),
      apellidoTransitante: formData.apellidoTransitante.trim(),
      telefono: formData.telefono.trim(),
      direccion: formData.direccion.trim(),
      localidad: formData.localidad.trim(),
      tipoVivienda: formData.tipoVivienda,
      tipoAnimal: formData.tipoAnimal,
      capacidad: formData.capacidad,
      restricciones: formData.restricciones,
      tieneOtrasMascotas: formData.tieneOtrasMascotas,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Datos del transitario */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700">
            <User size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Datos del transitario
            </h2>
            <p className="text-sm text-gray-500">
              Información de contacto de la persona responsable.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Nombre *
            </label>

            <input
              type="text"
              value={formData.nombreTransitante}
              onChange={(e) =>
                actualizarCampo("nombreTransitante", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              placeholder="Ej. María"
            />

            {errores.nombreTransitante && (
              <p className="mt-1 text-sm text-red-600">
                {errores.nombreTransitante}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Apellido *
            </label>

            <input
              type="text"
              value={formData.apellidoTransitante}
              onChange={(e) =>
                actualizarCampo("apellidoTransitante", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              placeholder="Ej. López"
            />

            {errores.apellidoTransitante && (
              <p className="mt-1 text-sm text-red-600">
                {errores.apellidoTransitante}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Teléfono *
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) =>
                  actualizarCampo("telefono", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                placeholder="Ej. 221-555-1234"
              />
            </div>

            {errores.telefono && (
              <p className="mt-1 text-sm text-red-600">
                {errores.telefono}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <MapPin size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Ubicación
            </h2>
            <p className="text-sm text-gray-500">
              Datos del domicilio donde se realizará el tránsito.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Dirección *
            </label>

            <input
              type="text"
              value={formData.direccion}
              onChange={(e) =>
                actualizarCampo("direccion", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              placeholder="Ej. Calle 10 123"
            />

            {errores.direccion && (
              <p className="mt-1 text-sm text-red-600">
                {errores.direccion}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Localidad *
            </label>

            <input
              type="text"
              value={formData.localidad}
              onChange={(e) =>
                actualizarCampo("localidad", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              placeholder="Ej. Villa Elisa"
            />

            {errores.localidad && (
              <p className="mt-1 text-sm text-red-600">
                {errores.localidad}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Características del hogar */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
            <Home size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Características del hogar
            </h2>
            <p className="text-sm text-gray-500">
              Indicá qué animales puede recibir y las condiciones del hogar.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Tipo de vivienda *
            </label>

            <select
              value={formData.tipoVivienda}
              onChange={(e) =>
                actualizarCampo("tipoVivienda", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="">Seleccionar...</option>
              <option value="Casa">Casa</option>
              <option value="Casa con patio">Casa con patio</option>
              <option value="Casa con patio cerrado">
                Casa con patio cerrado
              </option>
              <option value="Departamento">Departamento</option>
            </select>

            {errores.tipoVivienda && (
              <p className="mt-1 text-sm text-red-600">
                {errores.tipoVivienda}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Tipo de animal *
            </label>

            <select
              value={formData.tipoAnimal}
              onChange={(e) =>
                actualizarCampo(
                  "tipoAnimal",
                  e.target.value as TipoAnimal,
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="PERRO">Perros</option>
              <option value="GATO">Gatos</option>
              <option value="AMBOS">Perros y gatos</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Capacidad máxima *
            </label>

            <div className="relative">
              <Users
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="number"
                min={1}
                value={formData.capacidad}
                onChange={(e) =>
                  actualizarCampo(
                    "capacidad",
                    Number(e.target.value),
                  )
                }
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {errores.capacidad && (
              <p className="mt-1 text-sm text-red-600">
                {errores.capacidad}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-7">
            <input
              id="otras-mascotas"
              type="checkbox"
              checked={formData.tieneOtrasMascotas}
              onChange={(e) =>
                actualizarCampo(
                  "tieneOtrasMascotas",
                  e.target.checked,
                )
              }
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />

            <label
              htmlFor="otras-mascotas"
              className="text-sm font-medium text-gray-700"
            >
              Tiene otras mascotas
            </label>
          </div>
        </div>

        {/* Restricciones */}
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Restricciones o condiciones
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={nuevaRestriccion}
              onChange={(e) => setNuevaRestriccion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  agregarRestriccion();
                }
              }}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              placeholder="Ej. No cachorros"
            />

            <button
              type="button"
              onClick={agregarRestriccion}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Plus size={18} />
              Agregar
            </button>
          </div>

          {formData.restricciones.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.restricciones.map((restriccion) => (
                <span
                  key={restriccion}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                >
                  {restriccion}

                  <button
                    type="button"
                    onClick={() =>
                      eliminarRestriccion(restriccion)
                    }
                    className="text-gray-400 transition hover:text-red-500"
                    aria-label={`Eliminar ${restriccion}`}
                  >
                    <X size={15} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Acciones */}
      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-700"
        >
          <PawPrint size={18} />
          Registrar hogar
        </button>
      </div>
    </form>
  );
}
