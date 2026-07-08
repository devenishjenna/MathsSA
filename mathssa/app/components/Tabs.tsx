import Link from "next/link"

interface TabsProps {
  activeTab: string
  topicSlug: string
}

export default function Tabs({ activeTab, topicSlug }: TabsProps) {

  const tabs = ['theory', 'explorer', 'practice', 'summary']
  const baseClasses = 'px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px cursor-pointer'
  const activeClasses = 'border-blue-500 text-blue-600'
  const inactiveClasses = 'border-transparent text-gray-500 hover:text-gray-700'

return <div>
    {tabs.map((tab) => 
      <Link key={tab} href={`/${topicSlug}?tab=${tab.toLowerCase()}`}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px cursor-pointer ${
            activeTab === tab.toLowerCase()
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
      >
        {tab}
      </Link>
    )}
  
  </div>
}