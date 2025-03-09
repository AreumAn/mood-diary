import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// Supabase 테이블 타입 정의
export type EmotionType = 'happy' | 'sad' | 'angry' | 'neutral' | 'excited';

// Supabase 테이블 스키마에 맞는 타입
export interface DiaryTable {
  id: string;
  title: string;
  content: string;
  created_at: string;
  emotion: EmotionType | null;
  updated_at: string | null;
}

// 앱에서 사용할 타입
export interface DiaryData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  emotion?: EmotionType;
  updatedAt?: string;
}

// 일기 목록 조회
export async function getDiaries(): Promise<DiaryData[]> {
  try {
    const { data, error } = await supabase
      .from('diaries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`일기 목록 조회 오류: ${error.message}`);
    }

    // Supabase 데이터 형식을 앱 데이터 형식으로 변환
    return (data as DiaryTable[]).map((diary) => ({
      id: diary.id,
      title: diary.title,
      content: diary.content,
      createdAt: diary.created_at,
      emotion: diary.emotion || undefined,
      updatedAt: diary.updated_at || undefined,
    }));
  } catch (error) {
    console.error('일기 목록 조회 중 오류 발생:', error);
    throw error;
  }
}

// 특정 일기 조회
export async function getDiary(id: string): Promise<DiaryData | null> {
  try {
    const { data, error } = await supabase
      .from('diaries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`일기 조회 오류: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    const diary = data as DiaryTable;
    
    // Supabase 데이터 형식을 앱 데이터 형식으로 변환
    return {
      id: diary.id,
      title: diary.title,
      content: diary.content,
      createdAt: diary.created_at,
      emotion: diary.emotion || undefined,
      updatedAt: diary.updated_at || undefined,
    };
  } catch (error) {
    console.error(`ID ${id}로 일기 조회 중 오류 발생:`, error);
    throw error;
  }
}

// 일기 생성
export async function createDiary(diary: Omit<DiaryData, 'id'>): Promise<DiaryData> {
  try {
    // 앱 데이터 형식을 Supabase 데이터 형식으로 변환
    const newDiary: Omit<DiaryTable, 'id' | 'updated_at'> & { id?: string } = {
      title: diary.title,
      content: diary.content,
      created_at: diary.createdAt,
      emotion: diary.emotion || null,
    };

    // UUID 생성
    if (!newDiary.id) {
      newDiary.id = uuidv4();
    }

    const { data, error } = await supabase
      .from('diaries')
      .insert([newDiary])
      .select()
      .single();

    if (error) {
      throw new Error(`일기 생성 오류: ${error.message}`);
    }

    const createdDiary = data as DiaryTable;
    
    // Supabase 데이터 형식을 앱 데이터 형식으로 변환
    return {
      id: createdDiary.id,
      title: createdDiary.title,
      content: createdDiary.content,
      createdAt: createdDiary.created_at,
      emotion: createdDiary.emotion || undefined,
      updatedAt: createdDiary.updated_at || undefined,
    };
  } catch (error) {
    console.error('일기 생성 중 오류 발생:', error);
    throw error;
  }
}

// 일기 수정
export async function updateDiary(diary: DiaryData): Promise<DiaryData> {
  try {
    // 앱 데이터 형식을 Supabase 데이터 형식으로 변환
    const updateData: Partial<DiaryTable> = {
      title: diary.title,
      content: diary.content,
      created_at: diary.createdAt,
      emotion: diary.emotion || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('diaries')
      .update(updateData)
      .eq('id', diary.id)
      .select()
      .single();

    if (error) {
      throw new Error(`일기 수정 오류: ${error.message}`);
    }

    const updatedDiary = data as DiaryTable;
    
    // Supabase 데이터 형식을 앱 데이터 형식으로 변환
    return {
      id: updatedDiary.id,
      title: updatedDiary.title,
      content: updatedDiary.content,
      createdAt: updatedDiary.created_at,
      emotion: updatedDiary.emotion || undefined,
      updatedAt: updatedDiary.updated_at || undefined,
    };
  } catch (error) {
    console.error(`ID ${diary.id}로 일기 수정 중 오류 발생:`, error);
    throw error;
  }
}

// 일기 삭제
export async function deleteDiary(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('diaries')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`일기 삭제 오류: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error(`ID ${id}로 일기 삭제 중 오류 발생:`, error);
    throw error;
  }
}

// 감정 업데이트
export async function updateEmotion(id: string, emotion: EmotionType): Promise<DiaryData> {
  try {
    const { data, error } = await supabase
      .from('diaries')
      .update({
        emotion,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`감정 업데이트 오류: ${error.message}`);
    }

    const updatedDiary = data as DiaryTable;
    
    // Supabase 데이터 형식을 앱 데이터 형식으로 변환
    return {
      id: updatedDiary.id,
      title: updatedDiary.title,
      content: updatedDiary.content,
      createdAt: updatedDiary.created_at,
      emotion: updatedDiary.emotion || undefined,
      updatedAt: updatedDiary.updated_at || undefined,
    };
  } catch (error) {
    console.error(`ID ${id}로 감정 업데이트 중 오류 발생:`, error);
    throw error;
  }
}
