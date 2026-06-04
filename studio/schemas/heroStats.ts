import {defineType, defineField} from 'sanity'

const stat = (n: 1 | 2 | 3) => [
  defineField({
    name: `stat${n}Value`,
    title: `Stat ${n} — Valor (ej: "+2,400")`,
    type: 'string',
    validation: (r) => r.required(),
  }),
  defineField({
    name: `stat${n}Label`,
    title: `Stat ${n} — Etiqueta (bilingüe)`,
    type: 'internationalizedArrayString',
    validation: (r) => r.required(),
  }),
]

export default defineType({
  name: 'heroStats',
  title: 'Hero · Estadísticas',
  type: 'document',
  fields: [
    ...stat(1),
    ...stat(2),
    ...stat(3),
  ],
  preview: {
    select: {a: 'stat1Value', b: 'stat2Value', c: 'stat3Value'},
    prepare: ({a, b, c}) => ({title: 'Hero stats', subtitle: [a, b, c].filter(Boolean).join(' · ')}),
  },
})
