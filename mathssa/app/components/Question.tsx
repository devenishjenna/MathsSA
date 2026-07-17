"use client"

import { useState } from "react"

import { Question } from "../data/quizData"

interface QuestionCardProps {
  currentQuestion: Question
}

export default function QuestionCard({ currentQuestion }: QuestionCardProps) {

  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const isAnswered = selectedOption !== null

  function handleSelect(i: number) {
    if (isAnswered) return //this means the option can't be selected again or options can't change
    setSelectedOption(i)
  }

  return <div className='border-2 rounded-2xl flex flex-col gap-2 border-brand-blue my-1 p-2'
    key={currentQuestion.question}>

      {/* QUESTION */}
      <span className="text-deep-navy text-base my-2 pl-1">{currentQuestion.question}</span>

      {/* OPTIONS */}
      {currentQuestion.options.map((option, i) => 
        <button 
          key={option}
          onClick={() => handleSelect(i)}
          disabled={isAnswered} //disabled clickability
          className={`flex items-center gap-4 px-5 py-3 rounded-lg bg-brand-blue/10 border border-text-muted/50 
                    text-deep-navy text-md transition-colors duration-150 hover:bg-brand-blue/20 hover:border-brand-blue
                    ${isAnswered ? 'cursor-default ' : 'cursor-pointer'}
                    ${isAnswered ? (selectedOption === currentQuestion.answerIndex ? 'bg-brand-green' : 'bg-red-400'): ''}
                    `} //makes it seem to the user that it can't be clicked
        >
          <span className="flex items-center justify-center w-7 h-7  shrink-0 rounded-full bg-brand-blue/70 border-2 border-white
                  text-white text-xs ring-1 ring-brand-blue font-medium shadow-[0_0_8px_2px_var(--color-brand-blue)]/55"
          >{String.fromCharCode(i + 65)}</span>  
          <span>{option}</span>
        </button>
      )}
     
  </div>
}