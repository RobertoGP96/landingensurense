export const BUNDLE_QUERY = `{
  "heroStats": *[_type == "heroStats"][0]{
    stat1Value, stat1Label,
    stat2Value, stat2Label,
    stat3Value, stat3Label
  },
  "ctaBanner": *[_type == "ctaBanner"][0]{
    heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref
  },
  "contactInfo": *[_type == "contactInfo"][0]{
    afterHours,
    "cards": cards[]{ label, value, sub }
  },
  "coverageItems": *[_type == "coverageItem"] | order(order asc){
    _id, order, num, name, tagline, body, bulletsEs, bulletsEn
  },
  "products": *[_type == "product"] | order(order asc){
    _id, order, num, slug, category, name, tagline, body, bulletsEs, bulletsEn
  },
  "services": *[_type == "service"] | order(order asc){
    _id, order, num, slug, name, tagline, body
  },
  "testimonials": *[_type == "testimonial"] | order(order asc){
    _id, order, quote, author, role, since
  }
}`
