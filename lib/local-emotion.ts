import { Emotion } from "@/lib/types";

// 감정별 키워드 정의
const EMOTION_KEYWORDS: Record<Emotion, string[]> = {
  행복: ["행복", "좋다", "즐겁", "기쁘", "좋았", "웃", "♥", "❤"],
  신남: ["신남", "최고", "짱", "대박", "환상적", "완벽", "!!", "너무 좋"],
  슬픔: ["슬프", "우울", "눈물", "아쉽", "그립", "힘들"],
  분노: ["화나", "짜증", "분노", "열받", "싫", "미치"],
  평범: [] // 기본값이므로 키워드 없음
};

// 간단한 로컬 감정 분석 함수 (API 호출 없이 작동)
export function analyzeEmotionLocally(content: string): Emotion {
  const lowerContent = content.toLowerCase();
  
  // 특수 복합 조건 확인 (주말 + 좋다/행복)
  if (lowerContent.includes("주말") && 
      (lowerContent.includes("좋") || lowerContent.includes("행복"))) {
    return "행복";
  }
  
  // 각 감정별 키워드 확인
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    if (emotion === "평범") continue; // 평범은 기본값이므로 건너뜀
    
    if (keywords.some(keyword => lowerContent.includes(keyword))) {
      return emotion as Emotion;
    }
  }
  
  // 기본값
  return "평범";
} 
