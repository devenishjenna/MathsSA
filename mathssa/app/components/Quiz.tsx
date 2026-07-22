"use client"

import { useState } from "react"
import { quizData, Question } from "../data/quizData"
import QuestionCard from "./QuestionCard"

interface QuizProps {
  gradeSlug: string
  topicSlug: string
}

export default function Quiz({ gradeSlug, topicSlug }: QuizProps) {

  // TODO: if there is no quiz for a topic then the display a default

  const currentQuiz: Question[] = quizData[gradeSlug][topicSlug].quiz
  const [quizScore, setQuizScore] = useState<number | null>(null) // if quizScore is not null then the quiz has been completed. But this means that we should only populate quiz score when quiz is complete
  const [answeredCount, setAnsweredCount] = useState(0)
  const totalQuestions = currentQuiz.length

  function handleAnswered(correct: boolean) {
    setAnsweredCount((prev) => prev + 1)
    if (correct) {
      setQuizScore((prev) => (prev ?? 0) + 1)
    }
  }

  return <div className="flex flex-col gap-1">

    {/* QUIZ SCORE */}
    {/* TODO: add some conditional styling depending on result */}
    <div className={`flex items-center justify-between gap-4 rounded-xl border-2 border-brand-green bg-brand-green/10 px-5 py-4 my-1
      ${answeredCount === totalQuestions ? "" : "hidden"}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎉</span>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">Quiz complete</span>
          <span className="text-lg font-bold text-text-dark">
            Quiz score: {quizScore ?? 0}/{totalQuestions}
          </span>
        </div>
      </div>
      <span className="text-2xl font-bold text-brand-green">
        {Math.round(((quizScore ?? 0) / totalQuestions) * 100)}%
      </span>
    </div>

    {/* QUESTION CARDS */}
    {currentQuiz.map((currentQuestion: Question) => 
      <QuestionCard key={currentQuestion.question} currentQuestion={currentQuestion} onAnswered={handleAnswered}/>
    )}

    {/* QUIZ SCORE */}
    {/* TODO: add some conditional styling depending on result */}
    <div className={`flex items-center justify-between gap-4 rounded-xl border-2 border-brand-green bg-brand-green/10 px-5 py-4 my-1
      ${answeredCount === totalQuestions ? "" : "hidden"}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎉</span>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">Quiz complete</span>
          <span className="text-lg font-bold text-text-dark">
            Quiz score: {quizScore ?? 0}/{totalQuestions}
          </span>
        </div>
      </div>
      <span className="text-2xl font-bold text-brand-green">
        {Math.round(((quizScore ?? 0) / totalQuestions) * 100)}%
      </span>
    </div>

  </div>
}