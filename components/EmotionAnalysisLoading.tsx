"use client"

import { useState, useEffect } from "react"

export function EmotionAnalysisLoading() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <div className="text-lg font-medium mb-2 text-indigo-600 dark:text-indigo-400">감정 분석 중{dots}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs">
        AI가 일기의 감정을 분석하고 있습니다. 잠시만 기다려주세요.
      </div>
      <div className="mt-4 w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

