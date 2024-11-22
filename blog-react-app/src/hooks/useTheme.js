import { useState, useCallback, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("blog_theme");
    return stored || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("blog_theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setSpecificTheme = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark: theme === "dark",
  };
}
