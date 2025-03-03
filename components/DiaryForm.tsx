"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { DiaryEntry } from "@/lib/types"
import { saveDiary, updateDiary } from "@/lib/diary"
import { saveDiaryWithEmotion } from "@/app/actions/diary"
import { format } from "date-fns"
import { ko, enUS } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-provider"
import { t } from "@/lib/translations"

interface DiaryFormProps {
  diary?: DiaryEntry
  isEditing?: boolean
}

export function DiaryForm({ diary, isEditing = false }: DiaryFormProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const [content, setContent] = useState(diary?.content || "")
  const [date, setDate] = useState<Date>(diary ? new Date(diary.createdAt) : new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 날짜 형식 및 로케일 설정
  const dateLocale = language === "ko" ? ko : enUS
  const formatTitle = (date: Date) => {
    if (language === "ko") {
      return format(date, "yyyy년 MM월 dd일의 일기", { locale: ko })
    } else {
      return format(date, "'Diary for' MMMM d, yyyy", { locale: enUS })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const title = formatTitle(date)

      if (isEditing && diary) {
        const result = await saveDiaryWithEmotion({
          id: diary.id,
          title,
          content,
          createdAt: date.toISOString(),
        }, language)

        if (result.success && result.diary) {
          updateDiary(result.diary)
        } else {
          throw new Error(result.error || t("errorSaving", language))
        }
      } else {
        const result = await saveDiaryWithEmotion({
          title,
          content,
          createdAt: date.toISOString(),
        }, language)

        if (result.success && result.diary) {
          saveDiary(result.diary)
        } else {
          throw new Error(result.error || t("errorSaving", language))
        }
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("일기 저장 중 오류 발생:", error)
      setError(error instanceof Error ? error.message : t("unknownError", language))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("date", language)}</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: dateLocale }) : <span>{t("selectDate", language)}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
              locale={dateLocale}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t("diaryContent", language)}
        </label>
        <Textarea
          id="content"
          placeholder={t("diaryPlaceholder", language)}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[300px] resize-none"
        />
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          {t("cancel", language)}
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          {isSubmitting ? t("saving", language) : isEditing ? t("edit", language) : t("save", language)}
        </Button>
      </div>
    </form>
  )
}

