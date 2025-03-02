import { DiaryForm } from "@/components/DiaryForm";

export default function NewDiaryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">새 일기 작성</h1>
      <DiaryForm />
    </div>
  );
} 
