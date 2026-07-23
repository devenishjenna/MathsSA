import { useEffect } from "react"

import { LessonProps } from "../registry"

export default function StraightLineGraphs({ canvasRef, progress }: LessonProps) {

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return // return is canvas doesn't exist yet on the very first render

    const ctx = canvas.getContext('2d')
    if (!ctx) return // return if can't get context

    ctx.clearRect(0, 0, canvas.width, canvas.height) // clears canvas

    const p1 = { x: 150, y: 350 }
    const p2 = { x: 600, y: 100 }

    ctx.strokeStyle = '#1a1222'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()

    ctx.fillStyle = '#1a1222'
    ;[p1, p2].forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.font = '28px sans-serif'
    ctx.fillStyle = '#1a1222'
    ctx.fillText('y = mx + c', 350, 380)


  }, [canvasRef, progress])

  return null
}