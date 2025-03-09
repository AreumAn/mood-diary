import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// Type definition for Supabase table
export type EmotionType = 'happy' | 'sad' | 'angry' | 'neutral' | 'excited';

// Type matching Supabase table schema
export interface DiaryTable {
  id: string;
  title: string;
  content: string;
  created_at: string;
  emotion: EmotionType | null;
  updated_at: string | null;
}

// Type used in the application
export interface DiaryData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  emotion?: EmotionType;
  updatedAt?: string;
}

// Get diary list
export async function getDiaries(): Promise<DiaryData[]> {
  try {
    const { data, error } = await supabase
      .from('diaries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching diary list: ${error.message}`);
    }

    // Convert Supabase data format to app data format
    return (data as DiaryTable[]).map((diary) => ({
      id: diary.id,
      title: diary.title,
      content: diary.content,
      createdAt: diary.created_at,
      emotion: diary.emotion || undefined,
      updatedAt: diary.updated_at || undefined,
    }));
  } catch (error) {
    console.error('Error occurred while fetching diaries:', error);
    throw error;
  }
}

// Get specific diary
export async function getDiary(id: string): Promise<DiaryData | null> {
  try {
    const { data, error } = await supabase
      .from('diaries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching diary: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    const diary = data as DiaryTable;
    
    // Convert Supabase data format to app data format
    return {
      id: diary.id,
      title: diary.title,
      content: diary.content,
      createdAt: diary.created_at,
      emotion: diary.emotion || undefined,
      updatedAt: diary.updated_at || undefined,
    };
  } catch (error) {
    console.error(`Error occurred while fetching diary with ID ${id}:`, error);
    throw error;
  }
}

// Create diary
export async function createDiary(diary: Omit<DiaryData, 'id'>): Promise<DiaryData> {
  try {
    // Convert app data format to Supabase data format
    const newDiary: Omit<DiaryTable, 'id' | 'updated_at'> & { id?: string } = {
      title: diary.title,
      content: diary.content,
      created_at: diary.createdAt,
      emotion: diary.emotion || null,
    };

    // Generate UUID
    if (!newDiary.id) {
      newDiary.id = uuidv4();
    }

    const { data, error } = await supabase
      .from('diaries')
      .insert([newDiary])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating diary: ${error.message}`);
    }

    const createdDiary = data as DiaryTable;
    
    // Convert Supabase data format to app data format
    return {
      id: createdDiary.id,
      title: createdDiary.title,
      content: createdDiary.content,
      createdAt: createdDiary.created_at,
      emotion: createdDiary.emotion || undefined,
      updatedAt: createdDiary.updated_at || undefined,
    };
  } catch (error) {
    console.error('Error occurred while creating diary:', error);
    throw error;
  }
}

// Update diary
export async function updateDiary(diary: DiaryData): Promise<DiaryData> {
  try {
    // Convert app data format to Supabase data format
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
      throw new Error(`Error updating diary: ${error.message}`);
    }

    const updatedDiary = data as DiaryTable;
    
    // Convert Supabase data format to app data format
    return {
      id: updatedDiary.id,
      title: updatedDiary.title,
      content: updatedDiary.content,
      createdAt: updatedDiary.created_at,
      emotion: updatedDiary.emotion || undefined,
      updatedAt: updatedDiary.updated_at || undefined,
    };
  } catch (error) {
    console.error(`Error occurred while updating diary with ID ${diary.id}:`, error);
    throw error;
  }
}

// Delete diary
export async function deleteDiary(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('diaries')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting diary: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error(`Error occurred while deleting diary with ID ${id}:`, error);
    throw error;
  }
}

// Update emotion
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
      throw new Error(`Error updating emotion: ${error.message}`);
    }

    const updatedDiary = data as DiaryTable;
    
    // Convert Supabase data format to app data format
    return {
      id: updatedDiary.id,
      title: updatedDiary.title,
      content: updatedDiary.content,
      createdAt: updatedDiary.created_at,
      emotion: updatedDiary.emotion || undefined,
      updatedAt: updatedDiary.updated_at || undefined,
    };
  } catch (error) {
    console.error(`Error occurred while updating emotion for diary with ID ${id}:`, error);
    throw error;
  }
}
