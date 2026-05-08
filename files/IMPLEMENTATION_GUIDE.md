# ATI Insurance Group — Guía de Implementación del Rediseño

> Documento de contexto y especificación para que Claude Code genere las vistas React del nuevo sitio web. Toda la información literal del sitio actual está en `content.json` (mismo directorio).

---

## 0. Contexto del cliente (resumen no-negociable)

- **Empresa**: ATI Insurance Group, Inc. — agencia de seguros independiente.
- **Incorporada**: 8 de junio de 2015 en Florida.
- **Sede**: Hialeah, FL (Miami-Dade). Audiencia bilingüe EN/ES.
- **Especialidad**: Commercial Truck Insurance (producto hero).
- **Otros productos** (14): Auto, Home, Business, Boat, BOP, Condo, Event, Flood, Health, Insurance Bonds, Landlords, Renters, Umbrella, Workers Compensation.
- **Estados con licencia**: FL, GA, IL, MS, NC, NJ, TX.
- **Sitio actual**: Weebly + plantilla "InsuranceSplash". Estático, sin portal cliente, sin i18n real, formularios duplicados (15 quote pages independientes). Es el lastre principal a eliminar.

---

## 1. Stack técnico recomendado

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | **Next.js 15 (App Router)** + React 19 | RSC + Server Actions = formularios sin API routes manuales. Built-in i18n routing. |
| Lenguaje | TypeScript estricto | El dominio (insurance) tiene muchos enums y tipos; Zod schemas dobles para runtime. |
| Estilos | **Tailwind CSS v4** + CSS variables | Theming bilingüe/dark sin prop drilling. |
| Componentes | **shadcn/ui** + Radix primitives | Accesibilidad WCAG 2.2 AA out-of-the-box (ya tienen Accessibility Statement). |
| Forms | **react-hook-form** + **Zod** | El form de Trucking tiene 30+ campos con validación cruzada (DOT, MC, FEIN). |
| Animation | Framer Motion (sutil, solo en hero/transitions) | Nunca animaciones decorativas en formularios. |
| i18n | **next-intl** | Mercado Hialeah es 95% bilingüe; toggle EN/ES desde día 1. |
| Backend / DB | **Supabase** (auth + Postgres + RLS + Storage) | Encaja con stack del cliente. RLS para multi-tenant agente/cliente. |
| CMS | **Sanity** o **Payload v3** | Para que el agente edite productos/testimonios sin tocar código. Payload si quieren self-host. |
| Email | **Resend** + React Email | Templates de confirmación de quote bilingües. |
| Forms backend | Server Actions + Supabase | Cada quote = fila en `quote_requests` con status + assignedAgentId. |
| Hosting | **Vercel** | ISR para páginas de productos (CMS-driven). |
| Analytics | Vercel Analytics + PostHog | Heatmaps en quote funnel para optimizar conversión. |
| Monitoring | Sentry | Captura errores de submit de formularios en prod. |

---

## 2. Arquitectura de información (cambio clave vs. sitio actual)

El sitio actual tiene 6 categorías top-level con un dropdown de 15 productos cada una. **Eso es ruido**. El rediseño agrupa los 15 productos en **4 categorías** mostradas en una mega-menu visual:

```
┌──────────────────────────────────────────────────────────┐
│  TRUCKING ⭐    PERSONAL    COMMERCIAL    SPECIALTY      │
├──────────────────────────────────────────────────────────┤
│  Trucking       Auto        Business      Event          │
│                 Home        BOP           Bonds          │
│                 Condo       Landlords                    │
│                 Renters     Workers Comp                 │
│                 Boat                                     │
│                 Flood                                    │
│                 Health                                   │
│                 Umbrella                                 │
└──────────────────────────────────────────────────────────┘
```

Las categorías están en `content.json` → `products[].category` con valores: `commercial-trucking`, `personal`, `commercial`, `specialty`.

---

## 3. Estructura de rutas (Next.js App Router)

