"use client";

import { useState, useEffect } from "react";

export function EmotionAnalysisLoading() {
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + "." : "");
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-lg font-medium mb-2">감정 분석 중{dots}</div>
      <div className="text-sm text-muted-foreground">
        AI가 일기의 감정을 분석하고 있습니다. 잠시만 기다려주세요.
      </div>
    </div>
  );
} 
