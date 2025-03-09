import { EmotionType, DiaryData } from './api';

// api.ts의 EmotionType을 Emotion으로 재정의
export type Emotion = EmotionType;


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