```
app/
├─ [locale]/                          # 'en' | 'es'
│  ├─ layout.tsx                       # Header + Footer + Toaster
│  ├─ page.tsx                         # Home
│  ├─ products/
│  │  ├─ page.tsx                      # Grid de los 15
│  │  └─ [slug]/page.tsx               # Página individual de producto
│  ├─ trucking/                        # Landing dedicada (subdominio del hero)
│  │  └─ page.tsx
│  ├─ quote/
│  │  ├─ page.tsx                      # Selector "¿qué quieres cotizar?"
│  │  └─ [slug]/page.tsx               # Form multi-step por tipo
│  ├─ services/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ about/page.tsx
│  ├─ testimonials/page.tsx
│  ├─ contact/page.tsx
│  ├─ refer/page.tsx
│  ├─ news/page.tsx
│  ├─ privacy/page.tsx
│  ├─ accessibility/page.tsx
│  └─ portal/                          # Customer portal (auth required)
│     ├─ layout.tsx                    # Auth guard + sidebar
│     ├─ page.tsx                      # Dashboard
│     ├─ policies/page.tsx
│     ├─ documents/page.tsx
│     ├─ claims/page.tsx
│     └─ settings/page.tsx
├─ admin/                              # Agent backoffice
│  ├─ leads/                           # Quote requests pipeline
│  ├─ clients/
│  └─ policies/
└─ api/                                # webhooks (Stripe, Resend, etc.)
```

---

## 4. Sistema de diseño

### 4.1 Tokens

```ts
// tailwind.config.ts (extracto)
export default {
  theme: {
    extend: {
      colors: {
        // Brand: derivar del logo actual (azul corporativo + acento)
        // El logo es texto + ícono; sugiero paleta neutra + 1 azul corporativo + amber para CTAs trucking
        brand: {
          DEFAULT: '#0F4C81',  // Azul ATI (placeholder hasta tener color real del logo)
          50: '#EAF1F8',
          900: '#072742'
        },
        accent: {
          DEFAULT: '#F59E0B', // Amber para CTAs principales
        }
      },
      fontFamily: {
        sans: ['Inter Variable', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Inter Variable', 'sans-serif'], // Para hero headlines
      }
    }
  }
}
```

### 4.2 Layout principles

- **Header sticky**: logo izq, nav center (mega-menu), CTA "Get a Quote" + phone click-to-call + EN/ES toggle der.
- **Footer**: 4 columnas (Productos, Servicios, Compañía, Contacto) + barra inferior con licencias + redes.
- **Hero pattern (excepto Home)**: gradient sutil + breadcrumb + H1 + subtítulo + CTA dual (primary "Get Quote" + secondary "Call (305) 603-7757").
- **Mobile**: hamburger menu con drawer; sticky bottom bar con "Call" + "Quote" en mobile.

### 4.3 Componentes clave a construir

```
components/
├─ layout/
│  ├─ Header.tsx                       # con MegaMenu y LanguageSwitcher
│  ├─ Footer.tsx
│  ├─ MobileBottomBar.tsx              # Sticky en mobile
│  └─ LanguageSwitcher.tsx
├─ ui/                                 # shadcn/ui generated
├─ blocks/
│  ├─ Hero.tsx                         # Variants: home | product | service
│  ├─ ProductCard.tsx
│  ├─ CoverageList.tsx                 # Renderiza sections + items de un producto
│  ├─ TestimonialCarousel.tsx
│  ├─ TrustBar.tsx                     # Estados con licencia + carriers
│  ├─ CTASection.tsx
│  ├─ FAQ.tsx
│  └─ ContactInfoCard.tsx
└─ forms/
   ├─ QuoteForm.tsx                    # Form genérico multi-step driven by config
   ├─ TruckingQuoteForm.tsx            # Especializado (compleja lógica MC/DOT)
   ├─ ServiceRequestForm.tsx           # Para policy-changes, certificates, etc.
   ├─ ContactForm.tsx
   └─ ReferralForm.tsx
```

---

## 5. Cómo usar `content.json`

`content.json` es la **fuente única de verdad** del contenido literal. Estructura top-level:

