import { useSyncExternalStore } from "react";

type Entry = {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => boolean;
};

const cache = new Map<string, Entry>();

function entryFor(query: string): Entry {
  let entry = cache.get(query);
  if (!entry) {
    const mql = typeof window !== "undefined" ? window.matchMedia(query) : null;
    entry = {
      subscribe: (callback: () => void) => {
        if (!mql) return () => {};
        mql.addEventListener("change", callback);
        return () => mql.removeEventListener("change", callback);
      },
      getSnapshot: () => (mql ? mql.matches : false),
    };
    cache.set(query, entry);
  }
  return entry;
}

const getServerSnapshot = () => false;

export function useMediaQuery(query: string): boolean {
  const entry = entryFor(query);
  return useSyncExternalStore(entry.subscribe, entry.getSnapshot, getServerSnapshot);
}

export function useBreakpoints() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmall = useMediaQuery("(max-width: 480px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return { isMobile, isSmall, isDesktop };
}
