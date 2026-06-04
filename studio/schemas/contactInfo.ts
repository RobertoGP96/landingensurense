import {defineType, defineField, defineArrayMember} from 'sanity'

const card = defineArrayMember({
  name: 'card',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta (bilingüe) — ej: Llámanos / Escríbenos / Visítanos',
      type: 'internationalizedArrayString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'value',
      title: 'Valor — teléfono, email o dirección (no se traduce)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sub',
      title: 'Subtítulo (bilingüe) — ej: horarios, tiempo de respuesta',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    select: {value: 'value'},
    prepare: ({value}) => ({title: value || 'Tarjeta de contacto'}),
  },
})

export default defineType({
  name: 'contactInfo',
  title: 'Información de contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'cards',
      title: 'Tarjetas (en orden: llamar, escribir, visitar)',
      type: 'array',
      of: [card],
      validation: (r) => r.min(1).max(4),
    }),
    defineField({
      name: 'afterHours',
      title: 'Texto después de horas (bilingüe)',
      type: 'internationalizedArrayText',
    }),
  ],
  preview: {prepare: () => ({title: 'Información de contacto'})},
})
