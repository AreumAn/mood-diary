"use client";

import { useLanguage } from "@/lib/language-provider";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-5" />;
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="language-toggle" className="text-sm font-medium cursor-pointer">
        <span className={language === "ko" ? "font-bold" : "opacity-60"}>KO</span>
      </Label>
      <Switch
        id="language-toggle"
        checked={language === "en"}
        onCheckedChange={toggleLanguage}
        aria-label="언어 변경 / Change language"
      />
      <Label htmlFor="language-toggle" className="text-sm font-medium cursor-pointer">
        <span className={language === "en" ? "font-bold" : "opacity-60"}>EN</span>
      </Label>
    </div>
  );
} 
