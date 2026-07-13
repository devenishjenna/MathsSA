import { gradeToTopicsMapping } from "../../data/topics"
import { notFound } from "next/navigation"
import TabContent from "../../components/TabContent"
import Tabs from "../../components/Tabs"
import Link from "next/link"
import StraightLineGraphs from "@/app/components/videos/grade-10/StraightLineGraphs"

interface TopicPageProps {
  params: Promise<{ grade: string, topic: string }> 
  searchParams: Promise<{ tab?: string }> 
}

export default async function TopicPage({ params, searchParams }: TopicPageProps) {

  const { grade:gradeSlug, topic: topicSlug } = await params
  const grade = gradeSlug.split('-').pop()

  const activeTopics = gradeToTopicsMapping[grade ?? '']

  const currentTopic = activeTopics.find((t) => t.slug === topicSlug)
  const { tab: activeTab = 'lesson'} = await searchParams

if (!currentTopic) notFound()

  return (
    <main className="min-h-screen p-8">

      {/* breadcrumb */}
      <div
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
        {currentTopic.section}
        </span>
        <span className="text-2xl">›</span>
        <span 
          className="text-sm bg-navy-deep border py-1 px-2 border-white/8 rounded-xl border-l-4 border-l-brand-blue text-text-muted"
        >
        {currentTopic.name}
        </span>
      </div>

       {/* topic heading */}
      <h1 className="text-3xl font-bold text-text-primary mb-4">
        {currentTopic.name}
      </h1>

      {/* tabs */}
      <Tabs activeTab={activeTab} topicSlug={topicSlug} gradeSlug={gradeSlug}/>

      {/* main content */}
      {/* need add statuses for each tab */}
      <div className={`bg-content min-h-screen p-8 
        ${activeTab === 'lesson'
          ? 'rounded-tr rounded-lb rounded-rb'
          : 'rounded'}`}>
        <TabContent isActive={activeTab==='lesson'}>
            <StraightLineGraphs />
        </TabContent>

        <TabContent isActive={activeTab==='explorer'}>
            This is the explorer content
        </TabContent>
        
        <TabContent isActive={activeTab==='summary'}>
            This is the practice content
        </TabContent>

        <TabContent isActive={activeTab==='quiz'}>
            This is the summary content
        </TabContent>
      </div>
    </main>
  )
}