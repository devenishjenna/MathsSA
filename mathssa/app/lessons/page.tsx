import { grade10Topics } from "./data/topics"
import Link from "next/link"

export default function LessonsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Grade 10 Topics</h1>
    <div className="flex flex-col">
      {grade10Topics.map((topic) => 
        <Link key={topic.id} href={`/lessons/${topic.slug}`} className="flex items-center gap-3 p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors" >
            <span>{topic.isDone ? '✓' : '○'}</span>{topic.name}
        </Link>
      )}
  </div>
  </main>
  )
}
