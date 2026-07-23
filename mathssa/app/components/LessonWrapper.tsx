'use client'

import { useState, useRef } from "react"

import { Topic } from "../data/topics"
import StraightLineGraphs from "./lesson-content/grade-10/StraightLineGraphs"
import { lessonComponentMapping } from "./lesson-content/registry"

interface LessonWrapperProps {
  activeTopic: Topic
  grade: string
}

export default function LessonWrapper({ activeTopic, grade }: LessonWrapperProps) {

  const LessonComponent = lessonComponentMapping[grade]?.[activeTopic.slug]

  if (!LessonComponent) return <div>Lesson coming soon...</div> // if no lesson exists in the registry

  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [progress, setProgress] = useState(0)

  return <div className="border-brand-blue border-2 rounded-xl h-full flex flex-col overflow-hidden ">

      <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="max-w-full max-h-full w-auto h-auto"
        ></canvas>
      </div>
      
    <LessonComponent canvasRef={canvasRef} progress={progress}/>

    {/* CONTROLS */}
    <div className="px-1 shrink-0">
      {/* PROGRESS SLIDER */}
      <input 
        type="range"
        min={0}
        max={10}
        step={0.001}
        value={progress}
        onChange={((e)=>setProgress(parseFloat(e.target.value)))}
        className="w-full">
      </input>
    
      {/* PLAY/PAUSE AND PROGRESS DISPLAY*/}
      <div className="flex gap-2 justify-between">
        <button className="cursor-pointer border-2 rounded-[50%] w-6 h-6 flex justify-center items-center">
          ▶
        </button>
        <span>
          progress bar: {progress}
        </span>
      </div>
    </div>

  </div>

}