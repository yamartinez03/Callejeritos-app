import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  PawPrint,
  User,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EliminarAnimalDialog from "../components/EliminarAnimalDialog";
import AnimalNoEncontrado from "@/shared/components/AnimalNoEncontrado";
import {
  ESPECIES,
  getAnimalPorId,
  VETERINARIAS,
} from "@/shared/data/mockAnimales";
import {
  getBadgePrincipal,
  getBadgeSecundaria,
  formatFecha,
  formatSexo,
  formatEdad,
} from "@/lib/animalUtils";

export default function DetalleAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = getAnimalPorId(id);

  if (!animal) {
    return <AnimalNoEncontrado />;
  }

  const especie =
    ESPECIES.find((e) => e.idespecie === animal.idespecie)?.nombre ?? "—";
  const veterinaria = VETERINARIAS.find(
    (v) => v.idresponsable === animal.veterinariaId,
  );
  const badge = getBadgePrincipal(animal);
  const badgeSecundaria = getBadgeSecundaria(animal);

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link to="/animales">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al listado
            </Button>
          </Link>

          <div className="flex gap-2">
            <Link to={`/animales/${animal.idanimal}/editar`}>
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Button>
            </Link>
            <EliminarAnimalDialog
              animal={animal}
              onEliminado={() => navigate("/animales")}
            />
          </div>
        </div>

        {/* Encabezado */}
        <Card className="overflow-hidden py-0">
          <div className="flex flex-col gap-4 bg-muted/40 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-2xl bg-card shadow-sm sm:h-24 sm:w-24">
              <PawPrint
                className="h-10 w-10 text-muted-foreground/60 sm:h-12 sm:w-12"
                strokeWidth={1.5}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
                  {animal.nombre}
                </h1>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}
                >
                  {badge.label}
                </span>
                {badgeSecundaria && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${badgeSecundaria.className}`}
                  >
                    {badgeSecundaria.label}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">
                {especie} · {formatSexo(animal.sexo)} ·{" "}
                {formatEdad(animal.edadestimada)} · {animal.peso} kg ·{" "}
                {animal.castrado ? "Castrado/a" : "Sin castrar"}
                {animal.lactante ? " · Lactante" : ""}
              </p>
              <div className="flex flex-col gap-1 pt-1 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />{" "}
                  {animal.lugarorigen}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" /> Ingreso:{" "}
                  {formatFecha(animal.fechaingreso)}
                </span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Dato label="Color de pelaje" valor={animal.colorpelaje} />
            <Dato label="Peso" valor={`${animal.peso} kg`} />
            <Dato label="Castrado/a" valor={animal.castrado ? "Sí" : "No"} />
            <Dato label="Lactante" valor={animal.lactante ? "Sí" : "No"} />
            <Dato label="Estado" valor={badge.label} />
            <Dato
              label="Fecha de ingreso"
              valor={formatFecha(animal.fechaingreso)}
            />
            <Dato label="Lugar de rescate" valor={animal.lugarorigen} />
            <Dato
              label="Veterinaria asignada"
              valor={veterinaria?.nombre ?? "Sin asignar"}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <User className="h-4.5 w-4.5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {animal.responsable?.tipo === "ADOPTANTE"
                  ? "Adoptante"
                  : "Transitante"}
              </p>
              <p className="truncate font-medium text-foreground">
                {animal.responsable?.nombre ??
                  "Sin transitante/adoptante asignado"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Dato({ label, valor }) {
  return (
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="truncate font-medium text-foreground">{valor}</p>
    </div>
  );
}
