import StraightLineGraphs from "./grade-10/StraightLineGraphs"
import ExponentsAndSurds from "./grade-11/ExponentsAndSurds"

export interface LessonProps {
  progress: number
  totalLessonTime: number
  setTotalLessonTime: (totalLessonTime: number) => void
}

interface SlugComponentMap {
  [slug: string]: React.ComponentType<LessonProps>
}

interface LessonComponentMap {
  [grade: string]: SlugComponentMap
}

export const lessonComponentMapping:LessonComponentMap = {
  "10": {"straight-line-graphs": StraightLineGraphs},
  "11": {"exponents-and-surds": ExponentsAndSurds} 
}