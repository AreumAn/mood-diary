import { DiaryEntry } from "./types";

// 로컬 스토리지에서 모든 일기 가져오기
export function getAllDiaries(): DiaryEntry[] {
  if (typeof window === "undefined") return [];
  
  const diaries = localStorage.getItem("diaries");
  return diaries ? JSON.parse(diaries) : [];
}

// 특정 ID의 일기 가져오기
export function getDiaryById(id: string): DiaryEntry | undefined {
  const diaries = getAllDiaries();
  return diaries.find((diary) => diary.id === id);
}

// 새 일기 저장
export function saveDiary(diary: Omit<DiaryEntry, "id" | "createdAt">): DiaryEntry {
  const diaries = getAllDiaries();
  
  const newDiary: DiaryEntry = {
    id: crypto.randomUUID(),
    title: diary.title,
    content: diary.content,
    createdAt: new Date().toISOString(),
    emotion: diary.emotion,
  };
  
  localStorage.setItem("diaries", JSON.stringify([newDiary, ...diaries]));
  return newDiary;
}

// 일기 수정
export function updateDiary(diary: DiaryEntry): DiaryEntry {
  const diaries = getAllDiaries();
  const updatedDiaries = diaries.map((d) => 
    d.id === diary.id ? diary : d
  );
  
  localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
  return diary;
}

// 일기 삭제
export function deleteDiary(id: string): void {
  const diaries = getAllDiaries();
  const filteredDiaries = diaries.filter((diary) => diary.id !== id);
  
  localStorage.setItem("diaries", JSON.stringify(filteredDiaries));
} 
