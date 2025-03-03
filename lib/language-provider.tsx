"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Language } from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko");

  // 초기 언어 설정 (클라이언트 사이드에서만 실행)
  useEffect(() => {
    // 로컬 스토리지에서 언어 설정 가져오기
    const storedLanguage = localStorage.getItem("language") as Language | null;
    
    // 저장된 언어 설정이 있으면 적용
    if (storedLanguage && (storedLanguage === "ko" || storedLanguage === "en")) {
      setLanguage(storedLanguage);
    }
  }, []);

  // 언어 변경 함수
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
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
