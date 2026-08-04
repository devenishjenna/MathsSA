'use client'

import { useState, useRef, useEffect } from 'react'
import { Topic } from '../data/topics'
import { lessonComponentMapping } from './lesson-content/registry'

interface LessonWrapperProps {
  activeTopic: Topic
  grade: string
}

export default function LessonWrapper({ activeTopic, grade }: LessonWrapperProps) {
  const lesson = lessonComponentMapping[grade]?.[activeTopic.slug]
  const LessonComponent = lesson?.["lessonComp"]
  const totalLessonTime = lesson?.["lessonTotalTime"]

  if (!LessonComponent) return <div>Lesson coming soon...</div>

  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  
  // increment progress by 16ms every frame (assumes 60fps). TODO: need to change to suit all hardware
  const updateProgress = () => {
    // this code is executed for each frame of the animation
    // no animation is happening here. requestAnimationFrame ensures that progress is being updates smoothly (synced browser's rendering cycle)
    // this ensures smooth re-rendering of any component dependent on progress
    // we store animationFrameRef.current so that we can cancel animation at a later stage
    setProgress(prevProgress => {
      const newProgress = prevProgress + 0.016;
      if (newProgress <= totalLessonTime) {
        return newProgress;
      } else {
        setIsPlaying(false);
        return totalLessonTime;
      }
    });
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

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
      {/* VIDEO */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <video controls className="w-full h-full object-cover">
          <source src="/videos/StraightLine.mp4" type="video/mp4" />
        Your browser doesn't support video.
        </video>
      </div>
    </div>
  )
}