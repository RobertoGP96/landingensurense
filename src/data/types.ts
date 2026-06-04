export type CoverageItem = {
  num: string;
  name: string;
  tagline: string;
  body: string;
  bullets: string[];
  slug?: string;
};

export type ProductCategory = "personal" | "commercial" | "specialty";

export type ProductItem = {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  body: string;
  bullets: string[];
  category: ProductCategory;
};

export type FieldType = "text" | "email" | "tel" | "textarea" | "select" | "date" | "number";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

export type ServiceItem = {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  body: string;
  formFields: FieldDef[];
};

export type Translation = {
  nav: string[];
  topbar: { hours: string; phone: string; license: string };
  cta: { quote: string; agent: string; call: string; explore: string };
  hero: {
    eyebrow: string;
    title_a: string;
    title_b_it: string;
    title_c: string;
    sub: string;
    stat1: { k: string; v: string };
    stat2: { k: string; v: string };
    stat3: { k: string; v: string };
    live: string;
  };
  intro: { kicker: string; lead_a: string; lead_it: string; lead_b: string };
  coverage: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    lede: string;
    items: CoverageItem[];
  };
  why: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    heading_b: string;
    values: { num: string; name: string; body: string }[];
  };
  process: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    heading_b: string;
    steps: { n: string; t: string; d: string }[];
  };
  quote: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    heading_b: string;
    sub: string;
    labels: {
      type: string;
      name: string;
      phone: string;
      zip: string;
      lang_pref: string;
      consent: string;
    };
    placeholders: { name: string; phone: string; zip: string };
    submit: string;
    types: string[];
    note: string;
  };
  testimonials: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    heading_b: string;
    items: { q: string; a: string; r: string; since: string }[];
  };
  contact: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    heading_b: string;
    cards: { label: string; value: string; sub: string }[];
    after: string;
    after_d: string;
  };
  products: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    heading_b: string;
    lede: string;
    categories: { personal: string; commercial: string; specialty: string };
    detail: { overview: string; coverage: string; quote_cta: string; back: string };
    items: ProductItem[];
  };
  services: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    heading_b: string;
    lede: string;
    detail: { request: string; back: string };
    items: ServiceItem[];
  };
  contact_form: {
    kicker: string;
    heading_a: string;
    heading_it: string;
    heading_b: string;
    sub: string;
    labels: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      consent: string;
    };
    placeholders: { name: string; email: string; phone: string; message: string };
    subjects: string[];
    submit: string;
  };
  forms: {
    step: string;
    of: string;
    next: string;
    back: string;
    review: string;
    submitting: string;
    success_title: string;
    success_body: string;
    required: string;
    summary: string;
  };
  quote_extra: Record<string, FieldDef[]>;
  footer: {
    tag: string;
    states: string;
    copy: string;
    links: string[];
    address: string;
    lic: string;
    cols: { products: string; services: string; company: string };
  };
};

export type Lang = "es" | "en";
