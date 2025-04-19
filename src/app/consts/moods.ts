import { Mood } from "../types/mood.interface";

export const MOODS: Mood[] = [
  {
    emoji: "🤣",
    value: "Comedia"
  },
  {
    emoji: "😭",
    value: "Drama"
  },
  {
    emoji: "🥰",
    value: "Romance"
  },
  {
    emoji: "😱",
    value: "Terror"
  },
  {
    emoji: "🧐",
    value: "Historia"
  },
  {
    emoji: "❓",
    value: "Trending"
  }
] as const