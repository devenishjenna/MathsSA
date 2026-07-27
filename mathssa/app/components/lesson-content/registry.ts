import StraightLineGraphs from "./grade-10/StraightLineGraphs"
import ExponentsAndSurds from "./grade-11/ExponentsAndSurds"

export interface LessonProps {
  progress: number
  totalLessonTime: number
}

interface SlugToLesson {
  [slug: string]: {
    lessonComp: React.ComponentType<LessonProps>
    lessonTotalTime: number
  }
}

interface LessonComponentMap {
  [grade: string]: SlugToLesson
}

export const lessonComponentMapping:LessonComponentMap = {
  "10": {"straight-line-graphs": {lessonComp: StraightLineGraphs, lessonTotalTime: 30}},
  "11": {"exponents-and-surds": {lessonComp: ExponentsAndSurds, lessonTotalTime: 50}} 
}