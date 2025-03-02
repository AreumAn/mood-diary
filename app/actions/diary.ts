"use server";

import { DiaryEntry, Emotion } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { analyzeEmotionLocally } from "@/lib/local-emotion";

// 감정 분석 Server Action
export async function analyzeEmotion(content: string): Promise<Emotion> {
  try {
    // API 라우트를 통해 감정 분석 요청
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emotion-analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    return data.emotion as Emotion;
  } catch (error) {
    console.error("감정 분석 중 오류 발생:", error);
    // 오류 발생 시 로컬 분석 사용
    return analyzeEmotionLocally(content);
  }
}

// 일기 저장 및 감정 분석 Server Action
export async function saveDiaryWithEmotion(diary: {
  id?: string;
  title: string;
  content: string;
  createdAt: string;
}): Promise<{ success: boolean; diary?: DiaryEntry; error?: string }> {
  try {
    // 감정 분석
    const emotion = await analyzeEmotion(diary.content);
    
    // 클라이언트에서 저장할 수 있도록 데이터 반환
    const diaryWithEmotion: DiaryEntry = {
      id: diary.id || crypto.randomUUID(),
      title: diary.title,
      content: diary.content,
      createdAt: diary.createdAt,
      emotion: emotion,
    };
    
    revalidatePath("/");
    return { success: true, diary: diaryWithEmotion };
  } catch (error) {
    console.error("일기 저장 중 오류 발생:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다." 
    };
  }
} 
