"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteDiary } from "@/lib/diary";
import { Trash2 } from "lucide-react";

interface DeleteDiaryButtonProps {
  diaryId: string;
}

export function DeleteDiaryButton({ diaryId }: DeleteDiaryButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  const handleDelete = () => {
    try {
      deleteDiary(diaryId);
      setOpen(false);
      // 삭제 후 홈으로 이동
      router.push("/");
    } catch (error) {
      console.error("일기 삭제 중 오류 발생:", error);
      alert("일기 삭제 중 오류가 발생했습니다.");
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>일기 삭제</DialogTitle>
          <DialogDescription>
            정말로 이 일기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
