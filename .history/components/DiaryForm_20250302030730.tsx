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
import { ko } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DiaryFormProps {
  diary?: DiaryEntry
  isEditing?: boolean
}

export function DiaryForm({ diary, isEditing = false }: DiaryFormProps) {
  const router = useRouter()
  const [content, setContent] = useState(diary?.content || "")
  const [date, setDate] = useState<Date>(diary ? new Date(diary.createdAt) : new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const title = format(date, "yyyy년 MM월 dd일의 일기", { locale: ko })

      if (isEditing && diary) {
        const result = await saveDiaryWithEmotion({
          id: diary.id,
          title,
          content,
          createdAt: date.toISOString(),
        })

        if (result.success && result.diary) {
          updateDiary(result.diary)
        } else {
          throw new Error(result.error || "일기 수정 중 오류가 발생했습니다.")
        }
      } else {
        const result = await saveDiaryWithEmotion({
          title,
          content,
          createdAt: date.toISOString(),
        })

        if (result.success && result.diary) {
          saveDiary(result.diary)
        } else {
          throw new Error(result.error || "일기 저장 중 오류가 발생했습니다.")
        }
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("일기 저장 중 오류 발생:", error)
      setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">날짜 선택</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: ko }) : <span>날짜 선택</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
              locale={ko}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          일기 내용
        </label>
        <Textarea
          id="content"
          placeholder="오늘의 일기를 작성해보세요..."
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
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          {isSubmitting ? "분석 및 저장 중..." : isEditing ? "수정하기" : "저장하기"}
        </Button>
      </div>
    </form>
  )
}