```typescript
{
  company: { legalName, tagline, mission, vision, coreValues[], aboutShort, aboutLong, ... },
  contact: { phone, phoneE164, fax, email, physicalAddress, mailingAddress, coordinates, hours, social, ... },
  licensedStates: string[],
  testimonials: [{ name, quote }],
  navigation: { primary: NavItem[] },
  products: Product[],          // 15 productos parseados con sections + items
  services: Service[],          // 9 servicios con form parseado
  quoteForms: Record<string, ParsedForm>,  // 14 quote forms con campos parseados
  industryLinks: { federal[], trucking[], safety[] },
  legal: { privacyPolicy, accessibilityStatement },
  referAFriendForm: ParsedForm,
  contactForm: ParsedForm,
  newsRaw: string
}
```

### 5.1 Tipo `Product`

```typescript
type Product = {
  slug: string;                    // 'trucking' | 'auto' | ...
  name: string;                    // "Trucking Insurance"
  category: 'commercial-trucking' | 'personal' | 'commercial' | 'specialty';
  featured: boolean;               // true solo para trucking
  hero: {
    title: string;                 // = name
    subtitle: string;              // copy del hero (ya extraído)
  };
  description: string;             // "What is X?" parseado
  sections: Array<{
    title: string;                 // "Coverages Available" | "Section I — Property Coverages"
    intro?: string;
    items: Array<{
      title: string;               // "Liability"
      description: string;         // texto explicativo
    }>;
  }>;
};
```

**Renderizado recomendado de un producto** (`app/[locale]/products/[slug]/page.tsx`):

```tsx
import content from '@/content.json';

export default async function ProductPage({ params }) {
  const product = content.products.find(p => p.slug === params.slug);
  if (!product) notFound();

  return (
    <>
      <Hero
        title={product.hero.title}
        subtitle={product.hero.subtitle}
        primaryCta={{ label: 'Get a Quote', href: `/quote/${product.slug}` }}
        secondaryCta={{ label: 'Call (305) 603-7757', href: 'tel:+13056037757' }}
      />
      
      {product.description && (
        <section className="prose mx-auto max-w-3xl py-16">
          <h2>About {product.name}</h2>
          <p>{product.description}</p>
        </section>
      )}
      
      {product.sections.map((section, i) => (
        <CoverageList key={i} section={section} />
      ))}
      
      <CTASection
        headline={`Ready to protect what matters?`}
        productSlug={product.slug}
      />
    </>
  );
}
```

### 5.2 Tipo `ParsedForm`

```typescript
type ParsedForm = {
  title: string;
  intro: string;
  fields: Array<{
    label: string;
    required: boolean;
    type: 'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select' | 'compound';
    options?: string[];           // si type === 'select'
    compound?: string[];          // si type === 'compound', ej. ['First', 'Last']
    section?: string;             // header bajo el cual va el campo
  }>;
};
```

**Renderizado recomendado de un formulario** (componente genérico):

```tsx
function DynamicForm({ form, onSubmit }: { form: ParsedForm; onSubmit: (data) => void }) {
  // Generar Zod schema dinámicamente
  const schema = useMemo(() => buildZodFromFields(form.fields), [form.fields]);
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  // Agrupar fields por sección
  const grouped = groupBy(form.fields, f => f.section ?? '_default');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h1 className="text-3xl font-display">{form.title}</h1>
      {form.intro && <p className="text-muted-foreground">{form.intro}</p>}
      
      {Object.entries(grouped).map(([section, fields]) => (
        <fieldset key={section} className="space-y-4">
          {section !== '_default' && (
            <legend className="text-lg font-semibold">{section}</legend>
          )}
          {fields.map(field => <FieldRenderer key={field.label} field={field} register={register} />)}
        </fieldset>
      ))}
      
      <Button type="submit" disabled={formState.isSubmitting}>Submit</Button>
    </form>
  );
}
```

### 5.3 Cuando NO uses `content.json` directamente

