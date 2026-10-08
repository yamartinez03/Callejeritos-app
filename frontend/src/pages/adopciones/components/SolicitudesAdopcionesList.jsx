import { useState } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, PawPrint } from "lucide-react";

const MIS_SOLICITUDES_MOCK = [
  {
    idsolicituda: 1,
    idanimal: 1,
    estado: "PENDIENTE",
    fecha: "2026-10-01",
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
  },
  {
    idsolicituda: 2,
    idanimal: 2,
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
  },
  {
    idsolicituda: 3,
    idanimal: 3,
    estado: "APROBADA",
    fecha: "2026-09-15",
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
  },
  {
    idsolicituda: 4,
    idanimal: 4,
    estado: "RECHAZADA",
    fecha: "2026-09-10",
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
  },
];

const SolicitudesAdopcionesList = () => {
  const [solicitudes, setSolicitudes] = useState(MIS_SOLICITUDES_MOCK);
  const [busqueda, setBusqueda] = useState("");

  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    // Solo mostrar solicitudes rechazadas, pendientes, o aprobadas sin entrega
    if (solicitud.estado === "APROBADA" && solicitud.fechaEntrega) {
      return false; // No mostrar aprobadas con entrega
    }

    // Para rechazadas, solo mostrar si tienen menos de un mes
    if (solicitud.estado === "RECHAZADA") {
      const fechaRechazo = new Date(solicitud.fecha);
      const unMesAtras = new Date();
      unMesAtras.setMonth(unMesAtras.getMonth() - 1);
      if (fechaRechazo < unMesAtras) {
        return false; // No mostrar rechazadas de más de un mes
      }
    }

    // Filtro por búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      return (
        solicitud.animal.nombre?.toLowerCase().includes(busquedaLower) ||
        solicitud.animal.especie?.toLowerCase().includes(busquedaLower)
      );
    }

    return true;
  });

  const getEstadoConfig = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          label: "Pendiente",
        };
      case "APROBADA":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          label: "Aprobada",
        };
      case "RECHAZADA":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle,
          label: "Rechazada",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          label: estado,
        };
    }
  };

  const getEstadoMensaje = (estado, fechaEntrega) => {
    if (estado === "APROBADA") {
      if (fechaEntrega) {
        return `El animal fue entregado el ${fechaEntrega}`;
      }
      return "La organización se pondrá en contacto contigo para coordinar la entrega";
    }
    if (estado === "PENDIENTE") {
      return "Tu solicitud está siendo revisada por el administrador";
    }
    if (estado === "RECHAZADA") {
      return "Lo sentimos, tu solicitud de adopción ha sido rechazada";
    }
    return "";
  };

  return (
    <Card style={{ backgroundColor: "var(--card)" }}>
      <CardHeader>
        <CardTitle style={{ color: "var(--card-foreground)" }}>
          Tus Solicitudes de Adopción
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Lista de solicitudes */}
        {solicitudesFiltradas.length > 0 ? (
          <div className="space-y-4">
            {solicitudesFiltradas.map((solicitud) => {
              const estadoConfig = getEstadoConfig(solicitud.estado);
              const EstadoIcon = estadoConfig.icon;

              return (
                <Card key={solicitud.idsolicituda}>
                  <CardContent className="p-6 mt-6">
                    <div className="flex gap-6 items-start">
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

                      <div className="flex-1 space-y-3">
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
                          <Badge className={estadoConfig.color}>
                            <EstadoIcon className="h-3 w-3 mr-1" />
                            {estadoConfig.label}
                          </Badge>
                        </div>

                        <div
                          className="p-3 rounded-lg text-sm"
                          style={{
                            backgroundColor:
                              solicitud.estado === "APROBADA"
                                ? "#dcfce7"
                                : solicitud.estado === "RECHAZADA"
                                  ? "#fee2e2"
                                  : "#fef9c3",
                            color:
                              solicitud.estado === "APROBADA"
                                ? "#166534"
                                : solicitud.estado === "RECHAZADA"
                                  ? "#991b1b"
                                  : "#854d0e",
                          }}
                        >
                          {getEstadoMensaje(
                            solicitud.estado,
                            solicitud.fechaEntrega,
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Fecha de solicitud:
                            </span>
                            <span className="ml-2">{solicitud.fecha}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {busqueda
                ? "No se encontraron solicitudes que coincidan con la búsqueda."
                : "Aún no has realizado solicitudes de adopción."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolicitudesAdopcionesList;
