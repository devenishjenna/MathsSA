import Link from "next/link"

interface TabsProps {
  activeTab: string
  topicSlug: string
  gradeSlug: string
}

export default function Tabs({ activeTab, topicSlug, gradeSlug }: TabsProps) {

  const tabs = ['lesson', 'explorer', 'summary', 'quiz']

return <div className="flex">
    {tabs.map((tab) => 
      <Link key={tab} href={`/${gradeSlug}/${topicSlug}?tab=${tab.toLowerCase()}`}
          className={`uppercase px-4 py-2 text-sm font-medium cursor-pointer -mb-px rounded-t ${
            activeTab === tab.toLowerCase()
              ? 'text-blue-600 bg-content'
              : 'border-transparent text-gray-500 hover:text-gray-700'}
          `}
      >
        {tab}
      </Link>
    )}
  
  </div>
}