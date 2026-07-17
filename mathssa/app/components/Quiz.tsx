import { quizData, Question } from "../data/quizData"

interface QuizProps {
  gradeSlug: string
  topicSlug: string
}

export default function Quiz({ gradeSlug, topicSlug }: QuizProps) {

  const currentQuiz: Question[] = quizData[gradeSlug][topicSlug].quiz

  return <div className="flex flex-col gap-1 ">

    {/* QUESTION CARD */}
    {currentQuiz.map((currentQuestion) => 
      <div className='border-2 rounded-lg flex flex-col gap-2 border-brand-blue my-1 p-2'
        key={currentQuestion.question}>

        {/* QUESTION */}
        <span className="p-1">{currentQuestion.question}</span>

        {/* OPTIONS */}
        {currentQuestion.options.map((option, i) => 
          <button 
            key={option}
            className="rounded bg-brand-blue/80 flex gap-1 p-2 mx-2 cursor-pointer hover:bg-text-muted "
          >
            <span className="border-2 rounded-full w-6 h-6 flex justify-center items-center bg-white/20 border-white/40 text-white"
            >{String.fromCharCode(i + 65)}</span>  
            <span>{option}</span>
          
          </button>
        )}
     
      </div>
    )}

  </div>
}