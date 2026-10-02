import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, X, Edit } from "lucide-react";

const ConfiguracionFormulariosPage = () => {
  const [formularios, setFormularios] = useState([
    {
      id: 1,
      tipo: "ADOPCION",
      nombre: "Formulario de Adopción",
      ruta: "https://docs.google.com/forms/d/e/1FAIpQLSduzFJZg4xXXQN0_bRjH_LyElLOciNgVSY3Gla34kJwU_IZeQ/viewform?usp=publish-editor",
      activo: false,
    },
    {
      id: 2,
      tipo: "TRANSITO",
      nombre: "Formulario de Tránsito",
      ruta: "",
      activo: false,
    },
  ]);

  const [editandoId, setEditandoId] = useState(null);
  const [nuevaRuta, setNuevaRuta] = useState("");

  const handleEditar = (formulario) => {
    setEditandoId(formulario.id);
    setNuevaRuta(formulario.ruta);
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setNuevaRuta("");
  };

  const handleGuardar = (id) => {
    setFormularios(
      formularios.map((f) => (f.id === id ? { ...f, ruta: nuevaRuta } : f)),
    );
    setEditandoId(null);
    setNuevaRuta("");
    alert("Formulario actualizado correctamente");
  };

  const handleToggleActivo = (id) => {
    setFormularios(
      formularios.map((f) => (f.id === id ? { ...f, activo: !f.activo } : f)),
    );
  };

  const handleAbrirFormulario = (ruta) => {
    if (ruta) {
      window.open(ruta, "_blank");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Configuración de Formularios
      </h1>
      <p className="text-muted-foreground mb-6">
        Gestiona los formularios externos para adopción y tránsito.
      </p>

      <div className="space-y-4">
        {formularios.map((formulario) => (
          <Card
            key={formulario.id}
            className={
              formulario.activo
                ? "border-l-4 border-l-green-500"
                : "border-l-4 border-l-gray-400 opacity-75"
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{formulario.nombre}</CardTitle>
                <Badge
                  className={
                    formulario.activo
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }
                >
                  {formulario.activo ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  URL del Formulario
                </label>
                {editandoId === formulario.id ? (
                  <div className="flex gap-2">
                    <Input
                      value={nuevaRuta}
                      onChange={(e) => setNuevaRuta(e.target.value)}
                      placeholder="https://docs.google.com/forms/..."
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      onClick={() => handleGuardar(formulario.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleCancelar}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Input
                      value={formulario.ruta || "No configurado"}
                      disabled
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEditar(formulario)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {formulario.ruta && (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleAbrirFormulario(formulario.ruta)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Estado:</span>
                  <Button
                    variant={formulario.activo ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleToggleActivo(formulario.id)}
                    className={
                      formulario.activo
                        ? "text-red-600 border-red-200 hover:bg-red-50"
                        : "bg-green-600 hover:bg-green-700"
                    }
                  >
                    {formulario.activo ? "Desactivar" : "Activar"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConfiguracionFormulariosPage;
