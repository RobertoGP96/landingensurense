import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from 'react'
import {sanityClient, sanityEnabled} from './client'
import {BUNDLE_QUERY} from './queries'
import {mergeBundle} from './mapper'
import type {SanityBundle} from './types'
import type {Lang, Translation} from '../data/types'
import {CONTENT} from '../data/content'

type SanityContentValue = {
  loading: boolean
  bundle: SanityBundle | null
  getTranslation: (lang: Lang) => Translation
}

const SanityContentContext = createContext<SanityContentValue | null>(null)

export function SanityContentProvider({children}: {children: ReactNode}) {
  const [bundle, setBundle] = useState<SanityBundle | null>(null)
  const [loading, setLoading] = useState<boolean>(sanityEnabled)

  useEffect(() => {
    if (!sanityClient) {
      setLoading(false)
      return
    }
    let cancelled = false
    sanityClient
      .fetch<SanityBundle>(BUNDLE_QUERY)
      .then((data) => {
        if (!cancelled) setBundle(data)
      })
      .catch((err) => {
        if (import.meta.env.DEV) console.warn('[Sanity] fetch failed, using static fallback', err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<SanityContentValue>(() => {
    const cache: Partial<Record<Lang, Translation>> = {}
    return {
      loading,
      bundle,
      getTranslation: (lang: Lang) => {
        if (!bundle) return CONTENT[lang]
        if (!cache[lang]) cache[lang] = mergeBundle(bundle, lang)
        return cache[lang]!
      },
    }
  }, [bundle, loading])

  return <SanityContentContext.Provider value={value}>{children}</SanityContentContext.Provider>
}

export function useSanityContent(): SanityContentValue | null {
  return useContext(SanityContentContext)
}
