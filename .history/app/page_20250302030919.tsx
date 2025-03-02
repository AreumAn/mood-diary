"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiaryCard } from "@/components/DiaryCard"
import { getAllDiaries } from "@/lib/diary"
import { Plus, BookOpen } from "lucide-react"
import type { DiaryEntry } from "@/lib/types"

export default function Home() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDiaries = () => {
      const loadedDiaries = getAllDiaries()
      loadedDiaries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setDiaries(loadedDiaries)
      setIsLoading(false)
    }

    loadDiaries()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
          <BookOpen className="mr-2 h-8 w-8" />
          MoodDiary
        </h1>
        <Link href="/diary/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300">
            <Plus className="h-4 w-4 mr-2" />새 일기 작성
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">일기를 불러오는 중...</p>
        </div>
      ) : diaries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-700">
          <BookOpen className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">작성된 일기가 없습니다.</p>
          <Link href="/diary/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300">
              첫 일기 작성하기
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diaries.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </div>
      )}
    </div>
  )
}

