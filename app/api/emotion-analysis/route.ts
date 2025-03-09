import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Emotion, KoreanEmotion, emotionMapping } from "@/lib/types";
import { emotionTranslations, t } from "@/lib/translations";
import { Language } from "@/lib/translations";

// API 라우트 핸들러
export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 일기 내용과 언어 추출
    const { content, language = "en" } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: t("validContentRequired", language as Language) },
        { status: 400 }
      );
    }
    
    // API 키 검증
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: t("apiKeyNotConfigured", language as Language), emotion: "neutral" },
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
    const prompt = t("emotionAnalysisPrompt", language as Language).replace("{{content}}", content);
    
    console.log("Gemini API 요청 프롬프트:", prompt);
    
    // API 호출
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim().toLowerCase();
    
    console.log("Gemini API 원본 응답:", response);
    console.log("Gemini API 텍스트 응답:", text);
    
    // 응답에서 감정 단어만 추출 (다른 텍스트가 포함된 경우)
    const emotionWords = ["happy", "sad", "angry", "neutral", "excited"];
    let extractedEmotion = null;
    
    // 정확히 일치하는 단어 찾기
    for (const emotion of emotionWords) {
      if (text === emotion) {
        extractedEmotion = emotion;
        break;
      }
    }
    
    // 정확히 일치하는 단어가 없으면 포함된 단어 찾기
    if (!extractedEmotion) {
      for (const emotion of emotionWords) {
        if (text.includes(emotion)) {
          extractedEmotion = emotion;
          break;
        }
      }
    }
    
    // 유효한 감정인지 확인
    const validEmotions: Emotion[] = ["happy", "sad", "angry", "neutral", "excited"];
    const emotion = extractedEmotion && validEmotions.includes(extractedEmotion as Emotion) 
      ? extractedEmotion as Emotion 
      : "neutral";
    
    console.log("최종 감정 결과:", emotion, "원본 텍스트:", text);
    
    // 응답 반환
    return NextResponse.json({ emotion });
  } catch (error) {
    console.error("감정 분석 중 오류 발생:", error);
    
    // 오류 세부 정보 로깅
    if (error instanceof Error) {
      console.error("에러 메시지:", error.message);
      console.error("에러 스택:", error.stack);
    }
    
    // 오류 발생 시 기본 감정 반환
    return NextResponse.json(
      { 
        error: t("emotionAnalysisError", "ko"), 
        emotion: "neutral" 
      },
      { status: 500 }
    );
  }
} 
