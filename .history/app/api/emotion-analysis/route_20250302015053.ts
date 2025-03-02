import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// API 라우트 핸들러
export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 일기 내용 추출
    const { content } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: "유효한 일기 내용이 필요합니다." },
        { status: 400 }
      );
    }
    
    // API 키 검증
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API 키가 구성되지 않았습니다.", emotion: "평범" },
        { status: 500 }
      );
    }
    
    // Gemini API 클라이언트 초기화
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 모델 초기화
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
    
    // API 호출
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // 유효한 감정인지 확인
    const validEmotions = ["행복", "슬픔", "분노", "평범", "신남"];
    const emotion = validEmotions.includes(text) ? text : "평범";
    
    // 응답 반환
    return NextResponse.json({ emotion });
  } catch (error) {
    console.error("감정 분석 중 오류 발생:", error);
    
    // 오류 발생 시 기본 감정 반환
    return NextResponse.json(
      { error: "감정 분석 중 오류가 발생했습니다.", emotion: "평범" },
      { status: 500 }
    );
  }
} 
