import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'num',
      title: 'Número visible (ej: "01")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL: /products/<slug>)',
      type: 'slug',
      options: {source: (doc) => {
        const name = doc.name as Array<{_key: string; value: string}> | undefined
        return name?.find((n) => n._key === 'es')?.value || ''
      }, maxLength: 60},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Personal', value: 'personal'},
          {title: 'Comercial', value: 'commercial'},
          {title: 'Especializado', value: 'specialty'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nombre (bilingüe)',
      type: 'internationalizedArrayString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (bilingüe)',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'body',
      title: 'Descripción larga (bilingüe)',
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
    select: {num: 'num', name: 'name', slug: 'slug.current', category: 'category'},
    prepare: ({num, name, slug, category}) => {
      const es = Array.isArray(name) ? name.find((n: {_key: string}) => n._key === 'es')?.value : ''
      return {title: `${num || ''} · ${es || 'Sin nombre'}`, subtitle: `${category || ''} · /${slug || ''}`}
    },
  },
})
