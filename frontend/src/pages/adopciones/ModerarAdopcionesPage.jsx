import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, X, ExternalLink, Check, X as XIcon, User, Calendar, PawPrint } from "lucide-react";

const SOLICITUDES_MOCK = [
  {
    idsolicituda: 1,
    idanimal: 1,
    idsolicitante: 10,
    estado: "PENDIENTE",
    fecha: "2026-10-01",
    fechaEntrega: null,
    animal: {
      idanimal: 1,
      nombre: "Max",
      especie: "Perro",
      colorpelaje: "Negro y Dorado",
      edadestimada: 3,
      fotos: [
        {
          idfoto: 6,
          ruta: "https://media.istockphoto.com/id/467923438/photo/silly-dog-tilts-head-in-front-of-barn.jpg?s=612x612&w=0&k=20&c=haPwfoPl_ggvNKAga_Qv4r88qWdcpH-qZ5DaBba6-8U=",
        },
      ],
    },
    solicitante: {
      idpersona: 10,
      nombre: "María García",
      email: "maria.garcia@email.com",
      telefono: "2215551234",
      dni: 32123456,
      fechanac: "1990-05-15",
      direccion: "Calle 123, La Plata",
      fotoPerfil:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      historial: [
        {
          tipo: "TRANSITO",
          animal: "Firulais",
          fecha: "2025-08-10",
          estado: "FINALIZADO",
          fotoAnimal:
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop",
        },
      ],
    },
  },
  {
    idsolicituda: 2,
    idanimal: 2,
    idsolicitante: 11,
    estado: "APROBADA",
    fecha: "2026-09-28",
    fechaEntrega: null,
    animal: {
      idanimal: 2,
      nombre: "Luna",
      especie: "Gato",
      colorpelaje: "Negro",
      edadestimada: 2,
      fotos: [
        {
          idfoto: 7,
          ruta: "https://media.istockphoto.com/id/1186954832/photo/little-black-kitten-playing-and-enjoys-with-orange-ball-at-living-room-of-house.jpg?s=612x612&w=0&k=20&c=Qa0SrgHouoEUnsAUj-L-bKeQSQsw769P4cJCPrK6uMk=",
        },
      ],
    },
    solicitante: {
      idpersona: 11,
      nombre: "Juan Pérez",
      email: "juan.perez@email.com",
      telefono: "2215555678",
      dni: 32123457,
      fechanac: "1985-03-20",
      direccion: "Av. 7 500, La Plata",
      fotoPerfil:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      historial: [
        {
          tipo: "ADOPCION",
          animal: "Rocky",
          fecha: "2024-06-15",
          estado: "APROBADA",
          fotoAnimal:
            "https://images.unsplash.com/photo-1583511655857-d19b1a7e5f12?w=150&h=150&fit=crop",
        },
      ],
    },
  },
  {
    idsolicituda: 3,
    idanimal: 3,
    idsolicitante: 12,
    estado: "APROBADA",
    fecha: "2026-09-25",
    fechaEntrega: "2026-10-05",
    animal: {
      idanimal: 3,
      nombre: "Rocky",
      especie: "Perro",
      colorpelaje: "Gris",
      edadestimada: 5,
      fotos: [
        {
          idfoto: 8,
          ruta: "https://media.istockphoto.com/id/2202652356/photo/a-dog-with-sad-eyes.jpg?s=612x612&w=0&k=20&c=6EPYK_oMWFRXfsSUocs0XyVRmTIy9FBuy5O6QDfEPNI=",
        },
      ],
    },
    solicitante: {
      idpersona: 12,
      nombre: "Ana López",
      email: "ana.lopez@email.com",
      telefono: "2215559012",
      dni: 32123458,
      fechanac: "1992-11-08",
      direccion: "Calle 44 200, La Plata",
      fotoPerfil:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      historial: [],
    },
  },
  {
    idsolicituda: 4,
    idanimal: 4,
    idsolicitante: 13,
    estado: "RECHAZADA",
    fecha: "2026-09-20",
    fechaEntrega: null,
    animal: {
      idanimal: 4,
      nombre: "Firulais",
      especie: "Perro",
      colorpelaje: "Marrón",
      edadestimada: 4,
      fotos: [
        {
          idfoto: 9,
          ruta: "https://media.istockphoto.com/id/1587300003388-59208cc962cb?w=150&h=150&fit=crop",
        },
      ],
    },
    solicitante: {
      idpersona: 13,
      nombre: "Carlos Ruiz",
      email: "carlos.ruiz@email.com",
      telefono: "2215553456",
      dni: 32123459,
      fechanac: "1988-07-22",
      direccion: "Calle 50 300, La Plata",
      fotoPerfil:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      historial: [],
    },
  },
];

