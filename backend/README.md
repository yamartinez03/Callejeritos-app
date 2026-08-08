# Guía rápida: Clonar el repositorio y migrar la base de datos con Prisma

Prisma **ya está configurado** (schema y migraciones incluidos) y se debe conectar a tu base de datos PostgreSQL local.

> Solo hay que instalar, configurar la conexión y aplicar las migraciones.

---

## 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd <nombre-del-repo>
```

---

## 2. Instalar dependencias

```bash
npm install
```

Esto instala `prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg`, etc.

---

## 3. Crear el archivo `.env` local

El `.env` **no se sube al repositorio** (está en `.gitignore`), así que hay que crearlo manualmente. Copiá el example.env:

```bash
cp example.env .env
```

Y completá la URL de conexión a la base local:

```text
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```
> ***IMPORTANTE:*** para la contraseña, los caracteres especiales tienen que ser codificados con porcentajes, por ejemplo el signo de exclamación ! es %21. Si no se codifican la migración tira una excepción.


> Asegurarse de tener PostgreSQL corriendo localmente y de que la base de datos (`mydb` en el ejemplo) ya exista, o crearla antes de continuar.

---

## 4. Generar Prisma Client

```bash
npx prisma generate
```

Esto genera el cliente type-safe en base al `schema.prisma` que ya está en el repo (sin modificarlo).

---

## 5. Aplicar las migraciones existentes

El repo ya trae la carpeta `prisma/migrations`, hay que aplicarlas a la base local:

```bash
npx prisma migrate dev
```

Esto:
- Crea las tablas en la base local según las migraciones existentes
- Deja la base sincronizada con el schema
- Regenera el cliente si hiciera falta

> Si es un entorno de solo lectura/CI (no desarrollo), en vez de `migrate dev` se usa:
> ```bash
> npx prisma migrate deploy
> ```
> (`deploy` no genera nuevas migraciones, solo aplica las que ya existen; es el comando recomendado para producción).

---

## 6. Verificar la conexión

```bash
npx prisma studio
```

Abre una interfaz visual en el navegador para confirmar que las tablas se crearon correctamente y explorar los datos.

---

## 7. Empezar a trabajar

El cliente ya está listo para importarse en el código, por ejemplo:

```typescript
import { prisma } from "./lib/prisma";

const users = await prisma.user.findMany();
```

(La ruta y forma de instanciación dependen de cómo esté armado `lib/prisma.ts` en el repo clonado)

---

## Resumen de comandos

| Paso | Comando |
|------|---------|
| Clonar repo | `git clone <url> && cd <repo>` |
| Instalar dependencias | `npm install` |
| Configurar `.env` | `cp .env.example .env` (y editar `DATABASE_URL`) |
| Generar cliente | `npx prisma generate` |
| Aplicar migraciones (dev) | `npx prisma migrate dev` |
| Aplicar migraciones (prod/CI) | `npx prisma migrate deploy` |
| Cargar seed (opcional) | `npx prisma db seed` |
| Explorar datos | `npx prisma studio` |

---

## Notas
- Cada desarrollador debe tener **su propia base de datos local** y su propio `DATABASE_URL` en `.env`; nunca se comparte ni se sube ese archivo.
- Si al correr `prisma migrate dev` aparece un conflicto de "drift" (la base local no coincide con el historial de migraciones), la opción más simple en desarrollo es resetear la base:
  ```bash
  npx prisma migrate reset
  ```
  ⚠️ Esto borra todos los datos de la base local y vuelve a aplicar las migraciones desde cero.
