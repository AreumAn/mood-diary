export type Emotion = "행복" | "슬픔" | "분노" | "평범" | "신남";

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO 문자열 형식
  emotion?: Emotion; // 감정 분석 결과
} 
