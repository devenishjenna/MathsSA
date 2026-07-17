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

  const LessonComponent = lessonComponentMapping[grade][activeTopic.slug]

  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [progressDisplay, setProgressDisplay] = useState(0)

  return <div className="border-brand-blue border-2 rounded-xl">

    <canvas
      ref={canvasRef}
      width={800}
      height={450}
      className="w-full aspect-video"
    ></canvas>

    <LessonComponent canvasRef={canvasRef}/>

    {/* CONTROLS */}
    <div className="px-1">
      {/* PROGRESS SLIDER */}
      <input 
        type="range"
        min={0}
        max={10}
        step={0.001}
        value={progressDisplay}
        onChange={((e)=>setProgressDisplay(parseFloat(e.target.value)))}
        className="w-full">
      </input>
    
      {/* PLAY/PAUSE AND PROGRESS DISPLAY*/}
      <div className="flex gap-2 justify-between">
        <button className="cursor-pointer border-2 rounded-[50%] w-6 h-6 flex justify-center items-center">
          ▶
        </button>
        <span>
          progress bar: {progressDisplay}
        </span>
      </div>
    </div>

  </div>

}