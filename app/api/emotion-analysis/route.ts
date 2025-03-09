import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Emotion, KoreanEmotion, emotionMapping } from "@/lib/types";
import { emotionTranslations, t } from "@/lib/translations";
import { Language } from "@/lib/translations";

// API route handler
export async function POST(request: NextRequest) {
  try {
    // Extract diary content and language from request body
    const { content, language = "en" } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: t("validContentRequired", language as Language) },
        { status: 400 }
      );
    }
    
    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: t("apiKeyNotConfigured", language as Language), emotion: "neutral" },
        { status: 500 }
      );
    }
    
    // Initialize Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Initialize model
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
    
    // Generate prompt
    const prompt = t("emotionAnalysisPrompt", language as Language).replace("{{content}}", content);
    
    console.log("Gemini API request prompt:", prompt);
    
    // API call
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim().toLowerCase();
    
    console.log("Gemini API original response:", response);
    console.log("Gemini API text response:", text);
    
    // Extract emotion words from response (if other text is included)
    const emotionWords = ["happy", "sad", "angry", "neutral", "excited"];
    let extractedEmotion = null;
    
    // Find exact match
    for (const emotion of emotionWords) {
      if (text === emotion) {
        extractedEmotion = emotion;
        break;
      }
    }
    
    // If no exact match, find included word
    if (!extractedEmotion) {
      for (const emotion of emotionWords) {
        if (text.includes(emotion)) {
          extractedEmotion = emotion;
          break;
        }
      }
    }
    
    // Validate valid emotion
    const validEmotions: Emotion[] = ["happy", "sad", "angry", "neutral", "excited"];
    const emotion = extractedEmotion && validEmotions.includes(extractedEmotion as Emotion) 
      ? extractedEmotion as Emotion 
      : "neutral";
    
    console.log("Final emotion result:", emotion, "Original text:", text);
    
    // Return response
    return NextResponse.json({ emotion });
  } catch (error) {
    console.error("Error occurred during emotion analysis:", error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // Return default emotion if error occurs
    return NextResponse.json(
      { 
        error: t("emotionAnalysisError", "ko"), 
        emotion: "neutral" 
      },
      { status: 500 }
    );
  }
} 
