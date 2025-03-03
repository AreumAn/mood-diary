import { Emotion } from "@/lib/types";

// 감정별 키워드 정의
const EMOTION_KEYWORDS: Record<Emotion, { ko: string[]; en: string[] }> = {
  행복: {
    ko: ["행복", "좋다", "즐겁", "기쁘", "좋았", "웃", "♥", "❤"],
    en: ["happy", "joy", "glad", "pleased", "delighted", "smile", "laugh", "wonderful", "great"]
  },
  신남: {
    ko: ["신남", "최고", "짱", "대박", "환상적", "완벽", "!!", "너무 좋"],
    en: ["excited", "amazing", "awesome", "fantastic", "perfect", "incredible", "!!", "love it"]
  },
  슬픔: {
    ko: ["슬프", "우울", "눈물", "아쉽", "그립", "힘들"],
    en: ["sad", "depressed", "tears", "miss", "regret", "difficult", "hard", "upset"]
  },
  분노: {
    ko: ["화나", "짜증", "분노", "열받", "싫", "미치"],
    en: ["angry", "annoyed", "frustrated", "hate", "mad", "furious", "upset"]
  },
  평범: {
    ko: [], // 기본값이므로 키워드 없음
    en: []  // 기본값이므로 키워드 없음
  }
};

// 간단한 로컬 감정 분석 함수 (API 호출 없이 작동)
export function analyzeEmotionLocally(content: string, language: "ko" | "en" = "ko"): Emotion {
  const lowerContent = content.toLowerCase();
  
  // 특수 복합 조건 확인
  if (language === "ko") {
    // 한국어 특수 조건
    if (lowerContent.includes("주말") && 
        (lowerContent.includes("좋") || lowerContent.includes("행복"))) {
      return "행복";
    }
  } else {
    // 영어 특수 조건
    if (lowerContent.includes("weekend") && 
        (lowerContent.includes("good") || lowerContent.includes("happy"))) {
      return "행복";
    }
  }
  
  // 각 감정별 키워드 확인
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    if (emotion === "평범") continue; // 평범은 기본값이므로 건너뜀
    
    const langKeywords = language === "ko" ? keywords.ko : keywords.en;
    
    if (langKeywords.some(keyword => lowerContent.includes(keyword))) {
      return emotion as Emotion;
    }
  }
  
  // 기본값
  return "평범";
} 
