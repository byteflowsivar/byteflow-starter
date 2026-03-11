# Byteflow Starter Kit

Panel de administración modular construido con **Next.js 16 (App Router)** y la librería de componentes premium **@byteflow-ui**.

---

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y ajusta los valores:

```bash
cp .env.local.example .env.local
```

> El archivo `.env.local` ya incluye una configuración funcional para desarrollo local.

### 3. Poblar la base de datos

```bash
npx tsx db/seed.ts
```

### 4. Levantar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔐 Credenciales de Acceso (Desarrollador)

Una vez ejecutado el script de seed, el siguiente usuario administrador estará disponible:

| Campo    | Valor                  |
|----------|------------------------|
| Email    | `admin@byteflow.dev`   |
| Password | `admin123`             |
| Rol      | `admin`                |

> ⚠️ **Importante:** Cambia estas credenciales antes de cualquier despliegue a producción. Puedes modificar los valores en `db/seed.ts`.

---

## 🗂️ Estructura del Proyecto

```text
src/
├── app/                    # Rutas y layouts (puentes a features)
│   ├── (auth)/             # Grupo de rutas públicas
│   │   ├── login/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   └── (dashboard)/        # Grupo de rutas protegidas
│       └── dashboard/
├── features/               # Módulos portables
│   └── auth/
│       ├── actions/        # Server Actions (controladores)
│       ├── components/     # Formularios con @byteflow-ui
│       ├── schemas/        # Validaciones Zod
│       ├── services/       # Lógica de negocio / DB
│       └── types/          # TypeScript types
├── db/                     # Schema y cliente de Drizzle ORM
├── lib/                    # Utilidades globales (session, password)
└── middleware.ts            # Protección de rutas
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| Next.js 16 | Framework (App Router) |
| @byteflow-ui | Librería de componentes UI |
| Drizzle ORM + SQLite | Base de datos (swappable a PostgreSQL) |
| jose | JWT para sesiones sin estado |
| bcryptjs | Hashing seguro de contraseñas |
| Zod | Validación de esquemas |
| nodemailer | Envío de correos |

---

## 🐳 Docker

Si estás construyendo la imagen de Docker en un entorno local (como macOS) para desplegarla en Linux, debes asegurarte de que el `package-lock.json` incluya las dependencias nativas para Linux. Ejecuta el siguiente comando en tu máquina local antes de construir la imagen:

```bash
npm install --save-optional --os=linux --cpu=arm64 --os=linux --cpu=x64
```

Esto evita errores de compatibilidad con módulos nativos (como `lightningcss` o `sharp`) durante el build de Docker.

---

## 🔄 Migración a PostgreSQL

Solo necesitas modificar `src/db/index.ts`. El resto del código no cambia:

```typescript
// Reemplazar esto:
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

// Por esto:
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
```

---

## 📚 Documentación de Componentes

Consulta `DOC-COMPONENT.md` para la referencia completa de la API de `@byteflow-ui`.
