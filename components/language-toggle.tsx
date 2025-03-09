"use client";

import { useLanguage } from "@/lib/language-provider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { t } from "@/lib/translations";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  const isKorean = language === "ko";

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="language-toggle" className="text-sm cursor-pointer">
        {t("languageCode", language)}
      </Label>
      <Switch
        id="language-toggle"
        checked={isKorean}
        onCheckedChange={(checked) => setLanguage(checked ? "ko" : "en")}
      />
    </div>
  );
} 
