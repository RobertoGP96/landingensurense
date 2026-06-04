import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicio',
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
      title: 'Slug (URL: /services/<slug>) — debe coincidir con el slug en código para mostrar los campos del formulario',
      type: 'slug',
      options: {source: (doc) => {
        const name = doc.name as Array<{_key: string; value: string}> | undefined
        return name?.find((n) => n._key === 'es')?.value || ''
      }, maxLength: 60},
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
  ],
  orderings: [
    {title: 'Orden', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {num: 'num', name: 'name', slug: 'slug.current'},
    prepare: ({num, name, slug}) => {
      const es = Array.isArray(name) ? name.find((n: {_key: string}) => n._key === 'es')?.value : ''
      return {title: `${num || ''} · ${es || 'Sin nombre'}`, subtitle: `/services/${slug || ''}`}
    },
  },
})
