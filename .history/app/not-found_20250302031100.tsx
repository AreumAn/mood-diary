import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 text-center min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <FileQuestion className="h-24 w-24 text-indigo-500 mb-8" />
      <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">페이지를 찾을 수 없습니다</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md">
        요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <Link href="/">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300">
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  )
}

