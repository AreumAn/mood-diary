import { Emotion } from "@/lib/types";
import { Language, weekendHappyCondition } from "@/lib/translations";

// 감정별 키워드 정의
const EMOTION_KEYWORDS: Record<Emotion, { ko: string[]; en: string[] }> = {
  happy: {
    ko: ["행복", "좋다", "즐겁", "기쁘", "좋았", "웃", "♥", "❤"],
    en: ["happy", "joy", "glad", "pleased", "delighted", "smile", "laugh", "wonderful", "great"]
  },
  excited: {
    ko: ["신남", "최고", "짱", "대박", "환상적", "완벽", "!!", "너무 좋"],
    en: ["excited", "amazing", "awesome", "fantastic", "perfect", "incredible", "!!", "love it"]
  },
  sad: {
    ko: ["슬프", "우울", "눈물", "아쉽", "그립", "힘들"],
    en: ["sad", "depressed", "tears", "miss", "regret", "difficult", "hard", "upset"]
  },
  angry: {
    ko: ["화나", "짜증", "분노", "열받", "싫", "미치"],
    en: ["angry", "annoyed", "frustrated", "hate", "mad", "furious", "upset"]
  },
  neutral: {
    ko: [], // 기본값이므로 키워드 없음
    en: []  // 기본값이므로 키워드 없음
  }
};

// 간단한 로컬 감정 분석 함수 (API 호출 없이 작동)
export function analyzeEmotionLocally(content: string, language: Language = "en"): Emotion {
  const lowerContent = content.toLowerCase();
  
  // 특수 복합 조건 확인
  const condition = weekendHappyCondition[language];
  if (lowerContent.includes(condition.keyword1) && 
      condition.keyword2.some(keyword => lowerContent.includes(keyword))) {
    return "happy";
  }
  
  // 각 감정별 키워드 확인
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    if (emotion === "neutral") continue; // neutral은 기본값이므로 건너뜀
    
    const langKeywords = language === "ko" ? keywords.ko : keywords.en;
    
    if (langKeywords.some(keyword => lowerContent.includes(keyword))) {
      return emotion as Emotion;
    }
  }
  
  // 기본값
  return "neutral";
} 
