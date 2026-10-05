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
import type { EstadoHogar, HogarTransito, TipoAnimal } from "../../types/transito";
import { Button } from "@/components/ui/button";

interface HogarFormProps {
  initialData?: Partial<HogarTransito>;
  onSubmit: (
    data: Omit<HogarTransito, "id" | "ocupacion">,
  ) => string | void;
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
  estado: EstadoHogar;
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
  estado: "DISPONIBLE",
  restricciones: [],
  tieneOtrasMascotas: false,
};

const inputClass =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function HogarForm({
  initialData,
  onSubmit,
  onCancel,
}: HogarFormProps) {
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_FORM,
    ...initialData,
    capacidad: initialData?.capacidad ?? 1,
    estado: initialData?.estado ?? "DISPONIBLE",
    restricciones: initialData?.restricciones ?? [],
    tieneOtrasMascotas: initialData?.tieneOtrasMascotas ?? false,
    tipoAnimal: initialData?.tipoAnimal ?? "PERRO",
  });

  const [nuevaRestriccion, setNuevaRestriccion] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [sexoAceptado, setSexoAceptado] = useState(
    initialData?.restricciones?.some((item) => item.toLowerCase() === "solo machos")
      ? "MACHO"
      : initialData?.restricciones?.some(
            (item) => item.toLowerCase() === "solo hembras",
          )
        ? "HEMBRA"
        : "CUALQUIERA",
  );
  const [soloCachorros, setSoloCachorros] = useState(
    initialData?.restricciones?.some(
      (item) => item.toLowerCase() === "solo cachorros",
    ) ?? false,
  );
  const [pesoMaximo, setPesoMaximo] = useState(
    initialData?.restricciones
      ?.find((item) => item.toLowerCase().startsWith("tamaño máximo:"))
      ?.match(/(\d+(?:[.,]\d+)?)/)?.[1]
      ?.replace(",", ".") ?? "",
  );

  const actualizarCampo = <K extends keyof FormData>(
    campo: K,
    valor: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  const agregarRestriccion = () => {
    const restriccion = nuevaRestriccion.trim();

    if (!restriccion || formData.restricciones.includes(restriccion)) {
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
      nuevosErrores.nombreTransitante = "Ingresá el nombre.";
    }
    if (!formData.apellidoTransitante.trim()) {
      nuevosErrores.apellidoTransitante = "Ingresá el apellido.";
    }
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = "Ingresá un teléfono.";
    }
    if (!formData.direccion.trim()) {
      nuevosErrores.direccion = "Ingresá la dirección.";
    }
    if (!formData.localidad.trim()) {
      nuevosErrores.localidad = "Ingresá la localidad.";
    }
    if (!formData.tipoVivienda) {
      nuevosErrores.tipoVivienda = "Seleccioná la vivienda.";
    }
    if (!Number.isInteger(formData.capacidad) || formData.capacidad < 1) {
      nuevosErrores.capacidad = "Ingresá una capacidad mínima de 1.";
    }
    if (
      initialData?.ocupacion !== undefined &&
      formData.capacidad < initialData.ocupacion
    ) {
      nuevosErrores.capacidad =
        "La capacidad no puede ser menor que la ocupación actual.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validarFormulario()) return;

    const restriccionesPersonalizadas = formData.restricciones.filter(
      (item) =>
        !["solo machos", "solo hembras", "solo cachorros"].includes(
          item.toLowerCase(),
        ) && !item.toLowerCase().startsWith("tamaño máximo:"),
    );
    const restricciones = [
      ...restriccionesPersonalizadas,
      ...(sexoAceptado === "CUALQUIERA" ? [] : [`Solo ${sexoAceptado === "MACHO" ? "machos" : "hembras"}`]),
      ...(soloCachorros ? ["Solo cachorros"] : []),
      ...(pesoMaximo ? [`Tamaño máximo: ${pesoMaximo} kg`] : []),
    ];

    const error = onSubmit({
      nombreTransitante: formData.nombreTransitante.trim(),
      apellidoTransitante: formData.apellidoTransitante.trim(),
      telefono: formData.telefono.trim(),
      direccion: formData.direccion.trim(),
      localidad: formData.localidad.trim(),
      tipoVivienda: formData.tipoVivienda,
      tipoAnimal: formData.tipoAnimal,
      capacidad: formData.capacidad,
      estado: formData.estado,
      restricciones,
      tieneOtrasMascotas: formData.tieneOtrasMascotas,
    });
    if (error) setErrores((prev) => ({ ...prev, formulario: error }));
  };

  const campoTexto = (
    campo: "nombreTransitante" | "apellidoTransitante" | "telefono" |
      "direccion" | "localidad",
    etiqueta: string,
    placeholder: string,
    tipo = "text",
  ) => (
    <div>
      <label className={labelClass}>{etiqueta} *</label>
      <input
        type={tipo}
        value={formData[campo]}
        onChange={(e) => actualizarCampo(campo, e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
      {errores[campo] && (
        <p className="mt-1 text-xs text-destructive">{errores[campo]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <User className="h-4 w-4 text-muted-foreground" />
          Datos del transitario
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {campoTexto("nombreTransitante", "Nombre", "Ej. María")}
          {campoTexto("apellidoTransitante", "Apellido", "Ej. López")}
          <div className="sm:col-span-2">
            {campoTexto("telefono", "Teléfono", "Ej. 221-555-1234", "tel")}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          Ubicación
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {campoTexto("direccion", "Dirección", "Ej. Calle 10 123")}
          {campoTexto("localidad", "Localidad", "Ej. La Plata")}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Home className="h-4 w-4 text-muted-foreground" />
          Características del hogar
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Tipo de vivienda *</label>
            <select
              value={formData.tipoVivienda}
              onChange={(e) => actualizarCampo("tipoVivienda", e.target.value)}
              className={inputClass}
            >
              <option value="">Seleccionar...</option>
              <option value="Casa">Casa</option>
              <option value="Casa con patio">Casa con patio</option>
              <option value="Casa con patio cerrado">Casa con patio cerrado</option>
              <option value="Departamento">Departamento</option>
            </select>
            {errores.tipoVivienda && (
              <p className="mt-1 text-xs text-destructive">
                {errores.tipoVivienda}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Tipo de animal *</label>
            <select
              value={formData.tipoAnimal}
              onChange={(e) =>
                actualizarCampo("tipoAnimal", e.target.value as TipoAnimal)
              }
              className={inputClass}
            >
              <option value="PERRO">Perros</option>
              <option value="GATO">Gatos</option>
              <option value="AMBOS">Perros y gatos</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Capacidad máxima *</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="number"
                min={1}
                step={1}
                value={formData.capacidad}
                onChange={(e) =>
                  actualizarCampo("capacidad", Number(e.target.value))
                }
                className={`${inputClass} pl-9`}
              />
            </div>
            {errores.capacidad && (
              <p className="mt-1 text-xs text-destructive">
                {errores.capacidad}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 self-center text-sm text-foreground">
            <input
              type="checkbox"
              checked={formData.tieneOtrasMascotas}
              onChange={(e) =>
                actualizarCampo("tieneOtrasMascotas", e.target.checked)
              }
              className="h-4 w-4 accent-primary"
            />
            Tiene otras mascotas
          </label>
        </div>

        <div>
          <label className={labelClass}>Restricciones o condiciones</label>
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium text-foreground">
              Sexo aceptado
              <select
                value={sexoAceptado}
                onChange={(event) => setSexoAceptado(event.target.value)}
                className={inputClass}
              >
                <option value="CUALQUIERA">Cualquiera</option>
                <option value="MACHO">Solo machos</option>
                <option value="HEMBRA">Solo hembras</option>
              </select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-foreground">
              Peso máximo (kg)
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={pesoMaximo}
                onChange={(event) => setPesoMaximo(event.target.value)}
                className={inputClass}
                placeholder="Sin límite"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground sm:col-span-2">
              <input
                type="checkbox"
                checked={soloCachorros}
                onChange={(event) => setSoloCachorros(event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Acepta solo cachorros
            </label>
          </div>
          <div className="flex gap-2">
            <input
              value={nuevaRestriccion}
              onChange={(e) => setNuevaRestriccion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  agregarRestriccion();
                }
              }}
              className={inputClass}
              placeholder="Ej. No cachorros"
            />
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={agregarRestriccion}
              className="shrink-0 rounded-full font-semibold"
            >
              <Plus className="mr-1 h-4 w-4" />
              Agregar
            </Button>
          </div>

          {formData.restricciones.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.restricciones.map((restriccion) => (
                <span
                  key={restriccion}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground"
                >
                  {restriccion}
                  <button
                    type="button"
                    onClick={() => eliminarRestriccion(restriccion)}
                    className="rounded-full text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                    aria-label={`Eliminar ${restriccion}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {initialData?.id && (
        <div>
          <label className={labelClass} htmlFor="estado-hogar">
            Estado del hogar
          </label>
          <select
            id="estado-hogar"
            value={formData.estado}
            onChange={(event) =>
              actualizarCampo("estado", event.target.value as EstadoHogar)
            }
            className={inputClass}
          >
            <option value="DISPONIBLE">Disponible</option>
            <option value="OCUPADO">Ocupado</option>
            <option value="PAUSADO">Pausado</option>
            <option value="NO_DISPONIBLE">No disponible</option>
          </select>
        </div>
      )}

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="default"
            className="rounded-full font-semibold"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" size="default" className="rounded-full font-semibold">
          <PawPrint className="mr-2 h-4 w-4" />
          {initialData?.id ? "Guardar cambios" : "Registrar hogar"}
        </Button>
      </div>
      {errores.formulario && (
        <p role="alert" className="text-sm text-destructive">
          {errores.formulario}
        </p>
      )}
    </form>
  );
}
