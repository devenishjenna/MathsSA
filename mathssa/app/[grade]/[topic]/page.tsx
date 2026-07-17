import { gradeToTopicsMapping } from "../../data/topics"
import { notFound } from "next/navigation"
import TabContent from "../../components/TabContent"
import Tabs from "../../components/Tabs"
import Breadcrumb from "@/app/components/Breadcrumb"
import Link from "next/link"
import StraightLineGraphs from "@/app/components/lesson-content/grade-10/StraightLineGraphs"
import LessonWrapper from "@/app/components/LessonWrapper"
import Quiz from "@/app/components/Quiz"

interface TopicPageProps {
  params: Promise<{ grade: string, topic: string }> 
  searchParams: Promise<{ tab?: string }> 
}

export default async function TopicPage({ params, searchParams }: TopicPageProps) {

  const { grade:gradeSlug, topic: topicSlug } = await params
  const grade = gradeSlug.split('-').pop() ?? '' // is this the best choice? Will this ever be undefined?

  const activeTopics = gradeToTopicsMapping[grade ?? '']

  const activeTopic = activeTopics.find((t) => t.slug === topicSlug)
  const { tab: activeTab = 'lesson'} = await searchParams

if (!activeTopic) notFound()

  return (
    <main className="min-h-screen p-2">

      {/* BREADCRUMB */}
      <Breadcrumb gradeSlug={gradeSlug} grade={grade} activeTopic={activeTopic}/>

       {/* MAIN TOPIC HEADING */}
      <h1 className="text-3xl font-bold text-text-primary mt-1 mb-3">
        {activeTopic.name}
      </h1>

      {/* TABS */}
      <Tabs activeTab={activeTab} topicSlug={topicSlug} gradeSlug={gradeSlug}/>

      {/* MAIN CONTENT */}
      {/* TODO: need add statuses for each tab */}
      <div className={`bg-content p-6 
        ${activeTab === 'lesson'
          ? 'rounded-tr rounded-lb rounded-rb'
          : 'rounded'}`}>
        <TabContent isActive={activeTab==='lesson'}>
            <LessonWrapper activeTopic={activeTopic} grade={grade} />
            <LessonWrapper activeTopic={activeTopic} grade={grade} />
        </TabContent>

        <TabContent isActive={activeTab==='explorer'}>
          hello
        </TabContent>
        
        <TabContent isActive={activeTab==='summary'}>
          hello
        </TabContent>

        <TabContent isActive={activeTab==='quiz'}>
            <Quiz gradeSlug={gradeSlug} topicSlug={topicSlug}/>
        </TabContent>
      </div>
    </main>
  )
}