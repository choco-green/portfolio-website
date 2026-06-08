import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "portfolio-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" ? stored : null;
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function useThemePreference() {
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("light");
  const [manualTheme, setManualTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = readStoredTheme();
    const resolved = stored ?? getSystemTheme();
    setManualTheme(stored);
    setResolvedTheme(resolved);
    applyTheme(resolved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme() === null) {
        const next = getSystemTheme();
        setResolvedTheme(next);
        applyTheme(next);
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    window.localStorage.setItem(storageKey, theme);
    setManualTheme(theme);
    setResolvedTheme(theme);
    applyTheme(theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return {
    resolvedTheme,
    manualTheme,
    toggleTheme
  };
}
