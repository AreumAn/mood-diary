export type Emotion = "happy" | "sad" | "angry" | "neutral" | "excited";

// 이전 한글 감정 타입 (하위 호환성 유지)
export type KoreanEmotion = "행복" | "슬픔" | "분노" | "평범" | "신남";

// 감정 매핑 (한글 -> 영어)
export const emotionMapping: Record<KoreanEmotion, Emotion> = {
  "행복": "happy",
  "슬픔": "sad",
  "분노": "angry",
  "평범": "neutral",
  "신남": "excited"
};

// 감정 매핑 (영어 -> 한글)
export const reverseEmotionMapping: Record<Emotion, KoreanEmotion> = {
  "happy": "행복",
  "sad": "슬픔",
  "angry": "분노",
  "neutral": "평범",
  "excited": "신남"
};

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO 문자열 형식
  emotion?: Emotion; // 감정 분석 결과
} 
