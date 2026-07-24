import { LessonProps } from '../registry'

function segmentProgress(progress: number, start: number, end: number) {
// returns portion of segment that is complete [decimal (0-1)]
  if (progress < start) {
    return 0 // segment hasn't started yet
  } else if (progress > end) {
    return 1 // segment is complete
  } else {
    (progress - start)/(end - start) // portion of segment that is complete
  }
}

export default function StraightLineGraphs({ progress, totalLessonTime, setTotalLessonTime }: LessonProps) {

  setTotalLessonTime(20)

  const p1 = { x: 60, y: 220 }
  const p2 = { x: 300, y: 80 }

  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const lineLength = Math.sqrt(dx * dx + dy * dy)

  const dotsReveal = segmentProgress(progress, 0, totalLessonTime)
  const lineReveal = segmentProgress(progress, 0.75, 2.5)

  return (
    <svg viewBox="0 0 360 280"> // TODO: things are rendered outside the svg box on big monitor
      <line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="#378ADD"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={lineLength} // array of dash lengths that follow the shape
        strokeDashoffset={lineLength * (1 - lineReveal)} // how many units the first dash moves backwards
      />
      <circle cx={p1.x} cy={p1.y} r={5} fill="#0C447C" opacity={dotsReveal} />
      <circle cx={p2.x} cy={p2.y} r={5} fill="#0C447C" opacity={dotsReveal} />
    </svg>
  )
}