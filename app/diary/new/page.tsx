"use client"

import { DiaryForm } from "@/components/DiaryForm"
import { BookPlus } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { t } from "@/lib/translations"

export default function NewDiaryPage() {
  const { language } = useLanguage()
  
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white flex items-center">
          <BookPlus className="mr-2 h-8 w-8 text-indigo-500" />
          {t("writeNewDiary", language)}
        </h1>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <DiaryForm />
        </div>
      </div>
    </div>
  )
}

