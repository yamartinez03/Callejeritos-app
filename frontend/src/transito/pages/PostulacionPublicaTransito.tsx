import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PostulacionTransito, TipoAnimal } from "../types/transito";
import { guardarPostulacionTransito } from "../mocks/postulacionesStorage";

interface PostulacionFormData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  localidad: string;
  tipoVivienda: string;
  horariosAusencia: string;
  tienePatio: boolean;
  consentimientoFamiliar: boolean;
  tieneOtrasMascotas: boolean;
  detalleOtrasMascotas: string;
  experienciaPrevia: boolean;
  tipoAnimal: TipoAnimal;
}

const initialForm: PostulacionFormData = {
  nombre: "",
  apellido: "",
  telefono: "",
  email: "",
  localidad: "",
  tipoVivienda: "",
  horariosAusencia: "",
  tienePatio: false,
  consentimientoFamiliar: false,
  tieneOtrasMascotas: false,
  detalleOtrasMascotas: "",
  experienciaPrevia: false,
  tipoAnimal: "AMBOS",
};

const fieldClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

export default function PostulacionPublicaTransito() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [enviada, setEnviada] = useState(false);

  const actualizar = <K extends keyof PostulacionFormData>(
    campo: K,
    valor: PostulacionFormData[K],
  ) => setForm((actual) => ({ ...actual, [campo]: valor }));

  const enviar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.consentimientoFamiliar) {
      setError("Confirmá que las personas de tu hogar están de acuerdo.");
      return;
    }
    if (
      form.tieneOtrasMascotas &&
      !form.detalleOtrasMascotas.trim()
    ) {
      setError("Contanos qué otras mascotas viven en el hogar.");
      return;
    }

    const postulacion: PostulacionTransito = {
      ...form,
      id: `POST-${Date.now()}`,
      estado: "PENDIENTE",
      fechaPostulacion: new Date().toISOString(),
    };

    try {
      guardarPostulacionTransito(postulacion);
      setEnviada(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? `No se pudo guardar la postulación localmente: ${cause.message}`
          : "No se pudo guardar la postulación localmente.",
      );
    }
  };

  if (enviada) {
    return (
      <main className="min-h-screen bg-muted px-4 py-12 text-foreground sm:px-6">
        <section className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600 dark:text-green-400" />
          <h1 className="mt-4 text-2xl font-bold">
            ¡Recibimos tu postulación!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Quedó registrada como pendiente de evaluación. El equipo operativo
            podrá verla en el panel de postulaciones. La confirmación por correo
            se simula en esta versión frontend.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Volver al inicio
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-8 text-foreground sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <PawPrint className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Postularme como hogar de tránsito</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Completá tus datos para que el equipo pueda evaluar tu postulación.
              </p>
            </div>
          </div>

          <form onSubmit={enviar} className="space-y-6">
            <section className="space-y-4">
              <h2 className="font-semibold">Datos personales</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm font-medium">
                  Nombre *
                  <input
                    required
                    value={form.nombre}
                    onChange={(event) => actualizar("nombre", event.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="space-y-1.5 text-sm font-medium">
                  Apellido *
                  <input
                    required
                    value={form.apellido}
                    onChange={(event) => actualizar("apellido", event.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="space-y-1.5 text-sm font-medium">
                  Teléfono *
                  <input
                    required
                    type="tel"
                    value={form.telefono}
                    onChange={(event) => actualizar("telefono", event.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="space-y-1.5 text-sm font-medium">
                  Correo electrónico *
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => actualizar("email", event.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="space-y-1.5 text-sm font-medium sm:col-span-2">
                  Localidad *
                  <input
                    required
                    value={form.localidad}
                    onChange={(event) => actualizar("localidad", event.target.value)}
                    className={fieldClass}
                  />
                </label>
              </div>
            </section>

            <section className="space-y-4 border-t border-border pt-5">
              <h2 className="font-semibold">Tu hogar y disponibilidad</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm font-medium">
                  Tipo de vivienda *
                  <select
                    required
                    value={form.tipoVivienda}
                    onChange={(event) => actualizar("tipoVivienda", event.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Seleccioná una opción</option>
                    <option>Casa</option>
                    <option>Casa con patio</option>
                    <option>Casa con patio cerrado</option>
                    <option>Departamento</option>
                  </select>
                </label>
                <label className="space-y-1.5 text-sm font-medium">
                  ¿Qué animales podrías recibir? *
                  <select
                    value={form.tipoAnimal}
                    onChange={(event) =>
                      actualizar("tipoAnimal", event.target.value as TipoAnimal)
                    }
                    className={fieldClass}
                  >
                    <option value="PERRO">Perros</option>
                    <option value="GATO">Gatos</option>
                    <option value="AMBOS">Perros y gatos</option>
                  </select>
                </label>
                <label className="space-y-1.5 text-sm font-medium sm:col-span-2">
                  Horarios habituales fuera de casa *
                  <textarea
                    required
                    value={form.horariosAusencia}
                    onChange={(event) => actualizar("horariosAusencia", event.target.value)}
                    className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.tienePatio}
                  onChange={(event) => actualizar("tienePatio", event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                Tengo patio
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.tieneOtrasMascotas}
                  onChange={(event) => actualizar("tieneOtrasMascotas", event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                Convivo con otras mascotas
              </label>
              {form.tieneOtrasMascotas && (
                <label className="block space-y-1.5 text-sm font-medium">
                  Contanos cuáles y cómo conviven *
                  <textarea
                    required
                    value={form.detalleOtrasMascotas}
                    onChange={(event) =>
                      actualizar("detalleOtrasMascotas", event.target.value)
                    }
                    className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
              )}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.experienciaPrevia}
                  onChange={(event) =>
                    actualizar("experienciaPrevia", event.target.checked)
                  }
                  className="h-4 w-4 accent-primary"
                />
                Tengo experiencia previa cuidando animales
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input
                  required
                  type="checkbox"
                  checked={form.consentimientoFamiliar}
                  onChange={(event) =>
                    actualizar("consentimientoFamiliar", event.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                Las personas que viven conmigo están de acuerdo con recibir
                animales en tránsito. *
              </label>
            </section>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <div className="flex justify-end border-t border-border pt-5">
              <Button type="submit" size="lg" className="font-semibold">
                Enviar postulación
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
