import { gradeToTopicsMapping } from "../../data/topics"
import StraightLineAnime from "@/app/components/videos/grade-10/animeStraightLineGraphs"
import StraightLineGSAP from "@/app/components/videos/grade-10/gsapStraightLineGraphs"
import { notFound } from "next/navigation"
import TabContent from "../../components/TabContent"
import Tabs from "../../components/Tabs"
import Breadcrumb from "@/app/components/Breadcrumb"
import Link from "next/link"
import StraightLineGraphs from "@/app/components/videos/grade-10/CanvasStraightLineGraphs"

interface TopicPageProps {
  params: Promise<{ grade: string, topic: string }> 
  searchParams: Promise<{ tab?: string }> 
}

export default async function TopicPage({ params, searchParams }: TopicPageProps) {

  const { grade:gradeSlug, topic: topicSlug } = await params
  const grade = gradeSlug.split('-').pop() ?? '' // is this the best choice? Will this ever be undefined?

  const activeTopics = gradeToTopicsMapping[grade ?? '']

  const currentTopic = activeTopics.find((t) => t.slug === topicSlug)
  const { tab: activeTab = 'lesson'} = await searchParams

if (!currentTopic) notFound()

  return (
    <main className="min-h-screen p-8">

      <Breadcrumb gradeSlug={gradeSlug} grade={grade} currentTopic={currentTopic}/>

       {/* topic heading */}
      <h1 className="text-3xl font-bold text-text-primary my-4">
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
            <StraightLineAnime />
        </TabContent>
        
        <TabContent isActive={activeTab==='summary'}>
            <StraightLineGSAP />
        </TabContent>

        <TabContent isActive={activeTab==='quiz'}>
            This is the summary content
        </TabContent>
      </div>
    </main>
  )
}