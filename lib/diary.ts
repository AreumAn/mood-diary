import { DiaryEntry, Emotion, KoreanEmotion, emotionMapping } from "./types";

const STORAGE_KEY = "diaries";


// 데이터 마이그레이션 함수
const migrateEmotions = () => {
  if (typeof window === "undefined") return;
  
  const storedDiaries = localStorage.getItem(STORAGE_KEY);
  if (!storedDiaries) return;
  
  try {
    const diaries: DiaryEntry[] = JSON.parse(storedDiaries);
    const migratedDiaries = diaries.map(diary => ({
      ...diary,
      emotion: convertEmotion(diary.emotion)
    }));
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedDiaries));
    console.log("감정 데이터 마이그레이션 완료");
  } catch (error) {
    console.error("감정 데이터 마이그레이션 실패:", error);
  }
};

// 로컬 스토리지에서 모든 일기 가져오기
export function getAllDiaries(): DiaryEntry[] {
  if (typeof window === "undefined") return [];
  
  // 데이터 마이그레이션 실행
  migrateEmotions();
  
  const storedDiaries = localStorage.getItem(STORAGE_KEY);
  if (!storedDiaries) return [];
  
  try {
    return JSON.parse(storedDiaries);
  } catch (error) {
    console.error("일기 데이터 파싱 오류:", error);
    return [];
  }
}

// 특정 ID의 일기 가져오기
export function getDiaryById(id: string): DiaryEntry | undefined {
  const diaries = getAllDiaries();
  return diaries.find((diary) => diary.id === id);
}

// 새 일기 저장
export function saveDiary(diary: Partial<DiaryEntry>): DiaryEntry {
  const diaries = getAllDiaries();
  
  const newDiary: DiaryEntry = {
    id: crypto.randomUUID(),
    title: diary.title || "무제",
    content: diary.content || "",
    createdAt: diary.createdAt || new Date().toISOString(),
    emotion: diary.emotion,
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newDiary, ...diaries]));
  return newDiary;
}

// 일기 수정
export function updateDiary(diary: DiaryEntry): DiaryEntry {
  const diaries = getAllDiaries();
  const updatedDiaries = diaries.map((d) => 
    d.id === diary.id ? diary : d
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDiaries));
  return diary;
}

// 일기 삭제
export function deleteDiary(id: string): void {
  const diaries = getAllDiaries();
  const filteredDiaries = diaries.filter((diary) => diary.id !== id);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDiaries));
} 
