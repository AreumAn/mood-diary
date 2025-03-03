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
      console.error(`${t("errorDeleting", language)}:`, error)
      alert(t("errorDeleting", language))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
          <Trash2 className="h-4 w-4 mr-2" />
          {t("deleteDiary", language)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            {t("deleteConfirm", language)}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            {t("no", language)}
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
            {t("yes", language)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

