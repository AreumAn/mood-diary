"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DiaryForm } from "@/components/DiaryForm"
import { getDiaryById } from "@/lib/diary"
import type { DiaryEntry } from "@/lib/types"
import { use } from "react"
import { Pencil } from "lucide-react"

export default function EditDiaryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [diary, setDiary] = useState<DiaryEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const id = use(params).id

  useEffect(() => {
    const loadDiary = () => {
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
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">일기를 찾을 수 없습니다</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white flex items-center">
          <Pencil className="mr-2 h-8 w-8 text-indigo-500" />
          일기 수정
        </h1>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <DiaryForm diary={diary} isEditing />
        </div>
      </div>
    </div>
  )
}