const ModerarAdopcionesPage = () => {
  const [solicitudes, setSolicitudes] = useState(SOLICITUDES_MOCK);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [solicitudParaEntrega, setSolicitudParaEntrega] = useState(null);

  const handleAprobar = (idsolicituda) => {
    setSolicitudes(
      solicitudes.map((s) =>
        s.idsolicituda === idsolicituda ? { ...s, estado: "APROBADA" } : s,
      ),
    );
    alert("Solicitud aprobada");
  };

  const handleRechazar = (idsolicituda) => {
    setSolicitudes(
      solicitudes.map((s) =>
        s.idsolicituda === idsolicituda ? { ...s, estado: "RECHAZADA" } : s,
      ),
    );
    alert("Solicitud rechazada");
  };

  const handleVerFormulario = (solicitud) => {
    alert("Ver respuestas del formulario (link del backend a implementar)");
  };

  const handleVerUsuario = (solicitante) => {
    setUsuarioSeleccionado(solicitante);
  };

  const handleRegistrarEntrega = (solicitud) => {
    setSolicitudParaEntrega(solicitud);
  };

  const handleConfirmarEntrega = () => {
    setSolicitudes(
      solicitudes.map((s) =>
        s.idsolicituda === solicitudParaEntrega.idsolicituda
          ? { ...s, fechaEntrega: new Date().toISOString().split('T')[0] }
          : s,
      ),
    );
    alert("Fecha de entrega registrada");
    setSolicitudParaEntrega(null);
  };

  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    // Filtro por estado
    if (filtroEstado !== "TODOS" && solicitud.estado !== filtroEstado) {
      return false;
    }

    // Filtro por búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      return (
        solicitud.animal.nombre?.toLowerCase().includes(busquedaLower) ||
        solicitud.solicitante.nombre?.toLowerCase().includes(busquedaLower) ||
        solicitud.solicitante.email?.toLowerCase().includes(busquedaLower)
      );
    }

    return true;
  });

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "APROBADA":
        return "bg-green-100 text-green-800 border-green-200";
      case "RECHAZADA":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Moderar Adopciones
      </h1>
      <p className="text-muted-foreground mb-6">
        Gestiona las solicitudes de adopción pendientes de aprobación.
      </p>

      {/* Filtros y buscador */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Filtros de estado */}
        <div className="flex gap-2 flex-wrap">
          {[
            { valor: "TODOS", etiqueta: "Todos" },
            { valor: "PENDIENTE", etiqueta: "Pendiente" },
            { valor: "APROBADA", etiqueta: "Aprobada" },
            { valor: "RECHAZADA", etiqueta: "Rechazada" },
          ].map((f) => (
            <button
              key={f.valor}
              onClick={() => setFiltroEstado(f.valor)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
              style={{
                backgroundColor:
                  filtroEstado === f.valor ? "var(--primary)" : "transparent",
                color:
                  filtroEstado === f.valor
                    ? "var(--primary-foreground)"
                    : "var(--foreground)",
                borderColor: "var(--border)",
              }}
            >
              {f.etiqueta}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div
          className="flex items-center gap-2 border rounded-full px-4 py-1.5 ml-auto"
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
            placeholder="Buscar por animal o solicitante..."
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
      </div>

      {/* Lista de solicitudes */}
      {solicitudesFiltradas.length > 0 ? (
        <div className="space-y-4">
          {solicitudesFiltradas.map((solicitud) => (
            <Card key={solicitud.idsolicituda}>
              <CardContent className="p-5 mt-5">
                <div className="flex gap-6 items-start">
                  {/* Foto del animal */}
                  <div className="shrink-0 flex flex-col items-center">
                    {solicitud.animal.fotos &&
                    solicitud.animal.fotos.length > 0 ? (
                      <img
                        src={solicitud.animal.fotos[0].ruta}
                        alt={solicitud.animal.nombre}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                        <PawPrint className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Información */}
                  <div className="flex-1 space-y-3">
                    {/* Header con estado */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {solicitud.animal.nombre}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {solicitud.animal.especie} ·{" "}
                          {solicitud.animal.colorpelaje} ·{" "}
                          {solicitud.animal.edadestimada} años
                        </p>
                      </div>
                      <Badge className={getEstadoColor(solicitud.estado)}>
                        {solicitud.estado.charAt(0) +
                          solicitud.estado.slice(1).toLowerCase()}
                      </Badge>
                    </div>

                    {/* Datos del solicitante */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Solicitante:
                        </span>
                        <span className="ml-2 font-medium">
                          {solicitud.solicitante.nombre}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <span className="ml-2">
                          {solicitud.solicitante.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Teléfono:</span>
                        <span className="ml-2">
                          {solicitud.solicitante.telefono}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fecha:</span>
                        <span className="ml-2">{solicitud.fecha}</span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-2 pt-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerFormulario(solicitud)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Formulario
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerUsuario(solicitud.solicitante)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Ver Usuario
                      </Button>
                      {solicitud.estado === "PENDIENTE" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleAprobar(solicitud.idsolicituda)
                            }
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Aprobar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleRechazar(solicitud.idsolicituda)
                            }
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <XIcon className="h-4 w-4 mr-2" />
                            Rechazar
                          </Button>
                        </>
                      )}
                      {solicitud.estado === "APROBADA" && !solicitud.fechaEntrega && (
                        <Button
                          size="sm"
                          onClick={() => handleRegistrarEntrega(solicitud)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Registrar Entrega
                        </Button>
                      )}
                      {solicitud.estado === "APROBADA" && solicitud.fechaEntrega && (
                        <Badge className="bg-purple-100 text-purple-800">
                          Entregado el {solicitud.fechaEntrega}
                        </Badge>
                      )}
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
              ? "No se encontraron solicitudes que coincidan con la búsqueda."
              : "No hay solicitudes de adopción para moderar."}
          </p>
        </div>
      )}

      {/* Modal de usuario */}
      <Dialog
        open={!!usuarioSeleccionado}
        onOpenChange={() => setUsuarioSeleccionado(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Información del Usuario</DialogTitle>
          </DialogHeader>
          {usuarioSeleccionado && (
            <div className="space-y-4">
              {/* Header con foto de perfil */}
              <div
                className="flex items-center gap-4 pb-4 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                {usuarioSeleccionado.fotoPerfil ? (
                  <img
                    src={usuarioSeleccionado.fotoPerfil}
                    alt={usuarioSeleccionado.nombre}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
                    👤
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">
                    {usuarioSeleccionado.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {usuarioSeleccionado.email}
                  </p>
                </div>
              </div>

              {/* Datos personales */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">DNI:</span>
                  <p className="font-medium">{usuarioSeleccionado.dni}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Teléfono:
                  </span>
                  <p className="font-medium">{usuarioSeleccionado.telefono}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Fecha de Nacimiento:
                  </span>
                  <p className="font-medium">{usuarioSeleccionado.fechanac}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Dirección:
                  </span>
                  <p className="font-medium">{usuarioSeleccionado.direccion}</p>
                </div>
              </div>

              {/* Historial */}
              <div>
                <h4 className="font-semibold mb-3">Historial</h4>
                {usuarioSeleccionado.historial &&
                usuarioSeleccionado.historial.length > 0 ? (
                  <div className="space-y-3">
                    {usuarioSeleccionado.historial.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg flex gap-4"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {/* Foto del animal */}
                        {item.fotoAnimal ? (
                          <img
                            src={item.fotoAnimal}
                            alt={item.animal}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                            <PawPrint className="h-6 w-6 text-gray-400" />
                          </div>
                        )}

                        {/* Información */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{item.tipo}</p>
                              <p className="text-sm text-muted-foreground">
                                Animal: {item.animal}
                              </p>
                            </div>
                            <Badge
                              className={
                                item.estado === "APROBADA" ||
                                item.estado === "FINALIZADO"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {item.estado}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Fecha: {item.fecha}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Sin historial de adopciones o tránsitos.
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para registrar fecha de entrega */}
      <Dialog open={!!solicitudParaEntrega} onOpenChange={() => setSolicitudParaEntrega(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Fecha de Entrega</DialogTitle>
          </DialogHeader>
          {solicitudParaEntrega && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿Confirmas que el animal <strong>{solicitudParaEntrega.animal.nombre}</strong> ha sido entregado a {solicitudParaEntrega.solicitante.nombre}?
              </p>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSolicitudParaEntrega(null)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleConfirmarEntrega}>
                  Confirmar Entrega
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModerarAdopcionesPage;
