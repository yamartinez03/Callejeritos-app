import { Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import InventarioPage from './pages/inventario/InventarioPage'

function Inicio() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <h1 className="text-lg font-bold text-gray-900">Callejeritos Villa Elisa</h1>
        </div>
        <Button>Iniciar sesión</Button>
      </nav>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-black mb-2">Bienvenido al sistema</h2>
        <p className="text-gray-500 mb-8">Gestión integral de animales, tránsitos y adopciones.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => navigate('/inventario')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-pointer hover:border-gray-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-black">Inventario</h3>
              <Badge variant="destructive">Stock bajo</Badge>
            </div>
            <p className="text-sm text-gray-500">Control de medicamentos, alimentos e insumos.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inventario" element={<InventarioPage />} />
    </Routes>
  )
}

export default App