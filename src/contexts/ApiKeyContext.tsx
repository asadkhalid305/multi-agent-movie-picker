"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  hasApiKey: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

const STORAGE_KEY = "openai_api_key";

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load API key from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setApiKeyState(stored);
    }
    setIsHydrated(true);
  }, []);

  const setApiKey = (key: string) => {
    sessionStorage.setItem(STORAGE_KEY, key);
    setApiKeyState(key);
  };

  const clearApiKey = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setApiKeyState(null);
  };

  const hasApiKey = !!apiKey;

  // Don't render children until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <ApiKeyContext.Provider
      value={{ apiKey, setApiKey, clearApiKey, hasApiKey }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
}
