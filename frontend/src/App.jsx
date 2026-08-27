import { Routes, Route } from "react-router-dom";
import PublicacionesPage from "./pages/publicaciones/PublicacionesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicacionesPage />} />
    </Routes>
  );
}

export default App;
