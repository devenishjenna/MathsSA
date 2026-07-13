"use client"

import { useState } from "react"
import Link from "next/link"
import { grades } from "../data/topics"

interface GradePillProps {
  activeGrade: number
}

export default function GradePill({ activeGrade }: GradePillProps) {
  const [isOpen, setIsOpen] = useState(false)
  console.log("isOpen:", isOpen)

  return <div className="relative flex justify-center">
    <button 
      onClick={() => setIsOpen((prev) => !prev)}
      className="text-l px-3 py-1 bg-navy-mid border border-navy-light rounded-full text-text-muted">
          Grade {activeGrade} ▾
    </button>

    {isOpen && 
      <div className="flex flex-col whitespace-nowrap px-3 py-1 gap-2 absolute top-full mt-2 bg-navy-mid border border-navy-light rounded-md shadow-2xl">
        {grades.map((grade) => (
          grade.isAvailable
          ? <Link 
              key={grade.grade} 
              href={`/grade-${grade.grade}`} 
              onClick={() => setIsOpen((prev) => !prev)}
              className="block"
            >Grade {grade.grade}
            </Link>
          : <span 
              key={grade.grade} 
              className="block text-text-muted"
            >Grade {grade.grade}
            </span>
        ))} 
      </div>
    }
    </div>
}