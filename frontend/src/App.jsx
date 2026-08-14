import { Button } from './components/ui/button'

function App() {
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

      </main>
    </div>
  )
}

export default App