- Cuando el cliente migre a CMS (Sanity/Payload), `content.json` se usa como **seed inicial**. Después el CMS es la fuente de verdad.
- Para textos de UI (botones, labels genéricos, mensajes de error) → usa archivos de traducción `messages/en.json` y `messages/es.json` de next-intl, NO `content.json`.

---

## 6. Páginas — especificaciones detalladas

### 6.1 Home (`app/[locale]/page.tsx`)

**Secciones en orden**:

1. **Hero**: full-bleed, fondo con foto de truck (genera la sensación de "we know trucking"). H1 = `content.company.tagline`. CTA dual: "Get a Quote" (lleva a /quote) + click-to-call.
2. **Quote selector**: 5 cards (Trucking, Auto, Home, Business, Health) prominentes + botón "See all 15 products" → grid expanded.
3. **Trust bar**: licensed states (`content.licensedStates`) + "Bilingual Service" + "Since 2015".
4. **Why ATI**: 3 columnas con `content.company.coreValues` (A.T.I. acrónimo).
5. **Featured product (Trucking)**: card grande con CTA específico, FMCSA/DOT/MC visibility.
6. **Testimonials**: carousel con `content.testimonials` (3).
7. **Service center**: grid de 6 services (Certificates, Policy Changes, Proof of Insurance, Endorsement, Documents, Free Consultation) — cada uno linkea a su form.
8. **CTA final**: "Switch and save" + form de captura de email/phone (genera lead aunque no completen quote).

### 6.2 About (`app/[locale]/about/page.tsx`)

- Hero con `content.company.aboutShort`.
- Sección Misión + Visión (`content.company.mission`, `content.company.vision`).
- Sección Core Values con 3 cards usando `content.company.coreValues`.
- Stats bar: "Since 2015", "7 states licensed", "15 product lines", "Bilingual EN/ES".
- Map embebido usando `content.contact.coordinates`.
- CTA: "Meet our team" (placeholder por ahora, agregar cuando tengan fotos).

### 6.3 Producto individual (`app/[locale]/products/[slug]/page.tsx`)

Pattern descrito en sección 5.1. Adicionales:

- **Breadcrumb**: Home > Products > [Category] > [Product Name].
- **Sticky aside (desktop)**: form de quote rápido (3 campos: Name, Email, Phone) que pre-popula el form full al click.
- **FAQ section**: 4-6 preguntas comunes (a generar con CMS, no en content.json todavía).
- **Related products**: cross-sell basado en `category`.

### 6.4 Trucking (`app/[locale]/trucking/page.tsx`) — landing especial

Ya que es el producto hero, **debe tener landing dedicada**, no solo `/products/trucking`:

- Hero con video de fondo (truck en autopista) o imagen high-impact.
- Sección "We file your FMCSA forms" (BMC 91X, BMC 34) — diferenciador clave.
- Diagrama de las 14 coberturas (usar `content.products[0].sections[0].items`).
- Caso de estudio / testimonio dedicado (a generar).
- Calculator: "What MC class are you?" → muestra coberturas relevantes.
- Sticky CTA: "Same-day certificates" + phone.

### 6.5 Quote forms (`app/[locale]/quote/[slug]/page.tsx`)

Convertir el form actual (single-page con 30+ campos) en **multi-step**:

**Trucking Quote**, ejemplo de pasos:

1. **Step 1 — General**: Insured Name DBA, MC#, DOT#, FEIN, Year in Business, Address, contact info.
2. **Step 2 — Vehicles**: dynamic add/remove (no 3 fijos como ahora). Por vehículo: Year, Make, Model, VIN, Type, Value, GVW.
3. **Step 3 — Drivers**: dynamic add/remove. Por driver: Name, DOB, License#, State, Years Experience, MVR consent checkbox.
4. **Step 4 — Coverage**: BI Liability Limit (select), Comp/Coll Deductible (select), Radius (select), Commodity, Cargo Limit.
5. **Step 5 — Review & Submit**: muestra resumen + consent + submit.

Cada step persiste en `localStorage` con `react-hook-form` + Zod. Al submit final, server action crea fila en `quote_requests` y manda email a [agente] vía Resend.

