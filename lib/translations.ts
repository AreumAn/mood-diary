import { Emotion } from "./types";

type TranslationKey = 
  | "delete"
  | "deleteDiary"
  | "deleteConfirm"
  | "yes"
  | "no"
  | "errorDeleting"
  | "newDiary"
  | "title"
  | "content"
  | "save"
  | "cancel"
  | "diaryList"
  | "loading"
  | "errorLoading"
  | "edit"
  | "back"
  | "happy"
  | "sad"
  | "angry"
  | "neutral"
  | "excited"
  | "appName"
  | "noDiaries"
  | "writeFirstDiary"
  | "date"
  | "selectDate"
  | "diaryContent"
  | "diaryPlaceholder"
  | "saving"
  | "unknownError"
  | "diaryDate"
  | "errorSaving"
  | "changeTheme"
  | "pageNotFound"
  | "pageNotFoundDesc"
  | "backToHome"
  | "writeNewDiary"
  | "diaryNotFound"
  | "emotion"
  | "backToList";

export type Language = "ko" | "en";

type Translations = {
  [key in TranslationKey]: {
    ko: string;
    en: string;
  };
};

const translations: Translations = {
  delete: {
    ko: "삭제",
    en: "Delete"
  },
  deleteDiary: {
    ko: "일기 삭제",
    en: "Delete Diary"
  },
  deleteConfirm: {
    ko: "정말로 이 일기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    en: "Are you sure you want to delete this diary? This action cannot be undone."
  },
  yes: {
    ko: "예",
    en: "Yes"
  },
  no: {
    ko: "아니오",
    en: "No"
  },
  errorDeleting: {
    ko: "일기 삭제 중 오류가 발생했습니다.",
    en: "An error occurred while deleting the diary."
  },
  newDiary: {
    ko: "새 일기 작성",
    en: "Write New Diary"
  },
  title: {
    ko: "제목",
    en: "Title"
  },
  content: {
    ko: "내용",
    en: "Content"
  },
  save: {
    ko: "저장하기",
    en: "Save"
  },
  cancel: {
    ko: "취소",
    en: "Cancel"
  },
  diaryList: {
    ko: "일기 목록",
    en: "Diary List"
  },
  loading: {
    ko: "로딩 중...",
    en: "Loading..."
  },
  errorLoading: {
    ko: "일기를 불러오는 중 오류가 발생했습니다.",
    en: "An error occurred while loading the diary."
  },
  edit: {
    ko: "수정하기",
    en: "Edit"
  },
  back: {
    ko: "뒤로",
    en: "Back"
  },
  happy: {
    ko: "행복",
    en: "Happy"
  },
  sad: {
    ko: "슬픔",
    en: "Sad"
  },
  angry: {
    ko: "분노",
    en: "Angry"
  },
  neutral: {
    ko: "평범",
    en: "Neutral"
  },
  excited: {
    ko: "신남",
    en: "Excited"
  },
  appName: {
    ko: "감정 일기장",
    en: "Mood Diary"
  },
  noDiaries: {
    ko: "작성된 일기가 없습니다.",
    en: "No diaries yet."
  },
  writeFirstDiary: {
    ko: "첫 일기 작성하기",
    en: "Write your first diary"
  },
  date: {
    ko: "날짜 선택",
    en: "Date"
  },
  selectDate: {
    ko: "날짜 선택",
    en: "Select date"
  },
  diaryContent: {
    ko: "일기 내용",
    en: "Diary content"
  },
  diaryPlaceholder: {
    ko: "오늘의 일기를 작성해보세요...",
    en: "Write your diary for today..."
  },
  saving: {
    ko: "분석 및 저장 중...",
    en: "Analyzing & Saving..."
  },
  errorSaving: {
    ko: "일기 저장 중 오류가 발생했습니다.",
    en: "Error occurred while saving the diary."
  },
  unknownError: {
    ko: "알 수 없는 오류가 발생했습니다.",
    en: "An unknown error occurred."
  },
  diaryDate: {
    ko: "yyyy년 MM월 dd일의 일기",
    en: "Diary for MMMM D, YYYY"
  },
  changeTheme: {
    ko: "테마 변경",
    en: "Change theme"
  },
  pageNotFound: {
    ko: "페이지를 찾을 수 없습니다",
    en: "Page Not Found"
  },
  pageNotFoundDesc: {
    ko: "요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.",
    en: "The page you requested does not exist or may have been deleted."
  },
  backToHome: {
    ko: "홈으로 돌아가기",
    en: "Back to Home"
  },
  writeNewDiary: {
    ko: "새 일기 작성",
    en: "Write New Diary"
  },
  diaryNotFound: {
    ko: "일기를 찾을 수 없습니다",
    en: "Diary not found"
  },
  emotion: {
    ko: "감정",
    en: "Emotion"
  },
  backToList: {
    ko: "목록으로 돌아가기",
    en: "Back to List"
  }
};

export function t(key: TranslationKey, language: Language): string {
  return translations[key][language];
}

// 감정 번역
export const emotionTranslations: Record<Emotion, { en: string; ko: string }> = {
  "happy": { en: "Happy", ko: "행복" },
  "sad": { en: "Sad", ko: "슬픔" },
  "angry": { en: "Angry", ko: "분노" },
  "neutral": { en: "Neutral", ko: "평범" },
  "excited": { en: "Excited", ko: "신남" }
};
