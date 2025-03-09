"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { t } from "@/lib/translations"
import { deleteDiaryAction } from "@/app/actions/diary"

interface DeleteDiaryButtonProps {
  diaryId: string
}

export function DeleteDiaryButton({ diaryId }: DeleteDiaryButtonProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const result = await deleteDiaryAction(diaryId, language)
      
      if (!result.success) {
        throw new Error(result.error || t("errorDeleting", language))
      }
      
      setOpen(false)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error(`${t("errorDeleting", language)}:`, error)
      alert(t("errorDeleting", language))
    } finally {
      setIsDeleting(false)
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
            disabled={isDeleting}
          >
            {t("no", language)}
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete} 
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                {t("deleting", language)}
              </>
            ) : (
              t("yes", language)
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

