import { useId, ReactNode } from "react";

import MathsText from "../MathsText";

interface RevealProps {
  x: number
  y: number
  width: number
  height: number
  reveal: number // 0 - 1 portion of segment that needs to be revealed
  children: ReactNode
}

export function Reveal({ x, y, width, height, reveal, children}: RevealProps) {
  const clipId = useId()

  return <>
    <clipPath id={clipId}>
      <rect x={x} y={y} width={width * reveal} height={height} />
    </clipPath>
    <g clipPath={`url(#${clipId})`}>{children}</g>
  </>
}

interface MathsTextFOProps {
  x: number // coords of foreign object
  y: number 
  width: number // width of foreign object
  height: number // height of foreign object
  styling: string // className injection 
  children: string
}

export function MathsTextFO({ x, y, width, height, styling, children }: MathsTextFOProps) {
  return <foreignObject x={x} y={y} width={width} height={height}>
    <MathsText text={children} styling={`${styling}`}/>
  </foreignObject>
} 

interface ArrowProps {
  x1: number
  y1: number
  x2: number
  y2: number
  reveal: number
  styling: string
  label?: string
  labelOffset?: { x: number; y: number } // shift the label away from the line
  labelReveal?: number
  labelStyling?: string
}

export function Arrow({x1, y1, x2, y2, reveal, styling, label, labelOffset = { x: -25, y: -10 }, labelReveal, labelStyling }: ArrowProps) {
  const length = Math.hypot(x2 - x1, y2 - y1)
  const angle = Math.floor(Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)) // angle in degrees

  return (
    <>
      <g transform={`translate(${x2}, ${y2}) rotate(${angle})`} opacity={reveal}>
        <polyline points="-10 -7, 0 0, -10 7" fill="none" strokeLinecap="round" className={`${styling}`} />
      </g>

      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        className={`${styling}`}
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={-length * (1 - reveal)}
        opacity={reveal}
      />

      {label && (
        <text
          x={x1 + labelOffset.x}
          y={y1 + labelOffset.y}
          className={labelStyling}
          opacity={labelReveal}
        >
          {label}
        </text>
      )}
    </>
  )
}