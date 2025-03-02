import OpenAI from "openai";

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 감정 분석 함수
export async function analyzeDiaryEmotion(content: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `당신은 일기 내용을 분석하여 감정을 분류하는 AI입니다. 
          다음 감정 중 하나만 선택하세요: "행복", "슬픔", "분노", "평범", "신남".
          오직 감정 단어 하나만 응답하세요.`
        },
        {
          role: "user",
          content: content
        }
      ],
      temperature: 0.3,
      max_tokens: 10,
    });

    // 응답에서 감정 추출
    const emotion = response.choices[0].message.content?.trim();
    
    // 유효한 감정인지 확인
    if (["행복", "슬픔", "분노", "평범", "신남"].includes(emotion || "")) {
      return emotion || "평범";
    } else {
      // 유효하지 않은 응답이면 기본값 반환
      return "평범";
    }
  } catch (error) {
    console.error("감정 분석 중 오류 발생:", error);
    return "평범"; // 오류 발생 시 기본값
  }
} 
