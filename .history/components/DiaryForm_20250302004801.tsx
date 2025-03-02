"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DiaryEntry } from "@/lib/types";
import { saveDiary, updateDiary } from "@/lib/diary";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiaryFormProps {
  diary?: DiaryEntry;
  isEditing?: boolean;
}

export function DiaryForm({ diary, isEditing = false }: DiaryFormProps) {
  const router = useRouter();
  const [content, setContent] = useState(diary?.content || "");
  const [date, setDate] = useState<Date>(
    diary ? new Date(diary.createdAt) : new Date()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && diary) {
        updateDiary({
          ...diary,
          content,
          createdAt: date.toISOString(),
        });
      } else {
        // 제목 없이 날짜를 기반으로 제목 생성
        const title = format(date, 'yyyy년 MM월 dd일의 일기', { locale: ko });
        saveDiary({ 
          title, 
          content,
          createdAt: date.toISOString() 
        });
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
        <div className="flex items-center">
          <label className="text-sm font-medium mr-2">날짜 선택:</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP', { locale: ko }) : <span>날짜 선택</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
                locale={ko}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="space-y-2">
        <Textarea
          placeholder="오늘의 일기를 작성해보세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[300px]"
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
