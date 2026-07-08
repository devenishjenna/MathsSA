import { grade10Topics } from "../data/topics"
import { Topic } from "../data/topics"
import Link from "next/link"

interface GradePageProps {
  params: Promise<{ grade: string}>
}

export default async function GradePage({ params }: GradePageProps) {

  const { grade:gradeSlug } = await params
  const grade = gradeSlug.split('-').pop()

  // create an object with topics grouped by sections
  const groupedSections: Record<string, Topic[]> = grade10Topics.reduce((accumulator, topic) => {
    const section = topic.section

    if (!accumulator[section]) {
      accumulator[section] = []
    }
    accumulator[section].push(topic)
    return accumulator

  }, {} as Record<string, Topic[]>)

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-text-primary mb-6">Grade {grade} Topics</h1>
      
    <div className="flex flex-col gap-3">
      {Object.entries(groupedSections).map(([section, topic]) => (<div key={section}>
        <h2 className="text-base font-medium text-text-muted uppercase tracking-widest mb-1">
            {section}
        </h2>
        <div key={section} className="grid grid-cols-2 gap-1">
          {topic.map((topic) => 
          <div className=" bg-navy-mid border border-white/8 rounded-xl border-l-4 border-l-brand-blue text-text-primary">
            <Link 
              key={topic.id}
              href={`/lessons/${gradeSlug}/${topic.slug}`}
              className="flex items-center gap-3 p-4 bg-navy-mid border-white/8 hover:bg-navy-light transition-colors text-text-primary"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{topic.name}</span>
                <span className="text-xs text-text-muted">{topic.description}</span>
                <span className="text-xs text-text-muted">
                  ▶️ {topic.videoCount} video{topic.videoCount !== 1 ? 's' : ''}
                  {' '} ✏️ {topic.quizCount} quiz{topic.quizCount !== 1 ? 'zes' : ''}
                  {topic.hasExplorer ? ' 📎 Interactive explorer' : ''}
                </span>
              </div>
            </Link>
            </div>)}
        </div>
      </div>))
      }
    </div>
  </main>)
}
