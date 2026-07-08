"use client"

import { grade10Topics } from '../data/topics'
import { usePathname } from 'next/navigation'
import NavItem from './NavItem'
import { Topic } from '../data/topics'

interface SidebarProps {
    grade: number
}


export default function Sidebar({ grade }: SidebarProps) {
    
    const pathname = usePathname()
    const activeSlug =pathname.split('/').pop()?.toLowerCase()

    // TODO: this is repeated
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
        <ul>
            {Object.entries(groupedSections).map(([section, topics]) => {
                return <div key={section}>
                <span className='text-xs font-medium text-text-muted uppercase tracking-widest px-2 mt-4 mb-1'>{section}</span>
                {topics.map((topic) => <NavItem 
                    key={topic.id}
                    topic={topic}
                    grade={grade}
                    isActive={topic.slug === activeSlug}/>)}
                </div>})}
        </ul>
    )
}

