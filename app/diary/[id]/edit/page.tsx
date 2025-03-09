"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DiaryForm } from "@/components/DiaryForm"
import type { DiaryEntry } from "@/lib/types"
import { Pencil } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { t } from "@/lib/translations"
import * as api from "@/lib/api"
import { toDiaryEntry } from "@/lib/types"

export default function EditDiaryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [diary, setDiary] = useState<DiaryEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const loadDiary = async () => {
      if (!id) return
      
      try {
        setIsLoading(true)
        // Fetch diary from Supabase
        const diaryData = await api.getDiary(id)
        
        if (!diaryData) {
          setDiary(null)
          setError(t("diaryNotFound", language))
          return
        }
        
        // Convert DiaryData to DiaryEntry
        const diaryEntry = toDiaryEntry(diaryData)
        setDiary(diaryEntry)
        setError(null)
      } catch (err) {
        console.error(`Error fetching diary with ID ${id}:`, err)
        setError(t("errorLoading", language))
        setDiary(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadDiary()
  }, [id, language, router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !diary) {
    return (
      <div className="container mx-auto py-8 text-center min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
          {error || t("diaryNotFound", language)}
        </h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white flex items-center">
          <Pencil className="mr-2 h-8 w-8 text-indigo-500" />
          {t("edit", language)}
        </h1>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <DiaryForm diary={diary} isEditing />
        </div>
      </div>
    </div>
  )
}

