import { useMemo, useState } from "react";
import {
  Plus,
  Home,
  CheckCircle,
  Users,
  PauseCircle,
  X,
  Trash2,
} from "lucide-react";
import { EmptyState } from "../components/common/EmptyState";
import { FiltrosHogares } from "../components/hogares/FiltrosHogares";
import { HogarTable } from "../components/hogares/HogarTable";
import { mockHogares } from "../mocks/Hogares";
import type { HogarTransito, Transito } from "../types/transito";
import { Button } from "@/components/ui/button";
import { HogarForm } from "../components/hogares/HogarForm";
import { ANIMALES_MOCK } from "@/mocks/animales";

type ModalMode =
  | "create"
  | "view"
  | "edit"
  | "transit"
  | "editTransit"
  | "deleteTransit";

interface TransitFormData {
  animalId: string;
  fechaInicio: string;
  fechaFinEstimada: string;
  observaciones: string;
}

interface TransitEditFormData {
  fechaFinEstimada: string;
  reporteSalud: string;
  finalizar: boolean;
  motivoEgreso: Transito["motivoEgreso"] | "";
  hogarDestinoId: string;
}

const fechaLocalHoy = () => {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
};

const transitosIniciales: Transito[] = mockHogares.flatMap((hogar) =>
  Array.from({ length: hogar.ocupacion }, (_, indice) => ({
    id: `DEMO-${hogar.id}-${indice + 1}`,
    hogarId: hogar.id,
    animalId: `DEMO-ANIMAL-${hogar.id}-${indice + 1}`,
    nombreAnimal: `Animal de ejemplo ${indice + 1}`,
    fechaInicio: fechaLocalHoy(),
    observaciones: "Tránsito de ejemplo para reflejar la ocupación inicial.",
    estado: "ACTIVO" as const,
  })),
);

const validarCompatibilidad = (
  hogar: HogarTransito,
  animal: (typeof ANIMALES_MOCK)[number],
) => {
  const especieAnimal = animal.especie.toLowerCase();
  if (
    (hogar.tipoAnimal === "PERRO" && especieAnimal !== "perro") ||
    (hogar.tipoAnimal === "GATO" && especieAnimal !== "gato")
  ) {
    return `Este hogar no acepta ${especieAnimal === "perro" ? "perros" : "gatos"}.`;
  }

  const restricciones = hogar.restricciones
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (restricciones.includes("no cachorros") && animal.edadestimada <= 1) {
    return "Este hogar no acepta cachorros.";
  }
  if (restricciones.includes("solo cachorros") && animal.edadestimada > 1) {
    return "Este hogar acepta solo cachorros.";
  }
  if (
    restricciones.includes("solo machos") &&
    animal.sexo.toLowerCase() !== "macho"
  ) {
    return "Este hogar acepta solo animales machos.";
  }
  if (
    restricciones.includes("solo hembras") &&
    animal.sexo.toLowerCase() !== "hembra"
  ) {
    return "Este hogar acepta solo animales hembras.";
  }

  const pesoMaximo = restricciones.match(/maximo\s+(\d+(?:[.,]\d+)?)\s*kg/);
  if (pesoMaximo && animal.peso > Number(pesoMaximo[1].replace(",", "."))) {
    return `El hogar acepta animales de hasta ${pesoMaximo[1]} kg y este animal pesa ${animal.peso} kg.`;
  }

  if (restricciones.includes("solo gatos") && especieAnimal !== "gato") {
    return "Este hogar solo acepta gatos.";
  }

  return "";
};

