"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "ko" | "en";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko");

  // 초기 언어 설정 (클라이언트 사이드에서만 실행)
  useEffect(() => {
    // 로컬 스토리지에서 언어 가져오기
    const storedLanguage = localStorage.getItem("language") as Language | null;
    
    // 저장된 언어가 있으면 적용
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // 언어 토글 함수
  const toggleLanguage = () => {
    const newLanguage = language === "ko" ? "en" : "ko";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 커스텀 훅
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
} 
