import { useSyncExternalStore } from "react";

const subscribe = (query: string) => (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

const getSnapshot = (query: string) => () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
};

const getServerSnapshot = () => false;

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(subscribe(query), getSnapshot(query), getServerSnapshot);
}

export function useBreakpoints() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmall = useMediaQuery("(max-width: 480px)");
  return { isMobile, isSmall };
}
