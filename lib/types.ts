import { EmotionType, DiaryData } from './api';

// api.ts의 EmotionType을 Emotion으로 재정의
export type Emotion = EmotionType;

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

// api.ts의 DiaryData를 DiaryEntry로 재정의
export interface DiaryEntry extends Omit<DiaryData, 'updatedAt'> {
  // updatedAt 필드는 선택적으로 유지
  updatedAt?: string;
}

// DiaryEntry와 DiaryData 간 변환 함수
export function toDiaryData(entry: DiaryEntry): DiaryData {
  return {
    id: entry.id,
    title: entry.title,
    content: entry.content,
    createdAt: entry.createdAt,
    emotion: entry.emotion,
    updatedAt: entry.updatedAt
  };
}

export function toDiaryEntry(data: DiaryData): DiaryEntry {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    createdAt: data.createdAt,
    emotion: data.emotion,
    updatedAt: data.updatedAt
  };
} 
