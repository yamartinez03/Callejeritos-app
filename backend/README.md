# Callejeritos: Backend

## Desarrollo local

```bash
cd backend
pnpm install
cp .env.example .env
```
Y completá la URL de conexión a la base local:

```text
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```
> ***IMPORTANTE:*** para la contraseña, los caracteres especiales tienen que ser codificados con porcentajes, por ejemplo el signo de exclamación ! es %21. Si no se codifican la migración tira una excepción.


> Asegurarse de tener PostgreSQL corriendo localmente y de que la base de datos (`mydb` en el ejemplo) ya exista, o crearla antes de continuar.

```bash
npx prisma generate # Genera el cliente local
npx prisma migrate dev # Aplica las migraciones
npx prisma studio # Comprueba la conexión
pnpm tsx prisma/seed.js # Corre el seed que inserta datos de prueba, agregar --reset para borrar y volver a cargar los animales
pnpm dev # Levanta el servidor en http://localhost:3000
```
