import { Smile, Frown, Angry, Meh, Zap } from "lucide-react"
import type { Emotion } from "@/lib/types"

interface EmotionIconProps {
  emotion: Emotion
  size?: number
}

export function EmotionIcon({ emotion, size = 6 }: EmotionIconProps) {
  const iconClass = `h-${size} w-${size}`

  switch (emotion) {
    case "행복":
      return <Smile className={`${iconClass} text-yellow-500`} />
    case "슬픔":
      return <Frown className={`${iconClass} text-blue-500`} />
    case "분노":
      return <Angry className={`${iconClass} text-red-500`} />
    case "평범":
      return <Meh className={`${iconClass} text-gray-500`} />
    case "신남":
      return <Zap className={`${iconClass} text-green-500`} />
    default:
      return <Meh className={`${iconClass} text-gray-500`} />
  }
}

