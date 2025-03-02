import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DiaryCard } from "@/components/DiaryCard";
import { getAllDiaries } from "@/lib/diary";
import { Plus } from "lucide-react";

export default function Home() {
  const diaries = getAllDiaries();
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">MoodDiary</h1>
        <Link href="/diary/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            새 일기 작성
          </Button>
        </Link>
      </div>
      
      {diaries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">작성된 일기가 없습니다.</p>
          <Link href="/diary/new">
            <Button>첫 일기 작성하기</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diaries.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </div>
      )}
    </div>
  );
}
