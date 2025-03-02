"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiaryEntry } from "@/lib/types";
import { saveDiary, updateDiary } from "@/lib/diary";

interface DiaryFormProps {
  diary?: DiaryEntry;
  isEditing?: boolean;
}

export function DiaryForm({ diary, isEditing = false }: DiaryFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(diary?.title || "");
  const [content, setContent] = useState(diary?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && diary) {
        updateDiary({
          ...diary,
          title,
          content,
        });
      } else {
        saveDiary({ title, content });
      }
      
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("일기 저장 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="일기 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Textarea
          placeholder="오늘의 일기를 작성해보세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[200px]"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "저장 중..." : isEditing ? "수정하기" : "저장하기"}
        </Button>
      </div>
    </form>
  );
} 
