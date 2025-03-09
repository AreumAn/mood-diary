"use server";

import { DiaryEntry, Emotion } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { analyzeEmotionLocally } from "@/lib/local-emotion";
import * as api from "@/lib/api";
import { t } from "@/lib/translations";
import { Language } from "@/lib/translations";

// 감정 분석 Server Action
export async function analyzeEmotion(content: string, language: "ko" | "en" = "en"): Promise<Emotion> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emotion-analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, language }),
    });
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    return data.emotion as Emotion;
  } catch (error) {
    console.error("감정 분석 중 오류 발생:", error);
    // 오류 발생 시 로컬 분석 사용
    return analyzeEmotionLocally(content, language);
  }
}

// 일기 저장 및 감정 분석 Server Action
export async function saveDiaryWithEmotion(diary: {
  id?: string;
  title: string;
  content: string;
  createdAt: string;
}, language: "ko" | "en" = "en"): Promise<{ success: boolean; diary?: DiaryEntry; error?: string }> {
  try {
    // 감정 분석
    const emotion = await analyzeEmotion(diary.content, language);
    
    // 일기 데이터 준비
    const diaryWithEmotion = {
      title: diary.title,
      content: diary.content,
      createdAt: diary.createdAt,
      emotion: emotion,
    };
    
    // Supabase에 저장
    const savedDiary = await api.createDiary(diaryWithEmotion);
    
    revalidatePath("/");
    return { success: true, diary: savedDiary };
  } catch (error) {
    console.error("일기 저장 중 오류 발생:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : t("unknownError", language)
    };
  }
}

// 일기 업데이트 Server Action
export async function updateDiaryWithEmotion(diary: DiaryEntry, language: "ko" | "en" = "en"): Promise<{ success: boolean; diary?: DiaryEntry; error?: string }> {
  try {
    // 감정 분석
    const emotion = await analyzeEmotion(diary.content, language);
    
    // 감정 업데이트
    const updatedDiary: DiaryEntry = {
      ...diary,
      emotion: emotion,
    };
    
    // Supabase에 업데이트
    const savedDiary = await api.updateDiary(updatedDiary);
    
    revalidatePath("/");
    revalidatePath(`/diary/${diary.id}`);
    
    return { success: true, diary: savedDiary };
  } catch (error) {
    console.error("일기 업데이트 중 오류 발생:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : t("unknownError", language)
    };
  }
}

// 일기 삭제 Server Action
export async function deleteDiaryAction(id: string, language: Language = "en"): Promise<{ success: boolean; error?: string }> {
  try {
    // Supabase에서 삭제
    await api.deleteDiary(id);
    
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("일기 삭제 중 오류 발생:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : t("unknownError", language)
    };
  }
} 
