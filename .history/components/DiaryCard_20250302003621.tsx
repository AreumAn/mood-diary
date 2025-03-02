import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DiaryEntry, Emotion } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Smile, Frown, Angry, Meh, Zap } from "lucide-react";

// 감정에 따른 색상 및 아이콘 매핑
const emotionConfig: Record<Emotion, { color: string; icon: React.ReactNode }> = {
  "행복": { color: "bg-[#FFD700]/20 border-[#FFD700]", icon: <Smile className="h-5 w-5 text-[#FFD700]" /> },
  "슬픔": { color: "bg-[#1E90FF]/20 border-[#1E90FF]", icon: <Frown className="h-5 w-5 text-[#1E90FF]" /> },
  "분노": { color: "bg-[#FF4500]/20 border-[#FF4500]", icon: <Angry className="h-5 w-5 text-[#FF4500]" /> },
  "평범": { color: "bg-[#C0C0C0]/20 border-[#C0C0C0]", icon: <Meh className="h-5 w-5 text-[#C0C0C0]" /> },
  "신남": { color: "bg-[#7FFF00]/20 border-[#7FFF00]", icon: <Zap className="h-5 w-5 text-[#7FFF00]" /> },
};

interface DiaryCardProps {
  diary: DiaryEntry;
}

export function DiaryCard({ diary }: DiaryCardProps) {
  const { id, title, content, createdAt, emotion } = diary;
  
  // 감정이 있으면 해당 스타일 적용, 없으면 기본 스타일
  const cardStyle = emotion 
    ? `${emotionConfig[emotion].color} border` 
    : "bg-card border";
  
  return (
    <Link href={`/diary/${id}`}>
      <Card className={`${cardStyle} hover:shadow-md transition-shadow cursor-pointer`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {emotion && emotionConfig[emotion].icon}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">{formatDate(createdAt)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
} 
