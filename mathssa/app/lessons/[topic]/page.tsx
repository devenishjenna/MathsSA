import { grade10Topics } from "../data/topics"
import { notFound } from "next/navigation"

export default async function LessonPage({ params }: { params: Promise<{ topic: string }> }) {

  const { topic } = await params
  const currentTopic = grade10Topics.find((t) => t.slug === topic)

if (!currentTopic) notFound()

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-blue-700">
        Lesson: {currentTopic.name}
      </h1>
    </main>
  )
}