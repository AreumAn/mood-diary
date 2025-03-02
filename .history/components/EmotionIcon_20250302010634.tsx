import { Smile, Frown, Angry, Meh, Zap } from "lucide-react";
import { Emotion } from "@/lib/types";

interface EmotionIconProps {
  emotion: Emotion;
  size?: number;
}

export function EmotionIcon({ emotion, size = 6 }: EmotionIconProps) {
  const iconClass = `h-${size} w-${size}`;
  
  switch (emotion) {
    case "행복":
      return <Smile className={`${iconClass} text-[#FFD700]`} />;
    case "슬픔":
      return <Frown className={`${iconClass} text-[#1E90FF]`} />;
    case "분노":
      return <Angry className={`${iconClass} text-[#FF4500]`} />;
    case "평범":
      return <Meh className={`${iconClass} text-[#C0C0C0]`} />;
    case "신남":
      return <Zap className={`${iconClass} text-[#7FFF00]`} />;
    default:
      return <Meh className={`${iconClass} text-[#C0C0C0]`} />;
  }
} 
