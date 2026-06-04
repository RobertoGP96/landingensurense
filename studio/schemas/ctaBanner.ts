import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ctaBanner',
  title: 'Banner CTA',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Título (bilingüe)',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'body',
      title: 'Texto (bilingüe)',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'primaryLabel',
      title: 'Botón primario — texto (bilingüe)',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'primaryHref',
      title: 'Botón primario — link',
      type: 'string',
      description: 'Ej: /quote, /contact, tel:+15554120809',
    }),
    defineField({
      name: 'secondaryLabel',
      title: 'Botón secundario — texto (bilingüe)',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'secondaryHref',
      title: 'Botón secundario — link',
      type: 'string',
    }),
  ],
  preview: {prepare: () => ({title: 'Banner CTA del Home'})},
})
