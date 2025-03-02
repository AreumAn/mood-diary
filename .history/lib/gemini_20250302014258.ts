import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Gemini API 클라이언트 초기화
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// 감정 분석 함수
export async function analyzeDiaryEmotion(content: string): Promise<string> {
  try {
    // API 키가 없는 경우 로컬 분석 사용
    if (!genAI) {
      console.log("Gemini API 키가 없어 로컬 감정 분석 사용");
      return analyzeEmotionLocally(content);
    }
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });
    
    // 프롬프트 생성
    const prompt = `
    당신은 일기 내용을 분석하여 감정을 분류하는 AI입니다.
    다음 감정 중 하나만 선택하세요: "행복", "슬픔", "분노", "평범", "신남".
    오직 감정 단어 하나만 응답하세요.
    
    일기 내용: ${content}
    
    감정:`;
    
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      console.log("Gemini API 응답:", text);
      
      // 유효한 감정인지 확인
      if (["행복", "슬픔", "분노", "평범", "신남"].includes(text)) {
        return text;
      } else {
        console.log("유효하지 않은 감정, 기본값 사용:", text);
        return "평범";
      }
    } catch (apiError) {
      console.error("Gemini API 호출 오류:", apiError);
      // API 오류 발생 시 로컬 분석으로 전환
      return analyzeEmotionLocally(content);
    }
  } catch (error) {
    console.error("감정 분석 중 오류 발생:", error);
    console.log("오류 발생으로 로컬 분석으로 전환");
    // 오류 발생 시 로컬 분석 사용
    return analyzeEmotionLocally(content);
  }
}

// 감정별 키워드 정의
const HAPPY_KEYWORDS = ["행복", "좋다", "즐겁", "기쁘", "좋았", "웃", "♥", "❤"];
const EXCITED_KEYWORDS = ["신남", "최고", "짱", "대박", "환상적", "완벽", "!!", "너무 좋"];
const SAD_KEYWORDS = ["슬프", "우울", "눈물", "아쉽", "그립", "힘들"];
const ANGRY_KEYWORDS = ["화나", "짜증", "분노", "열받", "싫", "미치"];

// 간단한 로컬 감정 분석 함수 (API 호출 없이 작동)
function analyzeEmotionLocally(content: string): string {
  const lowerContent = content.toLowerCase();
  
  // 행복 관련 키워드
  if (
    HAPPY_KEYWORDS.some(word => lowerContent.includes(word)) ||
    (lowerContent.includes("주말") && ["좋", "행복"].some(word => lowerContent.includes(word)))
  ) {
    return "행복";
  }
  
  // 신남 관련 키워드
  if (EXCITED_KEYWORDS.some(word => lowerContent.includes(word))) {
    return "신남";
  }
  
  // 슬픔 관련 키워드
  if (SAD_KEYWORDS.some(word => lowerContent.includes(word))) {
    return "슬픔";
  }
  
  // 분노 관련 키워드
  if (ANGRY_KEYWORDS.some(word => lowerContent.includes(word))) {
    return "분노";
  }
  
  // 기본값
  return "평범";
} 
