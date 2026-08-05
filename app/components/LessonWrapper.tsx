import { Topic } from '../data/topics'

interface LessonWrapperProps {
  activeTopic: Topic
}

export default function LessonWrapper({ activeTopic }: LessonWrapperProps) {
  if (!activeTopic.hasVideo) return <div>Lesson coming soon...</div>

  return (
    <div className="border-brand-blue border-2 rounded-xl h-full flex flex-col overflow-hidden">
      {/* VIDEO */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <video controls className="w-full h-full object-contain">
          <source src={`/videos/${activeTopic.slug}.mp4`} type="video/mp4" />
        Your browser doesn&apos;t support video.
        </video>
      </div>
    </div>
  )
}
