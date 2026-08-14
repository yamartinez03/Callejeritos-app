# Callejeritos App
Sistema de gestión integral para la Asociación Callejeritos Villa Elisa, 
una agrupación proteccionista de animales sin fines de lucro con sede en 
Villa Elisa, La Plata. El sistema centraliza la gestión de animales, 
tránsitos, adopciones, avistamientos, inventario, gastos y socios.

## Tecnologías

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **ORM:** Prisma
- **Base de datos:** PostgreSQL

## Estructura del proyecto
```bash
callejeritos-app/
├── frontend/ # React + Vite
└── backend/ # Node.js + Express + Prisma
```

## Convención de ramas (sugerida)

Se sugiere trabajar con ramas por funcionalidad siguiendo este formato:

`feature/nombre-del-modulo`

Ejemplos:
- `feature/modulo-animales`
- `feature/autenticacion`
- `fix/modulo-transito`

### Flujo de trabajo sugerido

1. Siempre partir de main actualizado:
```bash
   git checkout main
   git pull origin main
```
2. Crear tu rama:
```bash
   git checkout -b feature/nombre-del-modulo
```
3. Hacer commits descriptivos:
```bash
   git commit -m "tipo(scope-opcional):descripcion clara de lo que se hizo"
```
4. Subir tu rama:
```bash
   git push origin feature/nombre-del-modulo
```
5. Abrir un Pull Request en GitHub para mergear a main cuando el modulo este completo y funcional.

## UI y estilos

El proyecto usa **Tailwind CSS v4** para estilos y **Shadcn/ui** (Base UI - Nova) como librería de componentes.

### Cómo agregar un componente de Shadcn

Dentro de la carpeta `frontend` ejecutá:

```bash
npx shadcn@latest add nombre-del-componente
```

Ejemplos:
```bash
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add input
```

Los componentes se instalan en `src/components/ui/` y se pueden modificar libremente.

### Cómo usar Tailwind

Usá las clases directamente en el JSX:

```jsx
<div className="bg-white rounded-lg shadow p-4 text-black">
  Contenido
</div>
```