export function HogaresTransito() {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");
  const [hogares, setHogares] = useState(mockHogares);
  const [transitos, setTransitos] = useState<Transito[]>(transitosIniciales);
  const [animales, setAnimales] = useState(ANIMALES_MOCK);
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [hogarSeleccionado, setHogarSeleccionado] =
    useState<HogarTransito | null>(null);
  const [transitoSeleccionado, setTransitoSeleccionado] =
    useState<Transito | null>(null);
  const [transitForm, setTransitForm] = useState<TransitFormData>({
    animalId: "",
    fechaInicio: fechaLocalHoy(),
    fechaFinEstimada: "",
    observaciones: "",
  });
  const [transitEditForm, setTransitEditForm] =
    useState<TransitEditFormData>({
      fechaFinEstimada: "",
      reporteSalud: "",
      finalizar: false,
      motivoEgreso: "",
      hogarDestinoId: "",
    });
  const [errorTransito, setErrorTransito] = useState("");
  const [motivoCancelacion, setMotivoCancelacion] = useState("");
  const [mensajeTransito, setMensajeTransito] = useState("");

  const cerrarModal = () => {
    setModalMode(null);
    setHogarSeleccionado(null);
    setTransitoSeleccionado(null);
    setErrorTransito("");
    setMotivoCancelacion("");
  };

  const handleRegistrarHogar = (
    data: Omit<HogarTransito, "id" | "ocupacion">,
  ) => {
    const direccionNormalizada = `${data.direccion}, ${data.localidad}`
      .trim()
      .toLocaleLowerCase();
    const direccionDuplicada = hogares.some(
      (hogar) =>
        `${hogar.direccion}, ${hogar.localidad}`
          .trim()
          .toLocaleLowerCase() === direccionNormalizada,
    );
    if (direccionDuplicada) {
      return "Ya existe un hogar registrado en esa dirección y localidad.";
    }

    const nuevoHogar: HogarTransito = {
      ...data,
      id: `HT-${Date.now()}`,
      ocupacion: 0,
    };
    setHogares((actuales) => [...actuales, nuevoHogar]);
    cerrarModal();
    return;
  };

  const handleActualizarHogar = (
    data: Omit<HogarTransito, "id" | "ocupacion">,
  ) => {
    if (!hogarSeleccionado) return;

    const direccionNormalizada = `${data.direccion}, ${data.localidad}`
      .trim()
      .toLocaleLowerCase();
    const direccionDuplicada = hogares.some(
      (hogar) =>
        hogar.id !== hogarSeleccionado.id &&
        `${hogar.direccion}, ${hogar.localidad}`
          .trim()
          .toLocaleLowerCase() === direccionNormalizada,
    );
    if (direccionDuplicada) {
      return "Ya existe otro hogar registrado en esa dirección y localidad.";
    }

    const hogarActualizado: HogarTransito = {
      ...hogarSeleccionado,
      ...data,
      estado:
        data.estado === "DISPONIBLE" && hogarSeleccionado.ocupacion > 0
          ? "OCUPADO"
          : data.estado,
    };
    setHogares((actuales) =>
      actuales.map((hogar) =>
        hogar.id === hogarActualizado.id ? hogarActualizado : hogar,
      ),
    );
    cerrarModal();
    return;
  };

  const handleGuardarTransito = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hogarSeleccionado) return;
    const animalSeleccionado = animales.find(
      (animal) => String(animal.idanimal) === transitForm.animalId,
    );
    if (!animalSeleccionado || animalSeleccionado.estado !== "EN_ADOPCION") {
      setErrorTransito("Seleccioná un animal disponible para tránsito.");
      return;
    }
    if (
      hogarSeleccionado.estado === "PAUSADO" ||
      hogarSeleccionado.estado === "NO_DISPONIBLE" ||
      hogarSeleccionado.ocupacion >= hogarSeleccionado.capacidad
    ) {
      setErrorTransito("Este hogar no está disponible o ya alcanzó su capacidad máxima.");
      return;
    }
    if (!transitForm.fechaInicio) {
      setErrorTransito("Ingresá una fecha estimada de inicio.");
      return;
    }
    if (
      transitForm.fechaFinEstimada &&
      transitForm.fechaFinEstimada < transitForm.fechaInicio
    ) {
      setErrorTransito(
        "La fecha estimada de finalización no puede ser anterior al inicio.",
      );
      return;
    }
    const incompatibilidad = validarCompatibilidad(
      hogarSeleccionado,
      animalSeleccionado,
    );
    if (incompatibilidad) {
      setErrorTransito(incompatibilidad);
      return;
    }

    const nuevoTransito: Transito = {
      id: `TR-${Date.now()}`,
      hogarId: hogarSeleccionado.id,
      animalId: String(animalSeleccionado.idanimal),
      nombreAnimal: animalSeleccionado.nombre,
      fechaInicio: transitForm.fechaInicio,
      ...(transitForm.fechaFinEstimada && {
        fechaFinEstimada: transitForm.fechaFinEstimada,
      }),
      ...(transitForm.observaciones.trim() && {
        observaciones: transitForm.observaciones.trim(),
      }),
      estado: "ACTIVO",
    };

    setTransitos((actuales) => [...actuales, nuevoTransito]);
    setAnimales((actuales) =>
      actuales.map((animal) =>
        animal.idanimal === animalSeleccionado.idanimal
          ? { ...animal, estado: "EN_TRANSITO" }
          : animal,
      ),
    );
    setHogares((actuales) =>
      actuales.map((hogar) =>
        hogar.id === hogarSeleccionado.id
          ? {
              ...hogar,
              ocupacion: hogar.ocupacion + 1,
              estado: "OCUPADO",
            }
          : hogar,
      ),
    );
    setMensajeTransito(
      `Se registró el tránsito de ${animalSeleccionado.nombre}. El envío del correo al transitario requiere integrar el backend.`,
    );
    cerrarModal();
  };

  const handleEditarTransito = (transito: Transito) => {
    setTransitoSeleccionado(transito);
    setTransitEditForm({
      fechaFinEstimada: transito.fechaFinEstimada ?? "",
      reporteSalud: "",
      finalizar: false,
      motivoEgreso: "",
      hogarDestinoId: "",
    });
    setErrorTransito("");
    setModalMode("editTransit");
  };

  const handleSolicitarEliminacionTransito = (transito: Transito) => {
    setTransitoSeleccionado(transito);
    setMotivoCancelacion("");
    setErrorTransito("");
    setModalMode("deleteTransit");
  };

  const handleEliminarTransitoDesdeTabla = (hogar: HogarTransito) => {
    const transitosActivos = transitos.filter(
      (transito) =>
        transito.hogarId === hogar.id && transito.estado === "ACTIVO",
    );
    setHogarSeleccionado(hogar);
    setTransitoSeleccionado(
      transitosActivos.length === 1 ? transitosActivos[0] : null,
    );
    setMotivoCancelacion("");
    setErrorTransito("");
    setModalMode("deleteTransit");
  };

  const handleEliminarTransito = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!transitoSeleccionado) return;

    const motivo = motivoCancelacion.trim();
    if (!motivo) {
      setErrorTransito("Ingresá el motivo por el que se cancela el tránsito.");
      return;
    }
    if (motivo.length < 5) {
      setErrorTransito("El motivo debe tener al menos 5 caracteres.");
      return;
    }
    if (transitoSeleccionado.estado !== "ACTIVO") {
      setErrorTransito("Solo se pueden cancelar tránsitos activos.");
      return;
    }

    const hogar = hogares.find(
      (actual) => actual.id === transitoSeleccionado.hogarId,
    );
    if (!hogar) {
      setErrorTransito("No se encontró el hogar asociado al tránsito.");
      return;
    }

    const transitoCancelado: Transito = {
      ...transitoSeleccionado,
      estado: "CANCELADO",
      fechaFinReal: fechaLocalHoy(),
      motivoCancelacion: motivo,
    };

    setTransitos((actuales) =>
      actuales.map((actual) =>
        actual.id === transitoCancelado.id ? transitoCancelado : actual,
      ),
    );
    setHogares((actuales) =>
      actuales.map((actual) => {
        if (actual.id !== hogar.id) return actual;
        const ocupacion = Math.max(0, actual.ocupacion - 1);
        return {
          ...actual,
          ocupacion,
          estado:
            ocupacion === 0 && actual.estado === "OCUPADO"
              ? "DISPONIBLE"
              : actual.estado,
        };
      }),
    );
    setAnimales((actuales) =>
      actuales.map((animal) =>
        String(animal.idanimal) === transitoCancelado.animalId
          ? { ...animal, estado: "EN_ADOPCION" }
          : animal,
      ),
    );
    cerrarModal();
  };

  const handleGuardarEdicionTransito = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!transitoSeleccionado) return;

    const transitoActualizado: Transito = {
      ...transitoSeleccionado,
      fechaFinEstimada: transitEditForm.fechaFinEstimada || undefined,
      ...(transitEditForm.reporteSalud.trim() && {
        reportesSalud: [
          ...(transitoSeleccionado.reportesSalud ?? []),
          {
            fecha: fechaLocalHoy(),
            detalle: transitEditForm.reporteSalud.trim(),
          },
        ],
      }),
    };

    if (!transitEditForm.finalizar) {
      setTransitos((actuales) =>
        actuales.map((transito) =>
          transito.id === transitoSeleccionado.id
            ? transitoActualizado
            : transito,
        ),
      );
      cerrarModal();
      return;
    }

    if (!transitEditForm.motivoEgreso) {
      setErrorTransito("Seleccioná el motivo de egreso.");
      return;
    }

    const hogarActual = hogares.find(
      (hogar) => hogar.id === transitoSeleccionado.hogarId,
    );
    if (!hogarActual) {
      setErrorTransito("No se encontró el hogar asociado a este tránsito.");
      return;
    }

    const hogarDestino =
      transitEditForm.motivoEgreso === "TRASPASO"
        ? hogares.find(
            (hogar) => hogar.id === transitEditForm.hogarDestinoId,
          )
        : undefined;
    if (
      transitEditForm.motivoEgreso === "TRASPASO" &&
      (!hogarDestino ||
        hogarDestino.id === hogarActual.id ||
        hogarDestino.estado === "PAUSADO" ||
        hogarDestino.estado === "NO_DISPONIBLE" ||
        hogarDestino.ocupacion >= hogarDestino.capacidad)
    ) {
      setErrorTransito("Seleccioná otro hogar activo con cupo disponible.");
      return;
    }
    if (hogarDestino) {
      const animalEnTransito = animales.find(
        (animal) => String(animal.idanimal) === transitoSeleccionado.animalId,
      );
      if (!animalEnTransito) {
        setErrorTransito("No se encontró el animal asociado al tránsito.");
        return;
      }
      const incompatibilidadDestino = validarCompatibilidad(
        hogarDestino,
        animalEnTransito,
      );
      if (incompatibilidadDestino) {
        setErrorTransito(incompatibilidadDestino);
        return;
      }
    }

    const finalizado: Transito = {
      ...transitoActualizado,
      estado: "FINALIZADO",
      fechaFinReal: fechaLocalHoy(),
      motivoEgreso: transitEditForm.motivoEgreso,
    };
    setTransitos((actuales) => [
      ...actuales.map((transito) =>
        transito.id === finalizado.id ? finalizado : transito,
      ),
      ...(hogarDestino
        ? [
            {
              id: `TR-${Date.now()}`,
              hogarId: hogarDestino.id,
              animalId: finalizado.animalId,
              nombreAnimal: finalizado.nombreAnimal,
              fechaInicio: fechaLocalHoy(),
              estado: "ACTIVO" as const,
              observaciones: `Traspasado desde ${hogarActual.nombreTransitante} ${hogarActual.apellidoTransitante}.`,
            },
          ]
        : []),
    ]);
    setHogares((actuales) =>
      actuales.map((hogar) => {
        if (hogar.id === hogarActual.id) {
          const ocupacion = Math.max(0, hogar.ocupacion - 1);
          return {
            ...hogar,
            ocupacion,
            estado:
              ocupacion === 0 && hogar.estado === "OCUPADO"
                ? "DISPONIBLE"
                : hogar.estado,
          };
        }
        if (hogarDestino && hogar.id === hogarDestino.id) {
          return {
            ...hogar,
            ocupacion: hogar.ocupacion + 1,
            estado: "OCUPADO",
          };
        }
        return hogar;
      }),
    );
    setAnimales((actuales) =>
      actuales.map((animal) =>
        String(animal.idanimal) === finalizado.animalId
          ? {
              ...animal,
              estado:
                finalizado.motivoEgreso === "ADOPCION"
                  ? "ADOPTADO"
                  : finalizado.motivoEgreso === "TRASPASO"
                    ? "EN_TRANSITO"
                    : "EN_ADOPCION",
            }
          : animal,
      ),
    );
    cerrarModal();
  };

  const hogaresFiltrados = useMemo(() => {
    return hogares.filter((hogar) => {
      const nombreCompleto =
        `${hogar.nombreTransitante} ${hogar.apellidoTransitante}`.toLowerCase();

      const coincideBusqueda =
        nombreCompleto.includes(busqueda.toLowerCase());

      const coincideEstado =
        estado === "" || hogar.estado === estado;

      const coincideLocalidad =
        localidad === "" || hogar.localidad === localidad;

      const coincideAnimal =
        tipoAnimal === "" ||
        hogar.tipoAnimal === tipoAnimal;

      return (
        coincideBusqueda &&
        coincideEstado &&
        coincideLocalidad &&
        coincideAnimal
      );
    });
  }, [hogares, busqueda, estado, localidad, tipoAnimal]);

  const hogaresDisponibles = hogares.filter(
    (hogar) => hogar.estado === "DISPONIBLE",
  ).length;

  const hogaresOcupados = hogares.filter(
    (hogar) => hogar.estado === "OCUPADO",
  ).length;

  const hogaresPausados = hogares.filter(
    (hogar) => hogar.estado === "PAUSADO",
  ).length;

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstado("");
    setLocalidad("");
    setTipoAnimal("");
  };

  const handleVer = (hogar: HogarTransito) => {
    setHogarSeleccionado(hogar);
    setModalMode("view");
  };

  const handleEditar = (hogar: HogarTransito) => {
    setHogarSeleccionado(hogar);
    setModalMode("edit");
  };

  const handleRegistrarTransito = (hogar: HogarTransito) => {
    setHogarSeleccionado(hogar);
    setTransitForm({
      animalId: "",
      fechaInicio: fechaLocalHoy(),
      fechaFinEstimada: "",
      observaciones: "",
    });
    setMensajeTransito("");
    setModalMode("transit");
  };

  const animalesDisponibles = animales.filter(
    (animal) => animal.estado === "EN_ADOPCION",
  );
  const animalSeleccionado = animalesDisponibles.find(
    (animal) => String(animal.idanimal) === transitForm.animalId,
  );
  const incompatibilidadActual =
    hogarSeleccionado && animalSeleccionado
      ? validarCompatibilidad(hogarSeleccionado, animalSeleccionado)
      : "";

  return (
    <div className="min-h-screen space-y-6 bg-muted px-6 py-8 text-foreground md:px-10">
      <div className="mb-8 flex w-full items-center justify-between gap-4 pt-4">
        <h1 className="text-2xl font-bold text-foreground">
          Hogares de Tránsito
        </h1>
        <Button
          type="button"
          size="lg"
          className="px-4 text-base font-semibold"
          onClick={() => {
            setHogarSeleccionado(null);
            setModalMode("create");
          }}
        >
          <Plus className="mr-2 h-5 w-5" />
          Nuevo hogar
        </Button>
      </div>
      {mensajeTransito && (
        <div
          role="status"
          className="flex items-start justify-between gap-4 rounded-lg border border-info/30 bg-info/10 px-4 py-3 text-sm text-foreground"
        >
          <p>{mensajeTransito}</p>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Cerrar aviso"
            onClick={() => setMensajeTransito("")}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total de hogares
              </p>

              <p className="mt-1 text-2xl font-bold text-foreground">
                {hogares.length}
              </p>
            </div>

            <div className="rounded-lg bg-muted p-3">
              <Home size={22} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Disponibles
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                {hogaresDisponibles}
              </p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-950/50">
              <CheckCircle
                size={22}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Ocupados
              </p>

              <p className="mt-1 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {hogaresOcupados}
              </p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-950/50">
              <Users size={22} className="text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Pausados
              </p>

              <p className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                {hogaresPausados}
              </p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-950/50">
              <PauseCircle
                size={22}
                className="text-orange-600 dark:text-orange-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosHogares
        busqueda={busqueda}
        estado={estado}
        localidad={localidad}
        tipoAnimal={tipoAnimal}
        onBusquedaChange={setBusqueda}
        onEstadoChange={setEstado}
        onLocalidadChange={setLocalidad}
        onTipoAnimalChange={setTipoAnimal}
        onLimpiar={limpiarFiltros}
      />

      {/* Tabla */}
      {hogaresFiltrados.length > 0 ? (
        <HogarTable
          hogares={hogaresFiltrados}
          transitos={transitos}
          onVer={handleVer}
          onEditar={handleEditar}
          onRegistrarTransito={handleRegistrarTransito}
          onEliminarTransito={handleEliminarTransitoDesdeTabla}
        />
      ) : (
        <EmptyState
          title="No se encontraron hogares"
          description="No hay hogares que coincidan con los filtros seleccionados."
          action={
            <button
              type="button"
              onClick={limpiarFiltros}
              className="inline-flex h-8 items-center justify-center rounded-full border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Limpiar filtros
            </button>
          }
        />
      )}
      {modalMode && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) cerrarModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="hogar-modal-titulo"
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xl"
          >
            <header className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2
                  id="hogar-modal-titulo"
                  className="text-lg font-semibold text-foreground"
                >
                  {modalMode === "create" && "Nuevo hogar de tránsito"}
                  {modalMode === "edit" && "Modificar hogar"}
                  {modalMode === "view" && "Datos del hogar"}
                  {modalMode === "transit" && "Añadir tránsito"}
                  {modalMode === "editTransit" && "Modificar tránsito"}
                  {modalMode === "deleteTransit" && "Eliminar tránsito"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {modalMode === "create" &&
                    "Completá los datos. Verificá que la persona voluntaria ya haya sido aprobada."}
                  {modalMode === "edit" &&
                    "Actualizá los datos del hogar seleccionado."}
                  {modalMode === "view" &&
                    "Información y tránsitos activos de este hogar."}
                  {modalMode === "transit" &&
                    "Registrá un animal en este hogar de tránsito."}
                  {modalMode === "editTransit" &&
                    "Actualizá el tránsito o registrá su finalización."}
                  {modalMode === "deleteTransit" &&
                    (transitoSeleccionado
                      ? "Se conservará el registro en el historial y se liberará el cupo."
                      : "Elegí cuál de los tránsitos activos querés eliminar.")}
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                aria-label="Cerrar ventana"
                onClick={cerrarModal}
              >
                <X className="h-4 w-4" />
              </Button>
            </header>

            <div className="overflow-y-auto p-5">
              {(modalMode === "create" || modalMode === "edit") && (
                <HogarForm
                  key={`${modalMode}-${hogarSeleccionado?.id ?? "nuevo"}`}
                  initialData={
                    modalMode === "edit" ? hogarSeleccionado ?? undefined : undefined
                  }
                  onSubmit={
                    modalMode === "edit"
                      ? handleActualizarHogar
                      : handleRegistrarHogar
                  }
                  onCancel={cerrarModal}
                />
              )}

              {modalMode === "view" && hogarSeleccionado && (
                <div className="space-y-5">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["Transitante", `${hogarSeleccionado.nombreTransitante} ${hogarSeleccionado.apellidoTransitante}`],
                      ["Teléfono", hogarSeleccionado.telefono],
                      ["Dirección", hogarSeleccionado.direccion],
                      ["Localidad", hogarSeleccionado.localidad],
                      ["Tipo de vivienda", hogarSeleccionado.tipoVivienda],
                      ["Animales aceptados", hogarSeleccionado.tipoAnimal],
                      ["Ocupación", `${hogarSeleccionado.ocupacion} de ${hogarSeleccionado.capacidad}`],
                      ["Estado", hogarSeleccionado.estado],
                      ["Otras mascotas", hogarSeleccionado.tieneOtrasMascotas ? "Sí" : "No"],
                      ["Restricciones", hogarSeleccionado.restricciones.join(", ") || "Ninguna"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-sm text-muted-foreground">{label}</dt>
                        <dd className="font-medium text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold text-foreground">
                      Historial de tránsitos
                    </h3>
                    {transitos.filter(
                      (transito) => transito.hogarId === hogarSeleccionado.id,
                    ).length > 0 ? (
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        {transitos
                          .filter(
                            (transito) => transito.hogarId === hogarSeleccionado.id,
                          )
                          .map((transito) => (
                            <li
                              key={transito.id}
                              className="space-y-3 rounded-lg border border-border bg-background p-3"
                            >
                              <div className="break-words">
                                <span className="font-medium text-foreground">
                                  {transito.nombreAnimal} ({transito.animalId})
                                </span>
                                {" · Inicio: "}
                                {transito.fechaInicio}
                                {" · Estado: "}
                                {transito.estado}
                                {transito.observaciones &&
                                  ` · ${transito.observaciones}`}
                                {transito.fechaFinReal &&
                                  ` · Egreso: ${transito.fechaFinReal}`}
                                {transito.motivoEgreso &&
                                  ` · Motivo: ${transito.motivoEgreso}`}
                                {transito.motivoCancelacion && (
                                  <p className="mt-2 rounded-md bg-destructive/10 p-2 text-destructive">
                                    <span className="font-semibold">
                                      Motivo de eliminación:
                                    </span>{" "}
                                    {transito.motivoCancelacion}
                                  </p>
                                )}
                                {transito.reportesSalud?.map((reporte) => (
                                  <p key={`${transito.id}-${reporte.fecha}-${reporte.detalle}`}>
                                    {" · Reporte de salud "}
                                    {reporte.fecha}: {reporte.detalle}
                                  </p>
                                ))}
                              </div>
                              {transito.estado === "ACTIVO" && (
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    type="button"
                                    size="sm"
                                    className="font-semibold"
                                    onClick={() => handleEditarTransito(transito)}
                                  >
                                    Modificar tránsito
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    className="font-semibold"
                                    onClick={() =>
                                      handleSolicitarEliminacionTransito(transito)
                                    }
                                  >
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Eliminar tránsito
                                  </Button>
                                </div>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">
                        No hay tránsitos registrados.
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="font-semibold"
                      onClick={cerrarModal}
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              )}

              {modalMode === "transit" && hogarSeleccionado && (
                <form onSubmit={handleGuardarTransito} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Hogar:{" "}
                    <span className="font-medium text-foreground">
                      {hogarSeleccionado.nombreTransitante}{" "}
                      {hogarSeleccionado.apellidoTransitante}
                    </span>
                    {" · "}Cupo disponible:{" "}
                    {hogarSeleccionado.capacidad - hogarSeleccionado.ocupacion}
                  </p>
                  <label className="block space-y-1.5 text-sm font-medium text-foreground">
                    Animal rescatado *
                    <select
                      required
                      value={transitForm.animalId}
                      onChange={(event) => {
                        setTransitForm((actual) => ({
                          ...actual,
                          animalId: event.target.value,
                        }));
                        setErrorTransito("");
                      }}
                      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Seleccioná un animal disponible</option>
                      {animalesDisponibles.map((animal) => (
                        <option key={animal.idanimal} value={animal.idanimal}>
                          {animal.nombre} · {animal.especie} · ID {animal.idanimal} ·{" "}
                          {animal.peso} kg
                        </option>
                      ))}
                    </select>
                  </label>
                  {animalSeleccionado && (
                    <div
                      className={`rounded-md border px-3 py-2 text-sm ${
                        incompatibilidadActual
                          ? "border-destructive/40 bg-destructive/10 text-destructive"
                          : "border-success/40 bg-success/10 text-foreground"
                      }`}
                    >
                      {incompatibilidadActual ||
                        `${animalSeleccionado.nombre} es compatible con este hogar.`}
                    </div>
                  )}
                  {animalesDisponibles.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No hay animales disponibles para asignar.
                    </p>
                  )}
                  <label className="block space-y-1.5 text-sm font-medium text-foreground">
                    Fecha estimada de inicio *
                    <input
                      required
                      type="date"
                      value={transitForm.fechaInicio}
                      onChange={(event) => {
                        setTransitForm((actual) => ({
                          ...actual,
                          fechaInicio: event.target.value,
                        }));
                        setErrorTransito("");
                      }}
                      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm font-medium text-foreground">
                    Fecha estimada de finalización
                    <input
                      type="date"
                      value={transitForm.fechaFinEstimada}
                      onChange={(event) =>
                        setTransitForm((actual) => ({
                          ...actual,
                          fechaFinEstimada: event.target.value,
                        }))
                      }
                      min={transitForm.fechaInicio}
                      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm font-medium text-foreground">
                    Observaciones
                    <textarea
                      value={transitForm.observaciones}
                      onChange={(event) =>
                        setTransitForm((actual) => ({
                          ...actual,
                          observaciones: event.target.value,
                        }))
                      }
                      className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                  {errorTransito && (
                    <p role="alert" className="text-sm text-destructive">
                      {errorTransito}
                    </p>
                  )}
                  <div className="flex justify-end gap-2 border-t border-border pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="font-semibold"
                      onClick={cerrarModal}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="font-semibold">
                      Registrar tránsito
                    </Button>
                  </div>
                </form>
              )}

              {modalMode === "deleteTransit" &&
                !transitoSeleccionado &&
                hogarSeleccionado && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Este hogar tiene varios tránsitos activos. Seleccioná uno
                      para continuar:
                    </p>
                    {transitos
                      .filter(
                        (transito) =>
                          transito.hogarId === hogarSeleccionado.id &&
                          transito.estado === "ACTIVO",
                      )
                      .map((transito) => (
                        <Button
                          key={transito.id}
                          type="button"
                          variant="outline"
                          className="h-auto w-full justify-start whitespace-normal py-3 text-left"
                          onClick={() =>
                            handleSolicitarEliminacionTransito(transito)
                          }
                        >
                          {transito.nombreAnimal} · Inició el{" "}
                          {transito.fechaInicio}
                        </Button>
                      ))}
                  </div>
                )}

              {modalMode === "deleteTransit" && transitoSeleccionado && (
                <form
                  onSubmit={handleEliminarTransito}
                  className="space-y-4"
                >
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-foreground">
                    Vas a eliminar el tránsito de{" "}
                    <span className="font-semibold">
                      {transitoSeleccionado.nombreAnimal}
                    </span>
                    . El registro se conservará en el historial y se liberará el
                    cupo del hogar.
                  </div>
                  <label className="block space-y-1.5 text-sm font-medium text-foreground">
                    Descripción del motivo de eliminación *
                    <span className="block font-normal text-muted-foreground">
                      Explicá por qué se elimina (por ejemplo, cambio de
                      disponibilidad o decisión del transitante). Este motivo
                      quedará registrado en el historial.
                    </span>
                    <textarea
                      required
                      minLength={5}
                      autoFocus
                      value={motivoCancelacion}
                      onChange={(event) => {
                        setMotivoCancelacion(event.target.value);
                        setErrorTransito("");
                      }}
                      className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Describí el motivo de la eliminación..."
                    />
                  </label>
                  {errorTransito && (
                    <p role="alert" className="text-sm text-destructive">
                      {errorTransito}
                    </p>
                  )}
                  <div className="flex justify-end gap-2 border-t border-border pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="font-semibold"
                      onClick={cerrarModal}
                    >
                      Volver
                    </Button>
                    <Button
                      type="submit"
                      variant="destructive"
                      className="font-semibold"
                    >
                      Confirmar eliminación
                    </Button>
                  </div>
                </form>
              )}

              {modalMode === "editTransit" && transitoSeleccionado && (
                <form
                  onSubmit={handleGuardarEdicionTransito}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted-foreground">
                    Tránsito activo de{" "}
                    <span className="font-medium text-foreground">
                      {transitoSeleccionado.nombreAnimal}
                    </span>
                    {" · Inicio: "}
                    {transitoSeleccionado.fechaInicio}
                  </p>
                  <label className="block space-y-1.5 text-sm font-medium text-foreground">
                    Fecha estimada de finalización
                    <input
                      type="date"
                      min={transitoSeleccionado.fechaInicio}
                      value={transitEditForm.fechaFinEstimada}
                      onChange={(event) =>
                        setTransitEditForm((actual) => ({
                          ...actual,
                          fechaFinEstimada: event.target.value,
                        }))
                      }
                      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm font-medium text-foreground">
                    Reporte de salud
                    <textarea
                      value={transitEditForm.reporteSalud}
                      onChange={(event) =>
                        setTransitEditForm((actual) => ({
                          ...actual,
                          reporteSalud: event.target.value,
                        }))
                      }
                      className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Estado de salud, medicación o cuidados..."
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={transitEditForm.finalizar}
                      onChange={(event) => {
                        setTransitEditForm((actual) => ({
                          ...actual,
                          finalizar: event.target.checked,
                          motivoEgreso: "",
                          hogarDestinoId: "",
                        }));
                        setErrorTransito("");
                      }}
                      className="h-4 w-4 accent-primary"
                    />
                    Finalizar tránsito
                  </label>
                  {transitEditForm.finalizar && (
                    <>
                      <label className="block space-y-1.5 text-sm font-medium text-foreground">
                        Motivo de egreso *
                        <select
                          required
                          value={transitEditForm.motivoEgreso}
                          onChange={(event) =>
                            setTransitEditForm((actual) => ({
                              ...actual,
                              motivoEgreso: event.target.value as
                                | Transito["motivoEgreso"]
                                | "",
                            }))
                          }
                          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Seleccioná un motivo</option>
                          <option value="ADOPCION">Adopción</option>
                          <option value="DEVOLUCION">Devolución</option>
                          <option value="TRASPASO">Traspaso a otro hogar</option>
                        </select>
                      </label>
                      {transitEditForm.motivoEgreso === "TRASPASO" && (
                        <label className="block space-y-1.5 text-sm font-medium text-foreground">
                          Hogar de destino *
                          <select
                            required
                            value={transitEditForm.hogarDestinoId}
                            onChange={(event) =>
                              setTransitEditForm((actual) => ({
                                ...actual,
                                hogarDestinoId: event.target.value,
                              }))
                            }
                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="">Seleccioná un hogar</option>
                            {hogares
                              .filter(
                                (hogar) =>
                                  hogar.id !== transitoSeleccionado.hogarId &&
                                  hogar.estado !== "PAUSADO" &&
                                  hogar.estado !== "NO_DISPONIBLE" &&
                                  hogar.ocupacion < hogar.capacidad,
                              )
                              .map((hogar) => (
                                <option key={hogar.id} value={hogar.id}>
                                  {hogar.nombreTransitante}{" "}
                                  {hogar.apellidoTransitante} ·{" "}
                                  {hogar.capacidad - hogar.ocupacion} cupos
                                </option>
                              ))}
                          </select>
                        </label>
                      )}
                    </>
                  )}
                  {errorTransito && (
                    <p role="alert" className="text-sm text-destructive">
                      {errorTransito}
                    </p>
                  )}
                  <div className="flex justify-end gap-2 border-t border-border pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="font-semibold"
                      onClick={cerrarModal}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="font-semibold">
                      Guardar cambios
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
