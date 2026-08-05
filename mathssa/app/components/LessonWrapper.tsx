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
  const LessonComponent = lesson?.["lessonComp"] // TODO: this needs to get the video path instead
  const totalLessonTime = lesson?.["lessonTotalTime"]

  if (!LessonComponent) return <div>Lesson coming soon...</div>

  return (
    <div className="border-brand-blue border-2 rounded-xl h-full flex flex-col overflow-hidden">
      {/* VIDEO */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <video controls className="w-full h-full object-cover">
          <source src="/videos/straight-line-graphs.mp4" type="video/mp4" />
        Your browser doesn't support video.
        </video>
      </div>
    </div>
  )
}