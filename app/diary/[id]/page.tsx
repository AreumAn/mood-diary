"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DeleteDiaryButton } from "@/components/DeleteDiaryButton"
import { getDiaryById } from "@/lib/diary"
import { formatDate } from "@/lib/utils"
import { Smile, Frown, Angry, Meh, Zap, Pencil, ArrowLeft } from "lucide-react"
import type { DiaryEntry, Emotion } from "@/lib/types"
import { useLanguage } from "@/lib/language-provider"
import { t } from "@/lib/translations"
import { emotionTranslations } from "@/lib/translations"

const emotionIcons: Record<Emotion, React.ReactNode> = {
  happy: <Smile className="h-6 w-6 text-yellow-500" />,
  sad: <Frown className="h-6 w-6 text-blue-500" />,
  angry: <Angry className="h-6 w-6 text-red-500" />,
  neutral: <Meh className="h-6 w-6 text-gray-500" />,
  excited: <Zap className="h-6 w-6 text-green-500" />,
}

export default function DiaryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [diary, setDiary] = useState<DiaryEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    const loadDiary = () => {
      if (!id) return
      
      const foundDiary = getDiaryById(id)
      if (foundDiary) {
        setDiary(foundDiary)
      } else {
        router.push("/")
      }
      setIsLoading(false)
    }

    loadDiary()
  }, [id, router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!diary) {
    return (
      <div className="container mx-auto py-8 text-center min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">{t("diaryNotFound", language)}</h2>
        <Link href="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300">
            {t("backToHome", language)}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">{diary.title}</h1>
          <div className="flex space-x-2">
            <Link href={`/diary/${diary.id}/edit`}>
              <Button variant="outline" size="sm" className="hover:bg-slate-100 dark:hover:bg-slate-700">
                <Pencil className="h-4 w-4 mr-2" />
                {t("edit", language)}
              </Button>
            </Link>
            <DeleteDiaryButton diaryId={diary.id} />
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-slate-600 dark:text-slate-400">{formatDate(diary.createdAt)}</p>
          {diary.emotion && (
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("emotion", language)}:</span>
              {emotionIcons[diary.emotion]}
              <span className="text-slate-700 dark:text-slate-300">
                {diary.emotion && emotionTranslations[diary.emotion][language]}
              </span>
            </div>
          )}
        </div>

        <div className="prose max-w-none dark:prose-invert">
          <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{diary.content}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button variant="outline" className="hover:bg-slate-100 dark:hover:bg-slate-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backToList", language)}
          </Button>
        </Link>
      </div>
    </div>
  )
}

