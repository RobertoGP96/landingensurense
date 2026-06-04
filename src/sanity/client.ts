import {createClient, type SanityClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'

export const sanityEnabled = Boolean(projectId)

export const sanityClient: SanityClient | null = sanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
      perspective: 'published',
    })
  : null
