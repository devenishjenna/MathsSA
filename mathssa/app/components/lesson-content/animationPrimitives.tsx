import { useId, ReactNode, Children } from "react";

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