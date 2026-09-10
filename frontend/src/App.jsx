import { Route, Routes } from "react-router-dom";
import ListaAnimales from "./modulo-animal/pages/ListaAnimales";
import CrearAnimal from "./modulo-animal/pages/CrearAnimal";
import DetalleAnimal from "./modulo-animal/pages/DetalleAnimal";
import EditarAnimal from "./modulo-animal/pages/EditarAnimal";
import GestionarHistorialClinico from "./modulo-historial-clinico/pages/GestionarHistorialClinico";
import RegistrarDesparasitacion from "./modulo-historial-clinico/pages/RegistrarDesparasitacion";
import RegistrarEstudio from "./modulo-historial-clinico/pages/RegistrarEstudio";
import RegistrarTratamiento from "./modulo-historial-clinico/pages/RegistrarTratamiento";
import RegistrarVacunacion from "./modulo-historial-clinico/pages/RegistrarVacunacion";
import RegistrarAtencionVeterinaria from "./modulo-historial-clinico/pages/RegistrarAtencionVeterinaria";
import ConsultarHistorialClinico from "./modulo-historial-clinico/pages/ConsultarHistorialClinico";
import ModificarHistorialClinico from "./modulo-historial-clinico/pages/ModificarHistorialClinico";

function App() {
  return (
    <Routes>
      <Route path="/animales" element={<ListaAnimales />} />
      <Route path="/animales/nuevo" element={<CrearAnimal />} />
      <Route path="/animales/:id" element={<DetalleAnimal />} />
      <Route path="/animales/:id/editar" element={<EditarAnimal />} />
      <Route
        path="/animales/:id/historial"
        element={<GestionarHistorialClinico />}
      />
      <Route
        path="/animales/:id/historial/atencion"
        element={<RegistrarAtencionVeterinaria />}
      />
      <Route
        path="/animales/:id/historial/vacunacion"
        element={<RegistrarVacunacion />}
      />
      <Route
        path="/animales/:id/historial/desparasitacion"
        element={<RegistrarDesparasitacion />}
      />
      <Route
        path="/animales/:id/historial/estudio"
        element={<RegistrarEstudio />}
      />
      <Route
        path="/animales/:id/historial/tratamiento"
        element={<RegistrarTratamiento />}
      />
      <Route
        path="/animales/:id/historial/consultar"
        element={<ConsultarHistorialClinico />}
      />
      <Route
        path="/animales/:id/historial/modificar"
        element={<ModificarHistorialClinico />}
      />
    </Routes>
  );
}

export default App;
