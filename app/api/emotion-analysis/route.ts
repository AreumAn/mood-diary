import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Emotion, KoreanEmotion, emotionMapping } from "@/lib/types";
import { emotionTranslations } from "@/lib/translations";

// API 라우트 핸들러
export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 일기 내용과 언어 추출
    const { content, language = "en" } = await request.json();
    
    if (!content || typeof content !== 'string') {
      const errorMessage = language === "ko" 
        ? "유효한 일기 내용이 필요합니다." 
        : "Valid diary content is required.";
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }
    
    // API 키 검증
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const errorMessage = language === "ko" 
        ? "API 키가 구성되지 않았습니다." 
        : "API key is not configured.";
      return NextResponse.json(
        { error: errorMessage, emotion: "neutral" },
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
    
    // 프롬프트 생성 (언어에 따라 다른 프롬프트 사용)
    let prompt;
    if (language === "ko") {
      prompt = `
      당신은 일기 내용을 분석하여 감정을 분류하는 AI입니다.
      다음 감정 중 하나만 선택하세요: "happy", "sad", "angry", "neutral", "excited".
      이 영어 단어들은 각각 "행복", "슬픔", "분노", "평범", "신남"에 해당합니다.
      오직 영어 감정 단어 하나만 응답하세요.
      
      일기 내용: ${content}
      
      감정:`;
    } else {
      prompt = `
      You are an AI that analyzes diary content to classify emotions.
      Choose only one emotion from the following: "happy", "sad", "angry", "neutral", "excited".
      Respond with only one emotion word from the list.
      
      Diary content: ${content}
      
      Emotion:`;
    }
    
    // API 호출
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().toLowerCase();
    
    // 유효한 감정인지 확인
    const validEmotions: Emotion[] = ["happy", "sad", "angry", "neutral", "excited"];
    const emotion = validEmotions.includes(text as Emotion) ? text as Emotion : "neutral";
    
    // 응답 반환
    return NextResponse.json({ emotion });
  } catch (error) {
    console.error("감정 분석 중 오류 발생:", error);
    
    // 오류 발생 시 기본 감정 반환
    return NextResponse.json(
      { 
        error: "감정 분석 중 오류가 발생했습니다.", 
        emotion: "neutral" 
      },
      { status: 500 }
    );
  }
} 
