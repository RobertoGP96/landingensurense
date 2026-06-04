export type I18nEntry = {_key: 'es' | 'en'; value?: string}
export type I18nField = I18nEntry[] | null | undefined

export type SanityHeroStats = {
  stat1Value?: string
  stat1Label?: I18nField
  stat2Value?: string
  stat2Label?: I18nField
  stat3Value?: string
  stat3Label?: I18nField
}

export type SanityCtaBanner = {
  heading?: I18nField
  body?: I18nField
  primaryLabel?: I18nField
  primaryHref?: string
  secondaryLabel?: I18nField
  secondaryHref?: string
}

export type SanityContactCard = {
  label?: I18nField
  value?: string
  sub?: I18nField
}

export type SanityContactInfo = {
  cards?: SanityContactCard[]
  afterHours?: I18nField
}

export type SanityCoverageItem = {
  _id: string
  order: number
  num: string
  name?: I18nField
  tagline?: I18nField
  body?: I18nField
  bulletsEs?: string[]
  bulletsEn?: string[]
}

export type SanityProductCategory = 'personal' | 'commercial' | 'specialty'

export type SanityProduct = {
  _id: string
  order: number
  num: string
  slug?: {current?: string}
  category: SanityProductCategory
  name?: I18nField
  tagline?: I18nField
  body?: I18nField
  bulletsEs?: string[]
  bulletsEn?: string[]
}

export type SanityService = {
  _id: string
  order: number
  num: string
  slug?: {current?: string}
  name?: I18nField
  tagline?: I18nField
  body?: I18nField
}

export type SanityTestimonial = {
  _id: string
  order: number
  quote?: I18nField
  author: string
  role?: I18nField
  since?: I18nField
}

export type SanityBundle = {
  heroStats: SanityHeroStats | null
  ctaBanner: SanityCtaBanner | null
  contactInfo: SanityContactInfo | null
  coverageItems: SanityCoverageItem[]
  products: SanityProduct[]
  services: SanityService[]
  testimonials: SanityTestimonial[]
}
