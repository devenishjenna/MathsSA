import { grade10Topics } from "../../data/topics"
import { notFound } from "next/navigation"
import TabContent from "../../components/TabContent"
import Tabs from "../../components/Tabs"
import Link from "next/link"

interface TopicPageProps {
  params: Promise<{ grade: string, topic: string }> 
  searchParams: Promise<{ tab?: string }> 
}

export default async function TopicPage({ params, searchParams }: TopicPageProps) {

  const { grade:gradeSlug, topic: topicSlug } = await params
  const grade = gradeSlug.split('-').pop()
  const topic = topicSlug.replace('-', ' ')
  const topicCap = topic.charAt(0).toUpperCase() + topic.slice(1)
  console.log('grade', grade)

  const currentTopic = grade10Topics.find((t) => t.slug === topicSlug)
  const { tab: activeTab = 'theory'} = await searchParams

if (!currentTopic) notFound()

  return (
    <main className="min-h-screen p-8">
      <div className="text-xs text-text-muted mb-2">
        <Link href={`/${gradeSlug}`}>Grade {grade}</Link>
        <span>＞</span>
        <span>{currentTopic.section}</span>
        <span>＞</span>
        <span>{topicCap}</span></div>
      <h1 className="text-3xl font-bold text-text-primary mb-4">
        Lesson: {currentTopic.name}
      </h1>
      <Tabs activeTab={activeTab} topicSlug={topicSlug}/>

        <TabContent isActive={activeTab==='theory'}>
            This is the theory content
        </TabContent>

        <TabContent isActive={activeTab==='explorer'}>
            This is the explorer content
        </TabContent>
        
        <TabContent isActive={activeTab==='practice'}>
            This is the practice content
        </TabContent>

        <TabContent isActive={activeTab==='summary'}>
            This is the summary content
        </TabContent>
    </main>
  )
}