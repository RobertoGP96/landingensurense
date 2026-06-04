import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Cita (bilingüe)',
      type: 'internationalizedArrayText',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor (ej: "Roberto G.")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol y ubicación (bilingüe) — ej: "Owner-Operator · Houston, TX"',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'since',
      title: 'Cliente desde (bilingüe) — ej: "Cliente desde 2024"',
      type: 'internationalizedArrayString',
    }),
  ],
  orderings: [
    {title: 'Orden', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {author: 'author', role: 'role'},
    prepare: ({author, role}) => {
      const es = Array.isArray(role) ? role.find((n: {_key: string}) => n._key === 'es')?.value : ''
      return {title: author || 'Sin autor', subtitle: es || ''}
    },
  },
})
