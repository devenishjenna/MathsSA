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
          className={`group uppercase px-4 py-2 text-sm font-semibold tracking-widest cursor-pointer -mb-px rounded-t ${
            activeTab === tab.toLowerCase()
              ? 'text-brand-blue bg-content'
              : 'border-transparent text-gray-500 hover:text-gray-600'}
              `}
      >
        <div className="flex gap-2 justify-center items-center">
        {tab}
        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center
          ${true // TODO: iscomplete
            ? `bg-brand-green border-brand-green ${activeTab === tab.toLowerCase() ? '' : 'group-hover:bg-brand-green/60'}`
            : 'border-current opacity-50'}`}
          >
          {true//TODO: iscomplete
          && <span className="text-white text-[8px] leading-none">✓</span>}
        </span>
        
        </div>
      </Link>
    )}
  
  </div>
}