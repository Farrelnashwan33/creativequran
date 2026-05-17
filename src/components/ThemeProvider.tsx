"use client";

import React, { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const applyTheme = () => {
      const storedTheme = localStorage.getItem("settings_tema") || "Terang";
      const root = document.documentElement;

      if (storedTheme === "Gelap") {
        root.setAttribute("data-theme", "dark");
        root.classList.add("dark");
      } else if (storedTheme === "Ikuti Sistem") {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (systemDark) {
          root.setAttribute("data-theme", "dark");
          root.classList.add("dark");
        } else {
          root.setAttribute("data-theme", "light");
          root.classList.remove("dark");
        }
      } else {
        root.setAttribute("data-theme", "light");
        root.classList.remove("dark");
      }
    };

    applyTheme();

    window.addEventListener("settings_updated", applyTheme);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = () => {
      if (localStorage.getItem("settings_tema") === "Ikuti Sistem") {
        applyTheme();
      }
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("settings_updated", applyTheme);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return <>{children}</>;
}
