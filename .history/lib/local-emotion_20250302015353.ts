import { Emotion } from "@/lib/types";

// 감정별 키워드 정의
const EMOTION_KEYWORDS = {
  행복: [
    "행복", "좋다", "즐겁", "기쁘", "좋았", "웃", "♥", "❤", 
    // 복합 조건은 별도 처리
  ],
  신남: [
    "신남", "최고", "짱", "대박", "환상적", "완벽", "!!", "너무 좋"
  ],
  슬픔: [
    "슬프", "우울", "눈물", "아쉽", "그립", "힘들"
  ],
  분노: [
    "화나", "짜증", "분노", "열받", "싫", "미치"
  ]
};

// 간단한 로컬 감정 분석 함수 (API 호출 없이 작동)
export function analyzeEmotionLocally(content: string): Emotion {
  const lowerContent = content.toLowerCase();
  
  // 행복 관련 키워드 확인
  if (
    EMOTION_KEYWORDS.행복.some(keyword => lowerContent.includes(keyword)) ||
    (lowerContent.includes("주말") && (lowerContent.includes("좋") || lowerContent.includes("행복")))
  ) {
    return "행복";
  }
  
  // 신남 관련 키워드 확인
  if (EMOTION_KEYWORDS.신남.some(keyword => lowerContent.includes(keyword))) {
    return "신남";
  }
  
  // 슬픔 관련 키워드 확인
  if (EMOTION_KEYWORDS.슬픔.some(keyword => lowerContent.includes(keyword))) {
    return "슬픔";
  }
  
  // 분노 관련 키워드 확인
  if (EMOTION_KEYWORDS.분노.some(keyword => lowerContent.includes(keyword))) {
    return "분노";
  }
  
  // 기본값
  return "평범";
} 
