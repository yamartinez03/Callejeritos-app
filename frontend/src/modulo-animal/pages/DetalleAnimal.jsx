import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, PawPrint, Stethoscope, Receipt, User, MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EliminarAnimalDialog from "../components/EliminarAnimalDialog";
import {
  ESPECIES,
  getAnimalPorId,
  HISTORIAL_CLINICO_MOCK,
  GASTOS_MOCK,
  VETERINARIAS,
} from "@/shared/data/mockAnimales";
import {
  getBadgePrincipal,
  getBadgeSecundaria,
  formatMoneda,
  formatFecha,
  formatSexo,
  formatEdad,
} from "@/lib/animalUtils";

const TIPO_ATENCION_LABEL = {
  VACUNA: "Vacuna",
  DESPARASITACION: "Desparasitación",
  ESTUDIO: "Estudio",
  TRATAMIENTO: "Tratamiento",
};

export default function DetalleAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = getAnimalPorId(id);
  const [tab, setTab] = useState("general");

  if (!animal) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4 text-center">
        <p className="text-muted-foreground">No se encontró un animal con ese identificador.</p>
        <Button asChild variant="outline">
          <Link to="/animales">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Volver al listado
          </Link>
        </Button>
      </div>
    );
  }

  const especie = ESPECIES.find((e) => e.idespecie === animal.idespecie)?.nombre ?? "—";
  const veterinaria = VETERINARIAS.find((v) => v.idresponsable === animal.veterinariaId);
  const historial = HISTORIAL_CLINICO_MOCK[animal.idanimal] ?? [];
  const gastos = GASTOS_MOCK[animal.idanimal] ?? [];
  const badge = getBadgePrincipal(animal);
  const badgeSecundaria = getBadgeSecundaria(animal);

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <Link to="/animales">
              <ArrowLeft className="h-4 w-4" />
              Volver al listado
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link to={`/animales/${animal.idanimal}/editar`}>
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Link>
            </Button>
            <EliminarAnimalDialog animal={animal} onEliminado={() => navigate("/animales")} />
          </div>
        </div>

        {/* Encabezado */}
        <Card className="overflow-hidden py-0">
          <div className="flex flex-col gap-4 bg-muted/40 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-2xl bg-card shadow-sm sm:h-24 sm:w-24">
              <PawPrint className="h-10 w-10 text-muted-foreground/60 sm:h-12 sm:w-12" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold text-foreground sm:text-2xl">{animal.nombre}</h1>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}>
                  {badge.label}
                </span>
                {badgeSecundaria && (
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeSecundaria.className}`}>
                    {badgeSecundaria.label}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">
                {especie} · {formatSexo(animal.sexo)} · {formatEdad(animal.edadestimada)} · {animal.peso} kg ·{" "}
                {animal.castrado ? "Castrado/a" : "Sin castrar"}
                {animal.lactante ? " · Lactante" : ""}
              </p>
              <div className="flex flex-col gap-1 pt-1 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> {animal.lugarorigen}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" /> Ingreso: {formatFecha(animal.fechaingreso)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs de contenido */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
            <TabsTrigger value="general">Información general</TabsTrigger>
            <TabsTrigger value="clinico">Historial clínico</TabsTrigger>
            <TabsTrigger value="gastos">Gastos</TabsTrigger>
          </TabsList>

          {/* Información general */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Dato label="Color de pelaje" valor={animal.colorpelaje} />
                <Dato label="Peso" valor={`${animal.peso} kg`} />
                <Dato label="Castrado/a" valor={animal.castrado ? "Sí" : "No"} />
                <Dato label="Lactante" valor={animal.lactante ? "Sí" : "No"} />
                <Dato label="Estado" valor={badge.label} />
                <Dato label="Fecha de ingreso" valor={formatFecha(animal.fechaingreso)} />
                <Dato label="Lugar de rescate" valor={animal.lugarorigen} />
                <Dato label="Veterinaria asignada" valor={veterinaria?.nombre ?? "Sin asignar"} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <User className="h-4.5 w-4.5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {animal.responsable?.tipo === "ADOPTANTE" ? "Adoptante" : "Transitante"}
                  </p>
                  <p className="truncate font-medium text-foreground">
                    {animal.responsable?.nombre ?? "Sin transitante/adoptante asignado"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Historial clínico */}
          <TabsContent value="clinico" className="space-y-3">
            {historial.length === 0 ? (
              <EstadoVacio icono={Stethoscope} texto="Todavía no hay registros clínicos para este animal." />
            ) : (
              historial.map((registro) => (
                <Card key={registro.idhistorial}>
                  <CardContent className="flex items-start gap-3">
                    <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-500" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                        <span className="font-medium text-foreground">
                          {TIPO_ATENCION_LABEL[registro.tipo] ?? registro.tipo}
                        </span>
                        <span className="text-xs text-muted-foreground">{formatFecha(registro.fecha)}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{registro.descripcion}</p>
                      <p className="mt-1 text-xs text-muted-foreground/80">Responsable: {registro.responsable}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Gastos */}
          <TabsContent value="gastos" className="space-y-3">
            {gastos.length === 0 ? (
              <EstadoVacio icono={Receipt} texto="Todavía no hay gastos registrados para este animal." />
            ) : (
              <>
                {gastos.map((gasto) => (
                  <Card key={gasto.idgasto}>
                    <CardContent className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{gasto.descripcion}</p>
                        <p className="text-xs text-muted-foreground">
                          {gasto.tipo} · {formatFecha(gasto.fecha)}
                        </p>
                      </div>
                      <span className="shrink-0 font-semibold text-destructive">{formatMoneda(gasto.monto)}</span>
                    </CardContent>
                  </Card>
                ))}
                <Card className="border-border bg-muted/40">
                  <CardContent className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Costo total</span>
                    <span className="text-lg font-semibold text-destructive">{formatMoneda(animal.costoTotal)}</span>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Dato({ label, valor }) {
  return (
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="truncate font-medium text-foreground">{valor}</p>
    </div>
  );
}

function EstadoVacio({ icono: Icono, texto }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 py-12 text-center text-muted-foreground">
      <Icono className="h-6 w-6 text-muted-foreground/60" />
      <p>{texto}</p>
    </div>
  );
}