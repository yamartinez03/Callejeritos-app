import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, X, Upload, AlertCircle, PawPrint } from "lucide-react";
import SolicitudesAdopcionesList from "./components/SolicitudesAdopcionesList";

const ANIMALES_ADOPTADOS_MOCK = [
  {
    idanimal: 1,
    nombre: "Max",
    especie: "Perro",
    colorpelaje: "Negro y Dorado",
    edadestimada: 3,
    fechaAdopcion: "2026-08-15",
    fotos: [
      {
        idfoto: 6,
        ruta: "https://media.istockphoto.com/id/467923438/photo/silly-dog-tilts-head-in-front-of-barn.jpg?s=612x612&w=0&k=20&c=haPwfoPl_ggvNKAga_Qv4r88qWdcpH-qZ5DaBba6-8U=",
      },
    ],
    proximaVacunacion: "2026-11-15",
  },
  {
    idanimal: 2,
    nombre: "Luna",
    especie: "Gato",
    colorpelaje: "Negro",
    edadestimada: 2,
    fechaAdopcion: "2026-07-20",
    fotos: [
      {
        idfoto: 7,
        ruta: "https://media.istockphoto.com/id/1186954832/photo/little-black-kitten-playing-and-enjoys-with-orange-ball-at-living-room-of-house.jpg?s=612x612&w=0&k=20&c=Qa0SrgHouoEUnsAUj-L-bKeQSQsw769P4cJCPrK6uMk=",
      },
    ],
    proximaVacunacion: null,
  },
];

const ConsultarAdopcionesPage = () => {
  const [animales, setAnimales] = useState(ANIMALES_ADOPTADOS_MOCK);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarSolicitudes, setMostrarSolicitudes] = useState(false);
  const [animalSeleccionadoParaFoto, setAnimalSeleccionadoParaFoto] =
    useState(null);

  const handleVerAnimal = (animal) => {
    alert(`Navegar a la página del animal: ${animal.nombre} (otro módulo)`);
  };

  const handleSubirFoto = (animal) => {
    setAnimalSeleccionadoParaFoto(animal);
  };

  const handleConfirmarSubidaFoto = () => {
    alert("Foto subida exitosamente");
    setAnimalSeleccionadoParaFoto(null);
  };

  const animalesFiltrados = animales.filter((animal) => {
    if (!busqueda) return true;
    const busquedaLower = busqueda.toLowerCase();
    return (
      animal.nombre?.toLowerCase().includes(busquedaLower) ||
      animal.especie?.toLowerCase().includes(busquedaLower)
    );
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Tus Adopciones
          </h1>
          <p className="text-muted-foreground">
            Aquí podrás ver los animales que has adoptado y su seguimiento.
          </p>
        </div>
        <Button
          className="font-semibold"
          onClick={() => setMostrarSolicitudes(!mostrarSolicitudes)}
          variant={mostrarSolicitudes ? "secondary" : "default"}
        >
          {mostrarSolicitudes ? "✕ Ocultar" : " Tus Solicitudes"}
        </Button>
      </div>

      {/* Lista de solicitudes desplegable */}
      {mostrarSolicitudes && (
        <div className="w-full md:w-1/4 md:order-2 md:sticky md:top-6">
          <SolicitudesAdopcionesList />
        </div>
      )}

      {/* Buscador */}
      <div
        className="flex items-center gap-2 border rounded-full px-4 py-1.5 mb-6 w-fit"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--card)",
        }}
      >
        <Search
          className="h-4 w-4 shrink-0"
          style={{ color: "var(--muted-foreground)" }}
        />
        <input
          type="text"
          placeholder="Buscar por animal..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="text-sm bg-transparent outline-none w-48"
          style={{ color: "var(--foreground)" }}
        />
        {busqueda && (
          <button
            onClick={() => setBusqueda("")}
            className="text-xs shrink-0"
            style={{ color: "var(--muted-foreground)" }}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Lista de animales adoptados */}
      {animalesFiltrados.length > 0 ? (
        <div className="space-y-4">
          {animalesFiltrados.map((animal) => (
            <Card key={animal.idanimal}>
              <CardContent className="p-6 mt-6">
                <div className="flex gap-6 items-start">
                  {/* Foto del animal */}
                  <div className="shrink-0 flex flex-col items-center">
                    {animal.fotos && animal.fotos.length > 0 ? (
                      <img
                        src={animal.fotos[0].ruta}
                        alt={animal.nombre}
                        className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleVerAnimal(animal)}
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                        <PawPrint className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Información */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {animal.nombre}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {animal.especie} · {animal.colorpelaje} ·{" "}
                        {animal.edadestimada} años
                      </p>
                    </div>

                    {/* Banner de recordatorio de vacunación */}
                    {animal.proximaVacunacion && (
                      <div
                        className="p-3 rounded-lg flex items-start gap-2"
                        style={{ backgroundColor: "#fef3c7", color: "#92400e" }}
                      >
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">
                            Próxima vacunación
                          </p>
                          <p className="text-xs">
                            Recuerda que {animal.nombre} tiene vacunación
                            programada para el {animal.proximaVacunacion}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Datos adicionales */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Fecha de adopción:
                        </span>
                        <span className="ml-2">{animal.fechaAdopcion}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          ID del animal:
                        </span>
                        <span className="ml-2">#{animal.idanimal}</span>
                      </div>
                    </div>

                    {/* Botón para subir foto */}
                    <div className="pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSubirFoto(animal)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Subir Foto
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        Agradeceríamos ver fotos de {animal.nombre}, pero no es
                        un compromiso
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            {busqueda
              ? "No se encontraron animales que coincidan con la búsqueda."
              : "Aún no has adoptado ningún animal."}
          </p>
        </div>
      )}

      {/* Modal para subir foto */}
      <Dialog
        open={!!animalSeleccionadoParaFoto}
        onOpenChange={() => setAnimalSeleccionadoParaFoto(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subir Foto Post-Adopción</DialogTitle>
          </DialogHeader>
          {animalSeleccionadoParaFoto && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Sube una foto de {animalSeleccionadoParaFoto.nombre} para
                documentar su estado en el nuevo hogar.
              </p>

              <div
                className="border-2 border-dashed rounded-lg p-8 text-center"
                style={{ borderColor: "var(--border)" }}
              >
                <Upload
                  className="h-12 w-12 mx-auto mb-4"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastra una foto aquí o haz clic para seleccionar
                </p>
                <Button variant="outline" size="sm">
                  Seleccionar archivo
                </Button>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setAnimalSeleccionadoParaFoto(null)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleConfirmarSubidaFoto}>Subir Foto</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultarAdopcionesPage;
