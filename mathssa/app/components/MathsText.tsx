import { InlineMath, BlockMath } from 'react-katex'

interface MathsTextProps {
  text: string
}

export default function MathsText({ text }: MathsTextProps) {
  const segments = text.split('$')
  return (
    <>
      {segments.map((seg, i) => {
        if (seg === '') return null
        return i % 2 === 0
          ? <span key={i}>{seg}</span>
          : <InlineMath key={i} math={seg} />
      })}
    </>
  )
}