import { quizData, Question } from "../data/quizData"
import QuestionCard from "./QuestionCard"

interface QuizProps {
  gradeSlug: string
  topicSlug: string
}

export default function Quiz({ gradeSlug, topicSlug }: QuizProps) {

  const currentQuiz: Question[] = quizData[gradeSlug][topicSlug].quiz

  return <div className="flex flex-col gap-1 ">

    {/* QUESTION CARD */}
    {currentQuiz.map((currentQuestion) => 
      <QuestionCard key={currentQuestion.question} currentQuestion={currentQuestion} />
    )}

  </div>
}