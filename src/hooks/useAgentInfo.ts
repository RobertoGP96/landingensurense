import { useEffect, useState } from "react";

export type AgentInfo = {
  label: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  address: string;
  photo?: string;
};

const STORAGE_KEY = "mcs.agentInfo.v1";

export function readAgentInfo(): Partial<AgentInfo> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as Partial<AgentInfo>;
  } catch {
    // ignore corrupted storage
  }
  return null;
}

export function writeAgentInfo(info: AgentInfo): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  window.dispatchEvent(new CustomEvent("mcs:agent-info-updated"));
}

export function clearAgentInfo(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("mcs:agent-info-updated"));
}

export function useAgentInfo(fallback?: AgentInfo): AgentInfo | undefined {
  const [stored, setStored] = useState<Partial<AgentInfo> | null>(() => readAgentInfo());

  useEffect(() => {
    const handler = () => setStored(readAgentInfo());
    window.addEventListener("mcs:agent-info-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("mcs:agent-info-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!fallback && !stored) return undefined;
  return { ...(fallback ?? ({} as AgentInfo)), ...(stored ?? {}) };
}
