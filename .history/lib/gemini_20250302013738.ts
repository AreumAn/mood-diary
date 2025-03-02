import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Gemini API 클라이언트 초기화
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// 감정 분석 함수
export async function analyzeDiaryEmotion(content: string): Promise<string> {
  try {
    console.log("감정 분석 시작:", content);
    
    // API 키가 없는 경우 로컬 분석 사용
    if (!genAI) {
      console.log("Gemini API 키가 없어 로컬 감정 분석 사용");
      return analyzeEmotionLocally(content);
    }
    
    // 문서에 따라 최신 모델명으로 수정 (gemini-1.5-flash)
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
    
    // 프롬프트 생성 - 문서에 따라 단순화
    const prompt = `
    당신은 일기 내용을 분석하여 감정을 분류하는 AI입니다.
    다음 감정 중 하나만 선택하세요: "행복", "슬픔", "분노", "평범", "신남".
    오직 감정 단어 하나만 응답하세요.
    
    일기 내용: ${content}
    
    감정:`;
    
    try {
      // 문서에 따라 API 호출 방식 수정
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

// 간단한 로컬 감정 분석 함수 (API 호출 없이 작동)
function analyzeEmotionLocally(content: string): string {
  const lowerContent = content.toLowerCase();
  
  // 행복 관련 키워드
  if (
    lowerContent.includes("행복") || 
    lowerContent.includes("좋다") || 
    lowerContent.includes("즐겁") || 
    lowerContent.includes("기쁘") ||
    lowerContent.includes("좋았") ||
    lowerContent.includes("웃") ||
    lowerContent.includes("♥") ||
    lowerContent.includes("❤") ||
    lowerContent.includes("주말") && (lowerContent.includes("좋") || lowerContent.includes("행복"))
  ) {
    return "행복";
  }
  
  // 신남 관련 키워드
  if (
    lowerContent.includes("신남") || 
    lowerContent.includes("최고") || 
    lowerContent.includes("짱") || 
    lowerContent.includes("대박") ||
    lowerContent.includes("환상적") ||
    lowerContent.includes("완벽") ||
    lowerContent.includes("!!") ||
    lowerContent.includes("너무 좋")
  ) {
    return "신남";
  }
  
  // 슬픔 관련 키워드
  if (
    lowerContent.includes("슬프") || 
    lowerContent.includes("우울") || 
    lowerContent.includes("눈물") || 
    lowerContent.includes("아쉽") ||
    lowerContent.includes("그립") ||
    lowerContent.includes("힘들")
  ) {
    return "슬픔";
  }
  
  // 분노 관련 키워드
  if (
    lowerContent.includes("화나") || 
    lowerContent.includes("짜증") || 
    lowerContent.includes("분노") || 
    lowerContent.includes("열받") ||
    lowerContent.includes("싫") ||
    lowerContent.includes("미치")
  ) {
    return "분노";
  }
  
  // 기본값
  return "평범";
} 
