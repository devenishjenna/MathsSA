"use client"

import { useRef, useState, useEffect } from "react"
import { createTimeline } from "animejs"

const DURATION = 60 // seconds

export default function StraightLineGraphsAnime() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const tlRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayProgress, setDisplayProgress] = useState(0)

  const W = 800, H = 450, OX = 80, OY = 370, SCALE = 38

  const stage = useRef({
    linePct: 0, labelOpacity: 0, pointOpacity: 0,
    angleOpacity: 0, gradientOpacity: 0,
  })

  function toCanvas(mx: number, my: number): [number, number] {
    return [OX + mx * SCALE, OY - my * SCALE]
  }

  function drawAxes(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#8BA7C4'; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(40, OY); ctx.lineTo(W - 30, OY); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(OX, H - 30); ctx.lineTo(OX, 30); ctx.stroke()
  }

  function drawScene(ctx: CanvasRenderingContext2D) {
    const s = stage.current
    ctx.clearRect(0, 0, W, H)
    drawAxes(ctx)

    if (s.linePct > 0) {
      const xEnd = -1 + 17 * s.linePct
      ctx.strokeStyle = '#2E7DD1'; ctx.lineWidth = 3
      ctx.beginPath()
      let first = true
      for (let mx = -1; mx <= xEnd; mx += 0.05) {
        const my = 2 * mx + 1
        const [cx, cy] = toCanvas(mx, my)
        if (first) { ctx.moveTo(cx, cy); first = false } else ctx.lineTo(cx, cy)
      }
      ctx.stroke()
    }

    if (s.labelOpacity > 0) {
      ctx.globalAlpha = s.labelOpacity
      ctx.fillStyle = '#0D1B2A'; ctx.font = 'bold 22px Arial'
      ctx.fillText('y = 2x + 1', W - 220, 60)
      ctx.globalAlpha = 1
    }

    if (s.pointOpacity > 0) {
      ctx.globalAlpha = s.pointOpacity
      const [px, py] = toCanvas(0, 1)
      ctx.fillStyle = '#1D9E75'
      ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }

    if (s.gradientOpacity > 0) {
      ctx.globalAlpha = s.gradientOpacity
      ctx.fillStyle = '#556B82'; ctx.font = '14px Arial'
      ctx.fillText('gradient m = 2', W - 220, 88)
      ctx.globalAlpha = 1
    }
  }

  function redraw() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) drawScene(ctx)
  }

  useEffect(() => {
    const s = stage.current
    const DUR_MS = DURATION * 1000

    const tl = createTimeline({
      autoplay: false,
      onUpdate: (self: any) => {
        const p = self.currentTime / DUR_MS
        setDisplayProgress(p)
        redraw()
      },
    })
      .add(s, { linePct: { to: 1 }, duration: DUR_MS * 0.4, ease: "outQuad" }, 0)
      .add(s, { labelOpacity: { to: 1 }, duration: DUR_MS * 0.1 }, DUR_MS * 0.3)
      .add(s, { pointOpacity: { to: 1 }, duration: DUR_MS * 0.1 }, DUR_MS * 0.45)
      .add(s, { angleOpacity: { to: 1 }, duration: DUR_MS * 0.1 }, DUR_MS * 0.6)
      .add(s, { gradientOpacity: { to: 1 }, duration: DUR_MS * 0.1 }, DUR_MS * 0.75)

    tlRef.current = tl
    redraw()

    return () => { tl.cancel() }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    const tl = tlRef.current
    if (!tl) return
    if (isPlaying) { audio?.play(); tl.play() }
    else { audio?.pause(); tl.pause() }
  }, [isPlaying])

  function seek(newProgress: number) {
    const clamped = Math.max(0, Math.min(1, newProgress))
    const tl = tlRef.current
    if (!tl) return
    tl.seek(clamped * DURATION * 1000)
    setDisplayProgress(clamped)
    const audio = audioRef.current
    if (audio && audio.duration) audio.currentTime = clamped * audio.duration
    redraw()
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  const currentSeconds = Math.floor(displayProgress * DURATION)

  return (
    <div className="flex flex-col gap-3">
      <audio ref={audioRef} src="/audio/straight-line-graphs.m4a" />
      <canvas ref={canvasRef} width={800} height={450} className="w-full aspect-video rounded-xl" style={{ background: '#F7F9FB' }} />
      <div className="flex flex-col gap-2 px-1">
        <input type="range" min={0} max={1} step={0.001} value={displayProgress}
          onChange={(e) => seek(parseFloat(e.target.value))} className="w-full cursor-pointer accent-brand-blue" />
        <div className="flex items-center gap-3">
          <button onClick={() => seek(displayProgress - 10 / DURATION)} className="text-xs text-text-muted hover:text-text-primary">↺ 10s</button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="px-5 py-1.5 bg-brand-blue text-white rounded-lg text-sm font-medium hover:opacity-90">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => seek(displayProgress + 10 / DURATION)} className="text-xs text-text-muted hover:text-text-primary">10s ↻</button>
          <span className="text-xs text-text-muted ml-auto">{formatTime(currentSeconds)} / {formatTime(DURATION)}</span>
        </div>
      </div>
    </div>
  )
}