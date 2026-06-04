import {CONTENT} from '../data/content'
import type {CoverageItem, Lang, ProductItem, ServiceItem, Translation} from '../data/types'
import type {
  I18nField,
  SanityBundle,
  SanityCoverageItem,
  SanityProduct,
  SanityService,
  SanityTestimonial,
} from './types'

function pick(field: I18nField, lang: Lang, fallback = ''): string {
  if (!field) return fallback
  const entry = field.find((e) => e?._key === lang)
  return entry?.value ?? fallback
}

function mapCoverage(items: SanityCoverageItem[], lang: Lang): CoverageItem[] {
  const fallback = CONTENT[lang].coverage.items
  if (!items.length) return fallback
  return items.map<CoverageItem>((it, i) => {
    const fb = fallback[i] ?? fallback[0]
    return {
      num: it.num || fb?.num || `0${i + 1}`,
      name: pick(it.name, lang, fb?.name ?? ''),
      tagline: pick(it.tagline, lang, fb?.tagline ?? ''),
      body: pick(it.body, lang, fb?.body ?? ''),
      bullets: (lang === 'es' ? it.bulletsEs : it.bulletsEn) ?? fb?.bullets ?? [],
    }
  })
}

function mapProducts(items: SanityProduct[], lang: Lang): ProductItem[] {
  const fallback = CONTENT[lang].products.items
  if (!items.length) return fallback
  return items.map<ProductItem>((it, i) => {
    const fb = fallback.find((f) => f.slug === it.slug?.current) ?? fallback[i] ?? fallback[0]
    return {
      slug: it.slug?.current || fb?.slug || `producto-${i + 1}`,
      num: it.num || fb?.num || `0${i + 1}`,
      name: pick(it.name, lang, fb?.name ?? ''),
      tagline: pick(it.tagline, lang, fb?.tagline ?? ''),
      body: pick(it.body, lang, fb?.body ?? ''),
      bullets: (lang === 'es' ? it.bulletsEs : it.bulletsEn) ?? fb?.bullets ?? [],
      category: it.category ?? fb?.category ?? 'personal',
    }
  })
}

function mapServices(items: SanityService[], lang: Lang): ServiceItem[] {
  const fallback = CONTENT[lang].services.items
  if (!items.length) return fallback
  return items.map<ServiceItem>((it, i) => {
    const slug = it.slug?.current
    const fb =
      (slug ? fallback.find((f) => f.slug === slug) : undefined) ?? fallback[i] ?? fallback[0]
    return {
      slug: slug || fb?.slug || `servicio-${i + 1}`,
      num: it.num || fb?.num || `0${i + 1}`,
      name: pick(it.name, lang, fb?.name ?? ''),
      tagline: pick(it.tagline, lang, fb?.tagline ?? ''),
      body: pick(it.body, lang, fb?.body ?? ''),
      // formFields se mantienen desde el código (no migran a Sanity).
      formFields: fb?.formFields ?? [],
    }
  })
}

function mapTestimonials(items: SanityTestimonial[], lang: Lang) {
  const fallback = CONTENT[lang].testimonials.items
  if (!items.length) return fallback
  return items.map((it, i) => {
    const fb = fallback[i] ?? fallback[0]
    return {
      q: pick(it.quote, lang, fb?.q ?? ''),
      a: it.author || fb?.a || '',
      r: pick(it.role, lang, fb?.r ?? ''),
      since: pick(it.since, lang, fb?.since ?? ''),
    }
  })
}

export function mergeBundle(bundle: SanityBundle | null, lang: Lang): Translation {
  const base = CONTENT[lang]
  if (!bundle) return base

  const hero = bundle.heroStats
  const heroMerged = hero
    ? {
        ...base.hero,
        stat1: {
          k: hero.stat1Value ?? base.hero.stat1.k,
          v: pick(hero.stat1Label, lang, base.hero.stat1.v),
        },
        stat2: {
          k: hero.stat2Value ?? base.hero.stat2.k,
          v: pick(hero.stat2Label, lang, base.hero.stat2.v),
        },
        stat3: {
          k: hero.stat3Value ?? base.hero.stat3.k,
          v: pick(hero.stat3Label, lang, base.hero.stat3.v),
        },
      }
    : base.hero

  const contact = bundle.contactInfo
  const contactCards =
    contact?.cards && contact.cards.length > 0
      ? contact.cards.map((c, i) => {
          const fb = base.contact.cards[i] ?? base.contact.cards[0]
          return {
            label: pick(c.label, lang, fb?.label ?? ''),
            value: c.value || fb?.value || '',
            sub: pick(c.sub, lang, fb?.sub ?? ''),
          }
        })
      : base.contact.cards

  const contactMerged = {
    ...base.contact,
    cards: contactCards,
    after_d: pick(contact?.afterHours, lang, base.contact.after_d),
  }

  return {
    ...base,
    hero: heroMerged,
    coverage: {...base.coverage, items: mapCoverage(bundle.coverageItems, lang)},
    products: {...base.products, items: mapProducts(bundle.products, lang)},
    services: {...base.services, items: mapServices(bundle.services, lang)},
    testimonials: {...base.testimonials, items: mapTestimonials(bundle.testimonials, lang)},
    contact: contactMerged,
  }
}
