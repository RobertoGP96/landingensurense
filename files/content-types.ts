/**
 * Type definitions for content.json (ATI Insurance Group)
 *
 * Usage:
 *   import content from '@/content.json';
 *   import type { ContentRoot, Product, ParsedForm } from '@/lib/content-types';
 *
 *   const typed = content as ContentRoot;
 */

export type ProductCategory =
  | 'commercial-trucking'
  | 'personal'
  | 'commercial'
  | 'specialty';

export type CoverageItem = {
  title: string;
  description: string;
};

export type CoverageSection = {
  title: string;
  intro?: string;
  items: CoverageItem[];
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  featured: boolean;
  hero: {
    title: string;
    subtitle: string;
  };
  description: string;
  sections: CoverageSection[];
};

export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'date'
  | 'textarea'
  | 'select'
  | 'compound';

export type FormField = {
  label: string;
  required: boolean;
  type: FormFieldType;
  options?: string[];   // when type === 'select'
  compound?: string[];  // when type === 'compound', e.g. ['First', 'Last']
  section?: string;     // section header under which the field is grouped
};

export type ParsedForm = {
  title: string;
  intro: string;
  fields: FormField[];
};

export type Service = {
  slug: string;
  name: string;
  headline: string;
  form: ParsedForm;
};

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
};

export type CoreValue = {
  letter: 'A' | 'T' | 'I';
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  quote: string;
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
};

export type ContentRoot = {
  company: {
    legalName: string;
    incorporated: string;       // ISO date
    incorporatedState: string;
    type: string;
    specialty: string;
    tagline: string;
    homeHeadline: string;
    mission: string;
    vision: string;
    coreValues: CoreValue[];
    aboutShort: string;
    aboutLong: string;
    logoUrl: string;
  };
  contact: {
    phone: string;
    phoneE164: string;
    fax: string;
    email: string;
    physicalAddress: Address;
    mailingAddress: Address;
    coordinates: { lat: number; lng: number };
    languages: string[];
    hours: {
      monFri: string;
      saturday: string;
      sunday: string;
      online: string;
    };
    social: {
      facebook: string;
      instagram: string;
    };
    agentLogin: string;
  };
  licensedStates: string[];
  testimonials: Testimonial[];
  navigation: { primary: NavItem[] };
  products: Product[];
  services: Service[];
  quoteForms: Record<string, ParsedForm>;
  industryLinks: {
    federal: string[];
    trucking: string[];
    safety: string[];
  };
  legal: {
    privacyPolicy: string;
    accessibilityStatement: string;
  };
  referAFriendForm: ParsedForm;
  contactForm: ParsedForm;
  newsRaw: string;
};

// =============================================================================
// Helper functions
// =============================================================================

import contentJson from './content.json';
const content = contentJson as ContentRoot;

export function getProduct(slug: string): Product | undefined {
  return content.products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return content.products.filter((p) => p.category === category);
}

export function getService(slug: string): Service | undefined {
  return content.services.find((s) => s.slug === slug);
}

export function getQuoteForm(slug: string): ParsedForm | undefined {
  return content.quoteForms[slug];
}

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'commercial-trucking', label: 'Trucking' },
  { value: 'personal', label: 'Personal' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'specialty', label: 'Specialty' },
];

export default content;
