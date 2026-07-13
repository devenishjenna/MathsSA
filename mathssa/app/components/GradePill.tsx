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

  return <div className="relative">
  <button 
    onClick={() => setIsOpen((prev) => !prev)}
    className="text-l px-3 py-1 bg-navy-mid border border-navy-light rounded-full text-text-muted">
        Grade {activeGrade}
    </button>

    {isOpen && 
      <div className="absolute top-full">
        {grades.map((grade) => (
          <Link 
            key={grade.grade} 
            href={`/grade-${grade.grade}`} 
            onClick={() => setIsOpen((prev) => !prev)}
            className="block"
          >Grade {grade.grade}
          </Link>
        ))} 
      </div>
    }
    </div>
}


// <div className="flex items-center gap-3">
//     <div className="text-l px-3 py-1 bg-navy-mid border border-navy-light rounded-full text-text-muted">
//         Grade {activeGrade}
//     </div>
// </div>

