import { Routes, Route } from "react-router-dom";
import ListaAnimales from "./ListaAnimales";
import CrearAnimal from "./CrearAnimal";
import DetalleAnimal from "./DetalleAnimal";
import EditarAnimal from "./EditarAnimal";

export default function ModuloAnimal() {
  return (
    <Routes>
      <Route path="/animales" element={<ListaAnimales />} />
      <Route path="/animales/nuevo" element={<CrearAnimal />} />
      <Route path="/animales/:id" element={<DetalleAnimal />} />
      <Route path="/animales/:id/editar" element={<EditarAnimal />} />
    </Routes>
  );
}
