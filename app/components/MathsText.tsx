import { InlineMath, BlockMath } from 'react-katex'

interface MathsTextProps {
  text: string
  styling: string
}

export default function MathsText({ text, styling }: MathsTextProps) {
  const segments = text.split('$')
  return (
    <div className={`${styling}`}>
      {segments.map((seg, i) => {
        if (seg === '') return null
        return i % 2 === 0
          ? <span key={i}>{seg}</span>
          : <InlineMath key={i} math={seg} />
      })}
    </div>
  )
}