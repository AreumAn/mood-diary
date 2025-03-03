"use client";

import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/lib/language-provider";
import { t } from "@/lib/translations";

export function Navbar() {
  const { language } = useLanguage();
  
  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">{t("appName", language)}</h1>
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
} 
