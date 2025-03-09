"use server";

import { DiaryEntry, Emotion } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { analyzeEmotionLocally } from "@/lib/local-emotion";
import * as api from "@/lib/api";
import { t } from "@/lib/translations";
import { Language } from "@/lib/translations";

// Emotion Analysis Server Action
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
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.emotion as Emotion;
  } catch (error) {
    console.error("Error during emotion analysis:", error);
    // Use local analysis when API fails
    return analyzeEmotionLocally(content, language);
  }
}

// Diary Saving and Emotion Analysis Server Action
export async function saveDiaryWithEmotion(diary: {
  id?: string;
  title: string;
  content: string;
  createdAt: string;
}, language: "ko" | "en" = "en"): Promise<{ success: boolean; diary?: DiaryEntry; error?: string }> {
  try {
    // Analyze emotion
    const emotion = await analyzeEmotion(diary.content, language);
    
    // Prepare diary data
    const diaryWithEmotion = {
      title: diary.title,
      content: diary.content,
      createdAt: diary.createdAt,
      emotion: emotion,
    };
    
    // Save to Supabase
    const savedDiary = await api.createDiary(diaryWithEmotion);
    
    revalidatePath("/");
    return { success: true, diary: savedDiary };
  } catch (error) {
    console.error("Error during diary saving:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : t("unknownError", language)
    };
  }
}

// Diary Update Server Action
export async function updateDiaryWithEmotion(diary: DiaryEntry, language: "ko" | "en" = "en"): Promise<{ success: boolean; diary?: DiaryEntry; error?: string }> {
  try {
    // Analyze emotion
    const emotion = await analyzeEmotion(diary.content, language);
    
    // Update emotion
    const updatedDiary: DiaryEntry = {
      ...diary,
      emotion: emotion,
    };
    
    // Save to Supabase
    const savedDiary = await api.updateDiary(updatedDiary);
    
    revalidatePath("/");
    revalidatePath(`/diary/${diary.id}`);
    
    return { success: true, diary: savedDiary };
  } catch (error) {
    console.error("Error during diary update:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : t("unknownError", language)
    };
  }
}

// Diary Delete Server Action
export async function deleteDiaryAction(id: string, language: Language = "en"): Promise<{ success: boolean; error?: string }> {
  try {
    // Delete from Supabase
    await api.deleteDiary(id);
    
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error during diary deletion:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : t("unknownError", language)
    };
  }
} 
