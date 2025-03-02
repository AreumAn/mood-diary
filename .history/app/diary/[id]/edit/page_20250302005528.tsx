"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DiaryForm } from "@/components/DiaryForm";
import { getDiaryById } from "@/lib/diary";
import { DiaryEntry } from "@/lib/types";
import { use } from "react";

export default function EditDiaryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [diary, setDiary] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // params를 React.use()로 언래핑
  const id = use(params).id;
  
  useEffect(() => {
    const loadDiary = () => {
      const foundDiary = getDiaryById(id);
      if (foundDiary) {
        setDiary(foundDiary);
      } else {
        // 일기를 찾을 수 없으면 홈으로 리다이렉트
        router.push("/");
      }
      setIsLoading(false);
    };
    
    loadDiary();
  }, [id, router]);
  
  if (isLoading) {
    return <div className="container mx-auto py-8">로딩 중...</div>;
  }
  
  if (!diary) {
    return <div className="container mx-auto py-8">일기를 찾을 수 없습니다.</div>;
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">일기 수정</h1>
      <DiaryForm diary={diary} isEditing />
    </div>
  );
} 
