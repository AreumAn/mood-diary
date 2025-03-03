"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteDiary } from "@/lib/diary"
import { Trash2 } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { t } from "@/lib/translations"

interface DeleteDiaryButtonProps {
  diaryId: string
}

export function DeleteDiaryButton({ diaryId }: DeleteDiaryButtonProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    try {
      deleteDiary(diaryId)
      setOpen(false)
      router.push("/")
    } catch (error) {
      console.error("일기 삭제 중 오류 발생:", error)
      alert(t("errorDeleting", language))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
          <Trash2 className="h-4 w-4 mr-2" />
          {t("delete", language)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            {language === "ko" ? "일기 삭제" : "Delete Diary"}
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            {t("deleteConfirm", language)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {t("no", language)}
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">
            {t("yes", language)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

