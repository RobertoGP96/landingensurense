# M C Solutions — Sanity Studio

CMS para que el equipo edite el contenido del sitio sin tocar código.

## Setup inicial (una sola vez, por programador)

1. Crear cuenta gratis en [sanity.io](https://www.sanity.io) y un proyecto nuevo (plan Free).
2. Copiar el **Project ID** del dashboard.
3. Crear `studio/.env`:

   ```env
   SANITY_STUDIO_PROJECT_ID=tu-project-id
   SANITY_STUDIO_DATASET=production
   ```

4. Crear el mismo `.env` (con prefijo `VITE_`) en el root del proyecto:

   ```env
   VITE_SANITY_PROJECT_ID=tu-project-id
   VITE_SANITY_DATASET=production
   ```

5. Instalar dependencias:

   ```bash
   cd studio
   pnpm install
   ```

6. Correr el Studio localmente:

   ```bash
   pnpm dev
   # abre http://localhost:3333
   ```

7. Iniciar sesión con la cuenta de Sanity y cargar el contenido (testimonios, productos, etc.).

## Publicar el Studio en producción

```bash
cd studio
pnpm deploy
```

La primera vez te pide un hostname. Una vez desplegado, el cliente entra a `https://<hostname>.sanity.studio` con su cuenta de Sanity (invitada como Editor desde el dashboard del proyecto).

## Estructura de contenido

- **Singletons** (uno solo, no se duplican):
  - Hero · Estadísticas — las 3 métricas del banner principal
  - Banner CTA — el banner final del Home
  - Información de contacto — tarjetas con teléfono, email, dirección

- **Colecciones** (varios documentos):
  - Coberturas (Home) — los 8 items del Home (ordenados por campo `order`)
  - Productos — los productos del catálogo `/products` (slug debe ser único)
  - Servicios — los servicios `/services` (slug **debe coincidir** con los slugs en `src/data/content.ts` para que los formularios funcionen)
  - Testimonios — quotes de clientes

## Idiomas

Cada campo bilingüe tiene dos pestañas: **Español** y **English**. Llena ambas. Si solo llenas una, el sitio mostrará el fallback estático en el otro idioma.

## Invitar al cliente

1. En sanity.io → tu proyecto → Members → Invite.
2. Rol: **Editor** (puede editar y publicar pero no cambiar la estructura).
3. El cliente recibe email, se registra y entra al Studio publicado.

## Permisos del cliente

- ✅ Puede crear, editar y publicar testimonios, productos, servicios y coberturas.
- ✅ Puede editar singletons (Hero stats, contacto, CTA banner).
- ❌ No puede cambiar schemas, agregar idiomas ni desplegar el Studio.
