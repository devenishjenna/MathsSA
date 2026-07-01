"use client"

import { grade10Topics } from '../data/topics'
import { usePathname } from 'next/navigation'
import NavItem from './NavItem'

export default function Sidebar() {
    
    const pathname = usePathname()
    const activeSlug =pathname.split('/').pop()?.toLowerCase()
    console.log('pathname: ', pathname)
    console.log('activeSlug: ', activeSlug)

    return (    
        <ul>
            {grade10Topics.map((topic) => 
                <NavItem 
                    key={topic.id}
                    topic={topic}
                    isActive={topic.slug === activeSlug}/>)}
        </ul>
    )
}

