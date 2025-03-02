import { DiaryForm } from "@/components/DiaryForm";
import { getDiaryById } from "@/lib/diary";
import { notFound } from "next/navigation";

export default function EditDiaryPage({ params }: { params: { id: string } }) {
  const diary = getDiaryById(params.id);
  
  if (!diary) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">일기 수정</h1>
      <DiaryForm diary={diary} isEditing />
    </div>
  );
} 
