import { Emotion } from "./types";

type TranslationKey = 
  | "appName"
  | "newDiary"
  | "loading"
  | "noDiaries"
  | "writeFirstDiary"
  | "date"
  | "selectDate"
  | "diaryContent"
  | "diaryPlaceholder"
  | "cancel"
  | "save"
  | "edit"
  | "saving"
  | "delete"
  | "deleteConfirm"
  | "yes"
  | "no"
  | "errorSaving"
  | "errorDeleting"
  | "unknownError"
  | "diaryDate";

// 감정 번역
export const emotionTranslations: Record<Emotion, { en: string; ko: string }> = {
  "happy": { en: "Happy", ko: "행복" },
  "sad": { en: "Sad", ko: "슬픔" },
  "angry": { en: "Angry", ko: "분노" },
  "neutral": { en: "Neutral", ko: "평범" },
  "excited": { en: "Excited", ko: "신남" }
};

// 영어 번역
const en: Record<TranslationKey, string> = {
  appName: "Mood Diary",
  newDiary: "New Diary",
  loading: "Loading diaries...",
  noDiaries: "No diaries yet.",
  writeFirstDiary: "Write your first diary",
  date: "Date",
  selectDate: "Select date",
  diaryContent: "Diary content",
  diaryPlaceholder: "Write your diary for today...",
  cancel: "Cancel",
  save: "Save",
  edit: "Edit",
  saving: "Analyzing & Saving...",
  delete: "Delete",
  deleteConfirm: "Are you sure you want to delete this diary?",
  yes: "Yes",
  no: "No",
  errorSaving: "Error occurred while saving the diary.",
  errorDeleting: "Error occurred while deleting the diary.",
  unknownError: "An unknown error occurred.",
  diaryDate: "Diary for MMMM D, YYYY"
};

// 한국어 번역
const ko: Record<TranslationKey, string> = {
  appName: "감정 일기장",
  newDiary: "새 일기 작성",
  loading: "일기를 불러오는 중...",
  noDiaries: "작성된 일기가 없습니다.",
  writeFirstDiary: "첫 일기 작성하기",
  date: "날짜 선택",
  selectDate: "날짜 선택",
  diaryContent: "일기 내용",
  diaryPlaceholder: "오늘의 일기를 작성해보세요...",
  cancel: "취소",
  save: "저장하기",
  edit: "수정하기",
  saving: "분석 및 저장 중...",
  delete: "삭제",
  deleteConfirm: "이 일기를 삭제하시겠습니까?",
  yes: "예",
  no: "아니오",
  errorSaving: "일기 저장 중 오류가 발생했습니다.",
  errorDeleting: "일기 삭제 중 오류가 발생했습니다.",
  unknownError: "알 수 없는 오류가 발생했습니다.",
  diaryDate: "yyyy년 MM월 dd일의 일기"
};

// 번역 객체
export const translations = {
  en,
  ko
};

// 번역 함수
export function t(key: TranslationKey, language: "en" | "ko"): string {
  return translations[language][key];
} 
