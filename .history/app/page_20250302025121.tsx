"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiaryCard } from "@/components/DiaryCard"
import { getAllDiaries } from "@/lib/diary"
import { Plus, BookOpen } from "lucide-react"
import type { DiaryEntry } from "@/lib/types"
import { motion } from "framer-motion"

export default function Home() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 클라이언트 사이드에서만 로컬 스토리지에 접근
    const loadDiaries = () => {
      const loadedDiaries = getAllDiaries()
      // 날짜별로 정렬 (최신순)
      loadedDiaries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setDiaries(loadedDiaries)
      setIsLoading(false)
    }

    loadDiaries()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-12"
        >
          <div className="flex items-center mb-4 sm:mb-0">
            <BookOpen className="h-8 w-8 mr-3 text-primary" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              MoodDiary
            </h1>
          </div>
          <Link href="/diary/new">
            <Button className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Plus className="h-4 w-4 mr-2" />새 일기 작성
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse-gentle flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-muted-foreground">로딩 중...</p>
            </div>
          </div>
        ) : diaries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center py-20 px-4 rounded-xl bg-card/50 backdrop-blur-sm shadow-sm"
          >
            <div className="animate-float inline-block mb-6">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">아직 작성된 일기가 없습니다</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              오늘의 감정과 생각을 기록해보세요. 당신의 하루를 MoodDiary와 함께 기억하세요.
            </p>
            <Link href="/diary/new">
              <Button
                size="lg"
                className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                첫 일기 작성하기
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {diaries.map((diary, index) => (
              <motion.div
                key={diary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <DiaryCard diary={diary} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

