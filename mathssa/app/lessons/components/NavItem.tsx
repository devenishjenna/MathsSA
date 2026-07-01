import { Topic } from "../data/topics"
import Link from "next/link"

interface NavItemProps {
    topic: Topic
    isActive: boolean
}

export default function NavItem({ topic, isActive }: NavItemProps) {
    return (    
        <Link href={`/lessons/${topic.slug}`}>
            <li className={`px-3 py-2 cursor-pointer text-sm border-l-4 flex items-center gap-2
                ${isActive
                ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold"
                : "text-gray-600 border-transparent hover:bg-gray-50"}`}>
                <span>{topic.isDone ? '✓' : '○'}</span>
                <span>{topic.name}</span>
            </li>
        </Link>
    )
}