import { Link } from "react-router-dom";
import {
  PawPrint,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EliminarAnimalDialog from "./EliminarAnimalDialog";
import {
  getBadgePrincipal,
  getBadgeSecundaria,
  formatMoneda,
  formatSexo,
  formatEdad,
} from "@/lib/animalUtils";
import { ESPECIES } from "@/shared/data/mockAnimales";

function nombreEspecie(idespecie) {
  return (
    ESPECIES.find((e) => e.idespecie === idespecie)?.nombre ?? "Sin especificar"
  );
}

/** onEliminado: callback opcional para que el listado se refresque tras borrar (ver ListaAnimales.jsx). */
export default function AnimalCard({ animal, onEliminado }) {
  const badge = getBadgePrincipal(animal);
  const badgeSecundaria = getBadgeSecundaria(animal);

  return (
    <Card className="flex h-full flex-col overflow-hidden py-0 transition-shadow hover:shadow-md">
      {/* Ilustración */}
      <div className="relative flex h-32 shrink-0 items-center justify-center bg-muted sm:h-36">
        <PawPrint
          className="h-12 w-12 text-muted-foreground/50 sm:h-14 sm:w-14"
          strokeWidth={1.5}
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium leading-none ${badge.className}`}
        >
          {badge.label}
        </span>

        {/* Acciones rápidas */}
        <div className="absolute left-2 top-2 flex gap-1">
          <Button
            asChild
            size="icon"
            variant="secondary"
            className="h-7 w-7 rounded-full shadow-sm"
            aria-label={`Editar a ${animal.nombre}`}
          >
            <Link to={`/animales/${animal.idanimal}/editar`}>
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <EliminarAnimalDialog
            animal={animal}
            onEliminado={onEliminado}
            trigger={
              <Button
                size="icon"
                variant="secondary"
                className="h-7 w-7 rounded-full text-destructive shadow-sm hover:text-destructive"
                aria-label={`Eliminar a ${animal.nombre}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            }
          />
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold text-card-foreground">
            {animal.nombre}
          </h3>
          <p className="text-sm text-muted-foreground">
            {nombreEspecie(animal.idespecie)} · {formatSexo(animal.sexo)} ·{" "}
            {formatEdad(animal.edadestimada)} ·{" "}
            {animal.castrado ? "Castrado/a" : "Sin castrar"}
          </p>
        </div>

        {animal.responsable && (
          <p className="text-sm font-medium text-card-foreground">
            {animal.responsable.nombre}
          </p>
        )}

        {animal.alertasMedicas?.length > 0 && (
          <ul className="space-y-1">
            {animal.alertasMedicas.map((alerta, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs">
                {alerta.vencida ? (
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-500" />
                )}
                <span
                  className={
                    alerta.vencida
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  {alerta.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        {badgeSecundaria && (
          <span
            className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-[11px] font-medium ${badgeSecundaria.className}`}
          >
            {badgeSecundaria.label}
          </span>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Costo total
            </p>
            <p className="truncate text-sm font-semibold text-destructive">
              {formatMoneda(animal.costoTotal)}
            </p>
          </div>
          <Link to={`/animales/${animal.idanimal}`}>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="shrink-0 gap-1"
            >
              Ver perfil <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
