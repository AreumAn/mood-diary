import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { DiaryEntry, Emotion } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { Smile, Frown, Angry, Meh, Zap } from "lucide-react"

const emotionConfig: Record<Emotion, { color: string; icon: React.ReactNode }> = {
  행복: { color: "bg-yellow-100 border-yellow-300", icon: <Smile className="h-5 w-5 text-yellow-500" /> },
  슬픔: { color: "bg-blue-100 border-blue-300", icon: <Frown className="h-5 w-5 text-blue-500" /> },
  분노: { color: "bg-red-100 border-red-300", icon: <Angry className="h-5 w-5 text-red-500" /> },
  평범: { color: "bg-gray-100 border-gray-300", icon: <Meh className="h-5 w-5 text-gray-500" /> },
  신남: { color: "bg-green-100 border-green-300", icon: <Zap className="h-5 w-5 text-green-500" /> },
}

interface DiaryCardProps {
  diary: DiaryEntry
}

export function DiaryCard({ diary }: DiaryCardProps) {
  const { id, title, content, createdAt, emotion } = diary

  const cardStyle = emotion
    ? `${emotionConfig[emotion].color} border`
    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"

  return (
    <Link href={`/diary/${id}`}>
      <Card className={`${cardStyle} hover:shadow-lg transition-all duration-300 cursor-pointer`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-200">{title}</CardTitle>
          {emotion && emotionConfig[emotion].icon}
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

