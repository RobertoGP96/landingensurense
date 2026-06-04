import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {internationalizedArray} from '@sanity/internationalized-array'

import {schemaTypes} from './schemas'
import {structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'mc-solutions',
  title: 'M C Solutions Insurance',
  projectId,
  dataset,

  plugins: [
    structureTool({structure}),
    visionTool(),
    internationalizedArray({
      languages: [
        {id: 'es', title: 'Español'},
        {id: 'en', title: 'English'},
      ],
      defaultLanguages: ['es'],
      fieldTypes: ['string', 'text'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
