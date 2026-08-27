import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PublicacionCard = ({ item }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Normalizar datos: maneja tanto publicaciones como objetos del mock ANIMALES
  const tipo = item.tipoPublicacion || item.estado;
  const descripcion = item.descripcion;
  const fecha = item.fecha || item.fechaingreso;
  const ubicacion = item.zona || item.lugarorigen;
  const fotos = item.fotos || [];

  // Extraer datos del animal (ya sea desde animalData o directamente del item)
  const animalData = item.animalData || (item.idanimal ? item : null);
  const esAnimalDetallado = tipo === "EN_ADOPCION" || tipo === "EN_TRANSITO";

  const getTipoColor = (tipoEstado) => {
    switch (tipoEstado) {
      case "PERDIDO":
        return "bg-red-100 text-red-800";
      case "ENCONTRADO":
        return "bg-green-100 text-green-800";
      case "AVISTAMIENTO":
        return "bg-blue-100 text-blue-800";
      case "EN_ADOPCION":
        return "bg-orange-100 text-orange-800";
      case "EN_TRANSITO":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipoLabel = (tipoEstado) => {
    switch (tipoEstado) {
      case "PERDIDO":
        return "Perdido";
      case "ENCONTRADO":
        return "Encontrado";
      case "AVISTAMIENTO":
        return "Avistamiento";
      case "EN_ADOPCION":
        return "En Adopción";
      case "EN_TRANSITO":
        return "En Adopción";
      default:
        return tipoEstado;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleNextPhoto = () => {
    if (fotos.length > 0 && currentPhotoIndex < fotos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const hasPhotos = fotos.length > 0;
  const multiplePhotos = fotos.length > 1;

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-0">
        {/* Badge de tipo */}
        <div className="flex justify-end items-center gap-2 py-3">
          <Badge className={getTipoColor(tipo)}>{getTipoLabel(tipo)}</Badge>
        </div>

        {/* Carrusel de fotos */}
        {hasPhotos && (
          <div className="relative">
            <div className="relative aspect-square">
              <img
                src={fotos[currentPhotoIndex]?.ruta}
                alt={`Foto ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {multiplePhotos && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    disabled={currentPhotoIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    disabled={currentPhotoIndex === fotos.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {currentPhotoIndex + 1} / {fotos.length}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Contenido de la tarjeta */}
        <div className="p-4 space-y-3">
          {/* Muestra ficha del animal si está en adopción/tránsito */}
          {esAnimalDetallado && animalData ? (
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {animalData.nombre}
                </h3>
                <span className="text-sm text-gray-600">
                  - {animalData.especie}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div>
                  <span className="text-gray-500">Sexo:</span>
                  <span className="ml-1 text-gray-700">{animalData.sexo}</span>
                </div>
                <div>
                  <span className="text-gray-500">Edad:</span>
                  <span className="ml-1 text-gray-700">
                    {animalData.edadestimada} años
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Peso:</span>
                  <span className="ml-1 text-gray-700">
                    {animalData.peso} kg
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Castrado:</span>
                  <span className="ml-1 text-gray-700">
                    {animalData.castrado ? "Sí" : "No"}
                  </span>
                </div>
              </div>

              <div className="text-sm mt-1">
                <span className="text-gray-500">Color:</span>
                <span className="ml-1 text-gray-700">
                  {animalData.colorpelaje}
                </span>
              </div>

              {animalData.lactante && (
                <div className="mt-2">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Lactante
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            /* Vista regular para PERDIDO / ENCONTRADO / AVISTAMIENTO */
            descripcion && <p className="text-gray-700">{descripcion}</p>
          )}

          {/* Ubicación y Fecha unificadas */}
          {ubicacion && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Ubicación:</span>
              <span>{ubicacion}</span>
            </div>
          )}

          {fecha && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">
                {item.idanimal ? "Ingreso:" : "Fecha:"}
              </span>
              <span>{formatDate(fecha)}</span>
            </div>
          )}

          {item.resuelto && (
            <Badge className="bg-purple-100 text-purple-800">
              Caso Resuelto
            </Badge>
          )}

          {/* Contacto de visitante solo en publicaciones regulares */}
          {!esAnimalDetallado &&
            (item.nombreVisitante ||
              item.emailVisitante ||
              item.telefonoVisitante) && (
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Contacto:
                </p>
                {item.nombreVisitante && (
                  <p className="text-sm text-gray-600">
                    {item.nombreVisitante}
                  </p>
                )}
                {item.emailVisitante && (
                  <p className="text-sm text-gray-600">{item.emailVisitante}</p>
                )}
                {item.telefonoVisitante && (
                  <p className="text-sm text-gray-600">
                    {item.telefonoVisitante}
                  </p>
                )}
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicacionCard;
