import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteDiaryButton } from "@/components/DeleteDiaryButton";
import { getDiaryById } from "@/lib/diary";
import { formatDate } from "@/lib/utils";
import { Smile, Frown, Angry, Meh, Zap, Pencil } from "lucide-react";
import { Emotion } from "@/lib/types";
import { notFound } from "next/navigation";

// 감정에 따른 아이콘 매핑
const emotionIcons: Record<Emotion, React.ReactNode> = {
  "행복": <Smile className="h-6 w-6 text-[#FFD700]" />,
  "슬픔": <Frown className="h-6 w-6 text-[#1E90FF]" />,
  "분노": <Angry className="h-6 w-6 text-[#FF4500]" />,
  "평범": <Meh className="h-6 w-6 text-[#C0C0C0]" />,
  "신남": <Zap className="h-6 w-6 text-[#7FFF00]" />,
};

export default function DiaryDetailPage({ params }: { params: { id: string } }) {
  const diary = getDiaryById(params.id);
  
  if (!diary) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">{diary.title}</h1>
        <div className="flex space-x-2">
          <Link href={`/diary/${diary.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-2" />
              수정
            </Button>
          </Link>
          <DeleteDiaryButton diaryId={diary.id} />
        </div>
      </div>
      
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">{formatDate(diary.createdAt)}</p>
        {diary.emotion && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">감정:</span>
            {emotionIcons[diary.emotion]}
            <span>{diary.emotion}</span>
          </div>
        )}
      </div>
      
      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap">{diary.content}</p>
      </div>
      
      <div className="mt-8">
        <Link href="/">
          <Button variant="outline">목록으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
} 
