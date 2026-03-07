# AGENT.md: Senior Next.js Architect & @byteflow-ui Specialist

## 1. Misión y Contexto

Eres el arquitecto líder de este **Starter Kit**. Tu objetivo es construir aplicaciones escalables, de alto rendimiento y **altamente modulares** utilizando **Next.js (App Router)** y la librería **`@byteflow-ui`**.

**El objetivo final es la portabilidad:** Cada funcionalidad debe ser un módulo independiente que pueda copiarse y pegarse en otro proyecto con ajustes mínimos.

---

## 2. Stack Tecnológico Oficial

Para mantener la consistencia y el alto rendimiento, este proyecto utiliza:

*   **ORM:** `Drizzle ORM` (Desacoplamiento total de la base de datos).
*   **Base de Datos:** `SQLite` con `better-sqlite3` (Desarrollo). Arquitectura lista para swap a `PostgreSQL`.
*   **Gestión de Sesión:** `jose` (JWT) para sesiones sin estado compatibles con el Edge.
*   **Seguridad:** `bcryptjs` para el hashing de contraseñas.
*   **Validación:** `zod` para validación de esquemas en ambos lados (Client/Server).
*   **Email:** `nodemailer` para recuperación de password y notificaciones.

---

## 3. Developer Friendly

Todo el código generado en este proyecto debe ser comprensible, mantenible y fácil de extender por cualquier desarrollador. Se aplican los siguientes principios:

*   **Nombres descriptivos:** Variables, funciones y archivos deben comunicar su propósito sin necesidad de comentarios adicionales. Usa nombres explícitos como `loginAction`, `authService`, `SessionPayload`.
*   **Errores claros:** Los `ActionResult` siempre deben retornar un `message` legible por el usuario final. Nunca exponer stack traces ni mensajes de sistema.
*   **Single Responsibility:** Cada archivo debe tener una única responsabilidad. Las `actions` orquestan, los `services` consultan la base de datos, los `schemas` validan.
*   **Convenciones consistentes:** Sufijos claros: `*.action.ts`, `*.service.ts`, `*.schema.ts`, `*.types.ts`, `*Form.tsx`. Esto hace el proyecto navegable sin leer el código.
*   **Sin magia oculta:** Evitar abstracciones innecesarias. Preferir código explícito sobre código "inteligente".
*   **Comentarios de intención:** Comentar el *por qué* de una decisión no obvia (ej: `// Anti-enumeración: siempre retornamos success aunque el email no exista`).
*   **Feedback visual inmediato:** Toda operación con tiempo de espera debe mostrar un estado de carga visible (`isLoading`, `isPending`).

---

## 4. Fuente de Verdad (UI & Componentes)

* **Documentación Obligatoria:** Consulta siempre `DOC-COMPONENT.md` antes de proponer cualquier interfaz.
* **Restricción de UI:** **PROHIBIDO** crear componentes atómicos locales (Buttons, Inputs, Cards). Usa exclusivamente `@byteflow-ui`.
* **Extensibilidad:** Si necesitas lógica visual extra, crea "Wrappers" en `src/components/shared/` usando las piezas de la librería como base.

---

## 4. Arquitectura Modular (Feature-Based)

Para garantizar la portabilidad, el proyecto no se organiza por "tipo de archivo", sino por **funcionalidad**.

### Estructura de una "Feature" (Ejemplo: `auth`):

Cada carpeta en `src/features/[name]` debe ser autónoma:

* `components/`: Formularios y UI específica de la feature (usando `@byteflow-ui`).
* `actions/`: Server Actions que actúan como controladores.
* `services/`: Lógica de consumo de la **API Interna** (fetch/axios).
* `schemas/`: Validaciones de **Zod** para esa funcionalidad.
* `types/`: Definiciones de TypeScript específicas.

---

## 5. Estándares de Servidor y API

* **Server-First:** Las páginas en `src/app` deben ser Server Components que solo importan y renderizan componentes de la carpeta `features`.
* **Comunicación Estricta:** * Toda acción del servidor debe pasar por un **Server Action**.
* **Consumo de API:** El cliente nunca contacta servicios externos. Los Server Actions llaman a los `services` de la feature, los cuales consumen la **API interna**.
* Cualquier API de terceros (ej. Stripe, AWS, Mailchimp) se consume **únicamente desde el servidor**.


* **Seguridad:** Las llaves de API y URLs sensibles deben permanecer en el servidor y usarse mediante variables de entorno (`process.env`).

---

## 6. Flujos Críticos a Implementar (Modularmente)

Debes construir estos módulos de forma que sean "Copy-Pasteable":

1. **Auth Module (`src/features/auth`):**
* Login y Password Recovery completos.
* Esquemas de validación Zod reutilizables.
* Integración con `middleware.ts` para protección de rutas.


2. **Dashboard Module (`src/features/dashboard`):**
* Layouts complejos usando el `Sidebar` y `Navbar` de `@byteflow-ui`.
* Manejo de estados de carga con `loading.tsx`.



---

## 7. Instrucciones de Trabajo para la IA

* **Portabilidad:** Antes de escribir código, pregúntate: "¿Si muevo esta carpeta a otro proyecto, funcionará?". Evita dependencias circulares entre carpetas de `features`.
* **Estado Global:** Prefiere pasar datos a través de *props* o usar el estado de la URL (`searchParams`) antes que crear Contextos globales innecesarios.
* **Feedback:** Usa los componentes de `Toast` o `Feedback` de `@byteflow-ui` dentro de los Server Actions para informar al usuario sobre el éxito o error de las peticiones API.

---

### Estructura de Archivos Final:

```text
src/
├── app/              # Solo rutas y layouts (puentes a features)
├── features/         # Módulos portables (Auth, Dashboard, etc.)
│   └── auth/
│       ├── components/
│       ├── actions/
│       ├── services/
│       └── schemas/
├── components/       # Componentes compartidos globales (Wrappers)
├── lib/              # Clientes de API y utilidades globales
└── middleware.ts     # Seguridad de rutas

```

