import OpenAI from "openai";

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 감정 분석 함수
export async function analyzeDiaryEmotion(content: string): Promise<string> {
  try {
    console.log("감정 분석 시작:", content); // 디버깅용 로그 추가
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `당신은 일기 내용을 분석하여 감정을 분류하는 AI입니다. 
          다음 감정 중 하나만 선택하세요: "행복", "슬픔", "분노", "평범", "신남".
          오직 감정 단어 하나만 응답하세요. 
          긍정적인 내용이나 기쁨을 표현하는 내용은 "행복"으로 분류하세요.
          매우 긍정적이거나 흥분된 내용은 "신남"으로 분류하세요.`
        },
        {
          role: "user",
          content: content
        }
      ],
      temperature: 0.3,
      max_tokens: 10,
    });

    // 응답 전체 로깅
    console.log("API 응답:", response.choices[0].message);
    
    // 응답에서 감정 추출
    const emotion = response.choices[0].message.content?.trim();
    console.log("추출된 감정:", emotion);
    
    // 유효한 감정인지 확인
    if (["행복", "슬픔", "분노", "평범", "신남"].includes(emotion || "")) {
      return emotion || "평범";
    } else {
      console.log("유효하지 않은 감정, 기본값 사용:", emotion);
      return "평범";
    }
  } catch (error) {
    console.error("감정 분석 중 오류 발생:", error);
    return "평범"; // 오류 발생 시 기본값
  }
} 
