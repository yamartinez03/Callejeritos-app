import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CrearPublicacionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    tipoPublicacion: "PERDIDO",
    descripcion: "",
    zona: "",
    fecha: new Date().toISOString().split("T")[0],
    nombreVisitante: "",
    emailVisitante: "",
    telefonoVisitante: "",
  });

  // Estado para manejar hasta 3 imágenes subidas
  const [fotos, setFotos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: al menos un contacto es requerido para visitantes
    if (!formData.emailVisitante && !formData.telefonoVisitante) {
      alert("Por favor, proporciona al menos un email o teléfono de contacto");
      return;
    }

    // Se envían los datos junto con las imágenes
    onSubmit({ ...formData, fotos });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejador para cargar fotos (Máximo 3)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (fotos.length + files.length > 3) {
      alert("Solo puedes subir un máximo de 3 fotos por publicación.");
      return;
    }

    // Creamos las vistas previas locales con URL.createObjectURL
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFotos((prevFotos) => [...prevFotos, ...newPhotos]);
    e.target.value = ""; // Reiniciar input de archivo
  };

  // Remover foto de la lista
  const handleRemovePhoto = (index) => {
    setFotos((prevFotos) => {
      const updated = [...prevFotos];
      URL.revokeObjectURL(updated[index].preview); // Libera memoria de la preview
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Crear Nueva Publicación</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo de Publicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Publicación
            </label>
            <Select
              name="tipoPublicacion"
              value={formData.tipoPublicacion}
              onChange={handleChange}
              className="w-full"
            >
              <option value="PERDIDO">Perdido</option>
              <option value="ENCONTRADO">Encontrado</option>
              <option value="AVISTAMIENTO">Avistamiento</option>
            </Select>
          </div>

          {/* Subida de Imágenes */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fotos del animal
            </label>

            <label
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                fotos.length >= 3
                  ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                  : fotos.length > 0
                    ? "bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100 cursor-pointer"
                    : "bg-gray-700 text-white border-gray-300 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
              }`}
            >
              {"Adjuntar fotos "}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={fotos.length >= 3}
                className="hidden"
              />
            </label>

            {/* Texto dinámico que cambia de estado */}
            <div className="mt-2 text-xs">
              {fotos.length === 0 ? (
                <p className="text-gray-500">
                  Ninguna foto seleccionada aún (máx. 3).
                </p>
              ) : fotos.length >= 3 ? (
                <p className="text-amber-600 font-medium">
                  ✓ Haz alcanzado el límite máximo de 3 fotos.
                </p>
              ) : (
                <p className="text-green-600 font-medium">
                  ✓ {fotos.length}{" "}
                  {fotos.length === 1 ? "foto cargada" : "fotos cargadas"}.
                  Puedes agregar {3 - fotos.length} más.
                </p>
              )}
            </div>

            {/* Previsualización de imágenes */}
            {fotos.length > 0 && (
              <div className="flex gap-3 mt-3">
                {fotos.map((foto, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border rounded-lg overflow-hidden group"
                  >
                    <img
                      src={foto.preview}
                      alt={`Previsualización ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <Textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe al animal, características, etc..."
              rows={4}
              required
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">Máximo 500 caracteres</p>
          </div>

          {/* Zona */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zona / Ubicación
            </label>
            <Input
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              placeholder="Ej: Calle 1 entre 44 y 45, La Plata"
              required
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">Máximo 100 caracteres</p>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <Input
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>

          {/* Datos de contacto del visitante */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Datos de Contacto
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Al menos un campo de contacto es requerido (email o teléfono)
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre (opcional)
                </label>
                <Input
                  name="nombreVisitante"
                  value={formData.nombreVisitante}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  maxLength={150}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  name="emailVisitante"
                  type="email"
                  value={formData.emailVisitante}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <Input
                  name="telefonoVisitante"
                  type="tel"
                  value={formData.telefonoVisitante}
                  onChange={handleChange}
                  placeholder="221 123-4567"
                  maxLength={20}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Publicar
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CrearPublicacionForm;
