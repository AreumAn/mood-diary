import { Smile, Frown, Angry, Meh, Zap } from "lucide-react"
import { Emotion } from "@/lib/types"

interface EmotionIconProps {
  emotion: Emotion
  size?: number
}

export function EmotionIcon({ emotion, size = 6 }: EmotionIconProps) {
  const iconClass = `h-${size} w-${size}`

  switch (emotion) {
    case "happy":
      return <Smile className={`${iconClass} text-yellow-500`} />
    case "sad":
      return <Frown className={`${iconClass} text-blue-500`} />
    case "angry":
      return <Angry className={`${iconClass} text-red-500`} />
    case "neutral":
      return <Meh className={`${iconClass} text-gray-500`} />
    case "excited":
      return <Zap className={`${iconClass} text-green-500`} />
    default:
      return <Meh className={`${iconClass} text-gray-500`} />
  }
}

