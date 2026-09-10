import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  PawPrint,
  Syringe,
  Bug,
  FlaskConical,
  Stethoscope,
  Pill,
  Pencil,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimalNoEncontrado from "@/shared/components/AnimalNoEncontrado";
import { getAnimalPorId } from "@/shared/data/mockAnimales";
import { listarHistorial } from "@/shared/data/mockHistorialClinico";

const OPCIONES = [
  {
    href: "atencion",
    icono: Stethoscope,
    titulo: "Registrar atención veterinaria",
    descripcion: "Consulta o chequeo general con veterinaria o profesional.",
  },
  {
    href: "vacunacion",
    icono: Syringe,
    titulo: "Registrar vacunación",
    descripcion: "Una o más vacunas aplicadas, con su fecha de vencimiento.",
  },
  {
    href: "desparasitacion",
    icono: Bug,
    titulo: "Registrar desparasitación",
    descripcion: "Producto, dosis y próxima aplicación.",
  },
  {
    href: "estudio",
    icono: FlaskConical,
    titulo: "Registrar estudio",
    descripcion: "Análisis, radiografías u otros estudios, con archivo adjunto.",
  },
  {
    href: "tratamiento",
    icono: Pill,
    titulo: "Registrar tratamiento",
    descripcion: "Tratamiento médico con medicación y fechas de inicio/fin.",
  },
  {
    href: "modificar",
    icono: Pencil,
    titulo: "Modificar historial clínico",
    descripcion: "Editar registros existentes del historial.",
  },
  {
    href: "consultar",
    icono: ClipboardList,
    titulo: "Consultar historial clínico",
    descripcion: "Ver todos los registros clínicos del animal.",
  },
];

export default function GestionarHistorialClinico() {
  const { id } = useParams();
  const animal = getAnimalPorId(id);

  if (!animal) {
    return <AnimalNoEncontrado />;
  }

  const cantidadRegistros = listarHistorial(animal.idanimal).length;

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <Link to={`/animales/${animal.idanimal}`}>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Volver al perfil de {animal.nombre}
        </Button>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary">
            <PawPrint className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-foreground">Historial clínico de {animal.nombre}</h1>
            <p className="text-sm text-muted-foreground">
              {cantidadRegistros} {cantidadRegistros === 1 ? "registro" : "registros"} clínicos hasta el momento.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OPCIONES.map((op) => (
            <Link key={op.href} to={`/animales/${animal.idanimal}/historial/${op.href}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <op.icono className="h-4.5 w-4.5 text-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{op.titulo}</p>
                    <p className="text-sm text-muted-foreground">{op.descripcion}</p>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}