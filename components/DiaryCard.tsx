"use client"

import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { DiaryEntry, Emotion, KoreanEmotion, emotionMapping } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { Smile, Frown, Angry, Meh, Zap } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { emotionTranslations } from "@/lib/translations"

const emotionConfig: Record<Emotion, { color: string; icon: React.ReactNode }> = {
  happy: { color: "bg-yellow-100 border-yellow-300", icon: <Smile className="h-5 w-5 text-yellow-500" /> },
  sad: { color: "bg-blue-100 border-blue-300", icon: <Frown className="h-5 w-5 text-blue-500" /> },
  angry: { color: "bg-red-100 border-red-300", icon: <Angry className="h-5 w-5 text-red-500" /> },
  neutral: { color: "bg-gray-100 border-gray-300", icon: <Meh className="h-5 w-5 text-gray-500" /> },
  excited: { color: "bg-green-100 border-green-300", icon: <Zap className="h-5 w-5 text-green-500" /> },
}

// 한글 감정 값을 영어로 변환하는 함수
const getEmotionKey = (emotion: string | undefined): Emotion | undefined => {
  if (!emotion) return undefined;
  
  // 이미 영어 감정 값인 경우
  if (emotion in emotionConfig) {
    return emotion as Emotion;
  }
  
  // 한글 감정 값인 경우 변환
  const koreanEmotions: Record<string, Emotion> = {
    "행복": "happy",
    "슬픔": "sad",
    "분노": "angry",
    "평범": "neutral",
    "신남": "excited"
  };
  
  return koreanEmotions[emotion as string] || "neutral";
};

interface DiaryCardProps {
  diary: DiaryEntry
}

export function DiaryCard({ diary }: DiaryCardProps) {
  const { id, title, content, createdAt, emotion: rawEmotion } = diary
  const { language } = useLanguage()
  
  // 감정 값 변환
  const emotion = getEmotionKey(rawEmotion);

  const cardStyle = emotion
    ? `${emotionConfig[emotion].color} border`
    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"

  // 감정 번역
  const translatedEmotion = emotion ? emotionTranslations[emotion][language] : null

  return (
    <Link href={`/diary/${id}`}>
      <Card className={`${cardStyle} hover:shadow-lg transition-all duration-300 cursor-pointer`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-200">{title}</CardTitle>
          <div className="flex items-center">
            {emotion && (
              <>
                <span className="text-xs mr-2 font-medium">{translatedEmotion}</span>
                {emotionConfig[emotion].icon}
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{content}</p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-slate-500 dark:text-slate-500">{formatDate(createdAt)}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}

