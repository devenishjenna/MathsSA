import Link from "next/link"
import { Topic } from "../data/topics"

interface BreadcrumbProps {
  gradeSlug: string
  grade: string
  activeTopic: Topic
}

export default function Breadcrumb({ gradeSlug, grade, activeTopic }: BreadcrumbProps) {
  return <div
    className="text-xs text-text-muted mb-2 flex gap-1 align-items"
    >
    <Link 
      href={`/${gradeSlug}`}
      className="text-sm bg-navy-deep border py-1 px-2 border-white/8 rounded-xl border-l-4 text-text-muted"
    >Grade {grade}
    </Link>
    <span className="text-2xl">›</span>
    <span 
      className="text-sm bg-navy-deep border py-1 px-2 border-white/8 rounded-xl border-l-4 text-text-muted"
    >
    {activeTopic.section}
    </span>
    <span className="text-2xl">›</span>
    <span 
      className="text-sm bg-navy-deep border py-1 px-2 border-white/8 rounded-xl border-l-4 border-l-brand-blue text-text-muted"
    >
    {activeTopic.name}
    </span>
  </div>
  }