### 6.6 Services (`app/[locale]/services/[slug]/page.tsx`)

Cada servicio del array `content.services` tiene un form en `service.form`. Usar el mismo `DynamicForm` componente.

**Especial**: `add-remove-drivers` y `add-remove-vehicles` son MUY largos (driver #1, #2, #3...). Convertir en dynamic add/remove con array fields de react-hook-form (`useFieldArray`).

### 6.7 Contact (`app/[locale]/contact/page.tsx`)

- Form simple (`content.contactForm`).
- Tarjeta con teléfono, email, fax, ambas direcciones (físical + mailing), horarios.
- Map embebido (Google Maps o Mapbox) con marker en `content.contact.coordinates`.
- "Languages: English, Spanish" prominente.

### 6.8 Customer portal (`app/[locale]/portal/*`) — NUEVO

No existe en sitio actual, valor enorme:

- Auth con Supabase (magic link + opcional 2FA).
- Dashboard: pólizas activas, próximas renovaciones, documentos recientes, accesos rápidos.
- Documents: lista de PDFs con preview + download (Storage de Supabase).
- Claims: form de "Report a claim" + tracking de claims existentes.
- Settings: update contact info (reemplaza el form público actual cuando el usuario está logueado).

---

## 7. SEO y datos estructurados

```tsx
// app/[locale]/layout.tsx — Schema.org InsuranceAgency
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'ATI Insurance Group, Inc.',
  url: 'https://www.atiinsurancegroup.com',
  telephone: '+13056037757',
  email: '[email]',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2451 W 68th Street, Suite #1',
    addressLocality: 'Hialeah',
    addressRegion: 'FL',
    postalCode: '33016',
    addressCountry: 'US'
  },
  geo: { '@type': 'GeoCoordinates', latitude: 25.8848958, longitude: -80.3326866 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:30', closes: '17:00' }
  ],
  areaServed: ['Florida', 'Georgia', 'Illinois', 'Mississippi', 'North Carolina', 'New Jersey', 'Texas'],
  knowsLanguage: ['English', 'Spanish']
};
```

Adicional: cada producto debe tener `@type: Service` schema.

---

## 8. Accesibilidad (WCAG 2.2 AA)

- Todos los formularios: `<label>` explícito asociado por `htmlFor`/`id`. Mensajes de error con `aria-describedby` y `role="alert"`.
- Contraste mínimo 4.5:1 para texto normal, 3:1 para texto large.
- Focus visible custom (no solo el del browser): ring-2 ring-brand-500.
- Skip-to-main-content link al inicio.
- Cumplir el `accessibilityStatement` literal de `content.legal.accessibilityStatement`.

---

## 9. i18n — implementación

```
messages/
├─ en.json       # textos UI en inglés
└─ es.json       # textos UI en español
```

`content.json` tiene todo el contenido **en inglés solamente**. Plan de traducción al español:

1. **Fase 1**: traducir UI shell (botones, navigation labels, footer) — `messages/es.json`. ~200 strings.
2. **Fase 2**: traducir productos al español — duplicar `content.json` → `content.es.json` con traducción profesional. (Crítico: NO usar Google Translate; usar agente bilingüe del cliente para validar terminología técnica de seguros.)
3. **Fase 3**: bilinguar formularios (mismo schema de validación, labels traducidos).

---

## 10. Performance budget

- Lighthouse Performance ≥ 95
- LCP < 2.0s
- CLS < 0.05
- INP < 200ms
- JS shipped < 150kb gzip en home
- Imágenes via `next/image` con AVIF + sizes responsivo
- Fonts con `next/font` + `display: swap`

---

## 11. Prompt sugerido para Claude Code

Cuando vayas a generar componentes, usa este prompt-base como contexto:

```
Estoy construyendo el rediseño de atiinsurancegroup.com con Next.js 15 App Router, 
TypeScript, Tailwind v4, shadcn/ui, react-hook-form + Zod, next-intl.

Toda la información literal del sitio actual está en `./content.json`. NO inventes 
contenido — siempre úsalo del JSON. Estructura del JSON descrita en 
IMPLEMENTATION_GUIDE.md sección 5.

Reglas duras:
1. Server Components por defecto. 'use client' solo cuando hay interactividad.
2. Toda la UI cumple WCAG 2.2 AA.
3. Nunca duplicar contenido — si aparece en >1 lugar, importarlo de content.json.
4. Formularios = multi-step con react-hook-form + Zod. Persistir step en localStorage.
5. Cada quote/service form genera una fila en Supabase `quote_requests` o `service_requests`.
6. Bilingüe ES/EN desde el inicio (rutas /[locale]/...).
7. Prefijo telefónico real: (305) 603-7757 / +13056037757. Click-to-call siempre disponible.
8. Mobile first. Sticky bottom bar con Call + Quote en mobile.

Construyamos de a una página/componente. Empezamos por: [PÁGINA O COMPONENTE].
```

---

## 12. Roadmap de implementación sugerido

**Sprint 1 (semana 1)** — Fundación
- Setup Next.js + Tailwind + shadcn + next-intl + Supabase
- Header + Footer + Layout shell
- Tipos TypeScript de `content.json` (generar desde JSON)
- Home page (estática, sin formularios todavía)

**Sprint 2 (semana 2)** — Productos
- `/products` grid + `/products/[slug]` página individual
- Componente `CoverageList`
- Landing especial `/trucking`

**Sprint 3 (semana 3)** — Quotes
- `DynamicForm` componente genérico
- `/quote/[slug]` con multi-step para trucking
- Server actions + Supabase persistence + Resend email

**Sprint 4 (semana 4)** — Services + Contact
- 9 service forms (reutilizan DynamicForm)
- Contact + Refer + About + Testimonials + Privacy + Accessibility

**Sprint 5 (semana 5)** — Portal cliente (auth)
- Supabase auth (magic link)
- Dashboard + Documents + Settings

**Sprint 6 (semana 6)** — Polish
- i18n español completo
- Schema.org markup
- Performance optimization
- Accessibility audit
- CMS migration (Sanity/Payload)

---

## 13. Datos críticos para tener a mano

| Dato | Valor |
|---|---|
| Phone E.164 | `+13056037757` |
| Phone display | `(305) 603-7757` |
| Fax | `(305) 603-7734` |
| Address physical | `2451 W 68th Street, Suite #1, Hialeah, FL 33016` |
| Address mailing | `8004 NW 154 St, Unit 106, Miami Lakes, FL 33016` |
| Coords | `25.8848958, -80.3326866` |
| Facebook | `https://www.facebook.com/atiinsurancegroup` |
| Instagram | `https://instagram.com/atiinsurancegroup` |
| Logo URL | `https://www.atiinsurancegroup.com/uploads/6/4/1/8/64182739/published/ati.png?1687549770` |
| External Auto Quote | `https://secure.consumerratequotes.com/ConsumerV2?id=64845` |
| External Certificates | `https://certificatesnow.confirmnet.com/Login.jhtml` |
| Hours Mon-Fri | `9:30 AM – 5:00 PM` |
| Hours Sat | `By Appointment Only` |

---

## 14. Información que FALTA capturar (preguntar al cliente)

Antes de programar el portal cliente y la integración con AMS, necesitas:

- ¿Qué AMS usan? (Applied Epic, EZLynx, Hawksoft, AgencyZoom...)
- ¿Qué carriers representan? (para mostrar logos en trust bar)
- Foto/bio del fundador y del staff (para página About).
- Logo en SVG o vector (el actual es PNG, pierde calidad).
- Paleta de colores oficial del brand.
- ¿Tienen Google Business Profile? (para integrar reviews reales).
- ¿Procesan pagos online? Si sí, ¿qué procesador? (Stripe, ePayPolicy específico para insurance).
- ¿Quieren live chat? (Intercom, Crisp, WhatsApp Business).
- Para FMCSA filings — ¿se conectan vía API o manual? (afecta el flujo de trucking quote).

---

**Fin del documento.** Toda la información literal está en `content.json`.
