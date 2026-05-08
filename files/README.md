# ATI Insurance — Paquete de Migración / Rediseño

Extracción literal completa del sitio actual `atiinsurancegroup.com` + guía técnica para construir el nuevo sitio en React/Next.js.

## 📦 Archivos en este paquete

| Archivo | Para qué sirve | Formato |
|---|---|---|
| **`content.json`** | Fuente única de verdad: TODO el contenido literal del sitio actual estructurado (15 productos, 14 quote forms, 9 service forms, contacto, testimonios, navegación, legal). | JSON |
| **`content-types.ts`** | TypeScript types + helpers (`getProduct`, `getService`, etc.) listos para copiar a `lib/content-types.ts` del proyecto Next.js. | TS |
| **`IMPLEMENTATION_GUIDE.md`** | Guía completa de implementación: stack, IA, rutas, componentes, sistema de diseño, SEO, i18n, accesibilidad, roadmap por sprints, prompt-base para Claude Code. | Markdown |

## 🚀 Cómo usar este paquete con Claude Code

1. Crea un proyecto Next.js nuevo:
   ```bash
   bunx create-next-app@latest ati-redesign --typescript --tailwind --app
   cd ati-redesign
   ```

2. Copia los 3 archivos a la raíz del proyecto:
   ```
   ati-redesign/
   ├─ content.json          ← copia aquí
   ├─ lib/content-types.ts  ← copia aquí (renombrado)
   └─ docs/IMPLEMENTATION_GUIDE.md  ← copia aquí
   ```

3. Abre Claude Code en el proyecto y empieza con:

   ```
   Lee docs/IMPLEMENTATION_GUIDE.md completo y content.json. 
   Toda la información literal del sitio está en content.json — nunca inventes contenido.
   
   Empezamos por: [ej. "Construye el componente Header con MegaMenu y LanguageSwitcher"]
   ```

   Claude Code leerá el JSON, entenderá la arquitectura, y construirá las vistas.

## 📊 Cobertura del corpus

- **15 productos** parseados (Trucking, Auto, Home, Business, Boat, BOP, Condo, Event, Flood, Health, Bonds, Landlords, Renters, Umbrella, Workers Comp).
- **14 quote forms** parseados con todos sus campos (la trucking tiene 30+ campos: MC, DOT, FEIN, vehicles array, drivers array, coverages).
- **9 service forms** parseados (Certificates, Update Contact, Policy Changes, Drivers/Vehicles add-remove, Proof of Insurance, Endorsements, Documents, Free Consultation).
- **Páginas legales**: Privacy Policy + Accessibility Statement literales.
- **Industry Links**: 17 links externos (federal, trucking, safety).
- **Empresa**: misión, visión, core values (A.T.I.), about, contacto completo, horarios, redes, coordenadas geo.

Total: ~165KB de contenido estructurado.

## ⚠️ Información todavía pendiente con el cliente

Listada en `IMPLEMENTATION_GUIDE.md` sección 14. Lo crítico:
- ¿Qué AMS (Applied Epic, EZLynx...) usan?
- Lista de carriers que representan
- Logo en SVG vectorial
- Paleta de colores brand oficial
- Procesador de pagos
- ¿Conexión a FMCSA via API?

Sin esto el portal cliente y el flujo de trucking quote quedan parcialmente especulativos.

---

Generado mediante extracción del sitio público atiinsurancegroup.com. Todo el contenido literal pertenece a ATI Insurance Group, Inc.
