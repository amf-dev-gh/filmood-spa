import { Mood } from "../types/mood.interface";
import { GENRES } from "./genres";

export const MOODS: Mood[] = [
  {
    src: "/images/moods/comedia.webp",
    value: "Cómico",
    genre: GENRES[3]
  },
  {
    src: "/images/moods/drama.webp",
    value: "Dramático",
    genre: GENRES[6]
  },
  {
    src: "/images/moods/romance.webp",
    value: "Enamorado",
    genre: GENRES[13]
  },
  {
    src: "/images/moods/terror.webp",
    value: "Aterrorizado",
    genre: GENRES[10]
  },
  {
    src: "/images/moods/cinefilo.webp",
    value: "Cinéfilo",
    genre: GENRES[9]
  },
  {
    src: "/images/moods/trending.webp",
    value: "Indeciso",
    genre: GENRES[Math.floor(Math.random()*20)]
  }
] as const