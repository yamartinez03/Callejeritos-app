import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ModuloAnimal from './modulo-animal/pages/ModuloAnimal'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ModuloAnimal />
    </BrowserRouter>
  </StrictMode>,
)
