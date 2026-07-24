'use client'

import { useState, useRef, useEffect } from 'react'
import { Topic } from '../data/topics'
import StraightLineGraphs from './lesson-content/grade-10/StraightLineGraphs'
import { lessonComponentMapping } from './lesson-content/registry'

interface LessonWrapperProps {
  activeTopic: Topic
  grade: string
}

export default function LessonWrapper({ activeTopic, grade }: LessonWrapperProps) {
  const LessonComponent = lessonComponentMapping[grade]?.[activeTopic.slug]

  if (!LessonComponent) return <div>Lesson coming soon...</div>

  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const animationFrameRef = useRef<number | null>(null)

  // increment progress by 16ms every frame
  const updateProgress = () => {
    // this code is executed for each frame of the animation
    // this runs +-60 times per second
    // no animation is happening here. requestAnimationFrame ensures that progress is being updates smoothly (synced browser's rendering cycle)
    // this ensures smooth re-rendering of any component dependent on progress
    // we store animationFrameRef.current so that we can cancel animation at a later stage
    if (isPlaying && progress < 10) {// TODO: replace with dynamic. 10 is the total video time
      setProgress(prevProgress => prevProgress + 0.016)
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }
  }

  // play/pause
  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    } else {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    // clean up. This gets run before the above logic
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current) // this cancels any scheduled animation frames (so any progress incrementations)
      }
    }
  }, [isPlaying])

  return (
    <div className="border-brand-blue border-2 rounded-xl h-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
        <LessonComponent progress={progress} />
      </div>

      <div className="px-1 shrink-0">
        <input
          type="range"
          min={0}
          max={10}
          step={0.001}
          value={progress}
          onChange={e => setProgress(parseFloat(e.target.value))}
          className="w-full"
        />

        <div className="flex gap-2 justify-between">
          <button
            className="cursor-pointer border-2 rounded-[50%] w-6 h-6 flex justify-center items-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <span>progress bar: {progress}</span>
        </div>
      </div>
    </div>
  )
}