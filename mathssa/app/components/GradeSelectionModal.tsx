"use client"

import Link from "next/link"

interface GradeSelectorProps {
  isOpen: boolean
  onClose: () => void
}

interface Grade {
  grade: string
  isAvailable: boolean
}

export function GradeSelector({ isOpen, onClose }: GradeSelectorProps) {
  if (!isOpen) return null

  const grades: Grade[] = [
    {grade: '10', isAvailable: true},
    {grade: '11', isAvailable: false},
    {grade: '12', isAvailable: false}
  ]
  return  <>
    {/* Overlay */}
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center" onClick={onClose}>

      {/* Grade selector */}
      <div className="bg-navy-mid rounded-xl p-8 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
        <span className="text-l font-medium text-text-muted uppercase tracking-widest mb-3"
          >Please select your grade
        </span>

        {grades.map(grade => 
          grade.isAvailable
            ? <Link key={grade.grade} href={`/grade-${grade.grade}`}
                className="text-xl bg-navy-deep border border-white/8 rounded-xl p-4 border-l-4 border-l-brand-blue text-text-muted"
                >Grade {`${grade.grade}`}
              </Link>
            : <span key={grade.grade}
                // className="text-xl text-text-muted bg-navy-deep border border-white/8 rounded-xl p-4 border-l-4 border-l-brand-blue"
                className="opacity-60 text-xl bg-navy-deep border border-white/8 rounded-xl p-4 border-l-4 border-l-brand-blue  text-text-muted"
                >Grade {`${grade.grade}`}
                  <span className="opacity-40 uppercase text-text-muted"> Coming soon</span>
              </span>
        )}
      </div>
    </div>
  </>
}
