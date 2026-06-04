import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'coverageItem',
  title: 'Cobertura (Home)',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Orden (1-99) — los menores aparecen primero',
      type: 'number',
      validation: (r) => r.required().min(0).max(99),
    }),
    defineField({
      name: 'num',
      title: 'Número visible (ej: "01")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nombre (bilingüe) — ej: Auto, Hogar',
      type: 'internationalizedArrayString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline corto (bilingüe)',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'body',
      title: 'Descripción (bilingüe)',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'bulletsEs',
      title: 'Bullets en español',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'bulletsEn',
      title: 'Bullets en inglés',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  orderings: [
    {title: 'Orden', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {num: 'num', name: 'name'},
    prepare: ({num, name}) => {
      const es = Array.isArray(name) ? name.find((n: {_key: string}) => n._key === 'es')?.value : ''
      return {title: `${num || ''} · ${es || 'Sin nombre'}`}
    },
  },
})
