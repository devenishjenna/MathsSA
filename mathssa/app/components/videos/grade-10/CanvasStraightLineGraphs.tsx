"use client"

import { useRef, useState, useEffect, useCallback } from "react"

const DURATION = 60

export default function StraightLineGraphs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayProgress, setDisplayProgress] = useState(0)
  const progressRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const playingRef = useRef(false)

  const W = 800, H = 450
  const OX = 80, OY = 370
  const SCALE = 38

  function toCanvas(mx: number, my: number): [number, number] {
    return [OX + mx * SCALE, OY - my * SCALE]
  }

  function drawAxes(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#8BA7C4'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(40, OY)
    ctx.lineTo(W - 30, OY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(OX, H - 30)
    ctx.lineTo(OX, 30)
    ctx.stroke()

    ctx.fillStyle = '#8BA7C4'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('x', W - 20, OY + 4)
    ctx.textAlign = 'left'
    ctx.fillText('y', OX + 6, 42)

    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    for (let x = -1; x <= 16; x++) {
      if (x === 0) continue
      const [cx] = toCanvas(x, 0)
      if (cx < 45 || cx > W - 35) continue
      ctx.beginPath()
      ctx.moveTo(cx, OY - 4)
      ctx.lineTo(cx, OY + 4)
      ctx.stroke()
      if (x % 2 === 0) ctx.fillText(String(x), cx, OY + 18)
    }

    ctx.textAlign = 'right'
    for (let y = -8; y <= 8; y++) {
      if (y === 0) continue
      const [, cy] = toCanvas(0, y)
      if (cy < 35 || cy > H - 35) continue
      ctx.beginPath()
      ctx.moveTo(OX - 4, cy)
      ctx.lineTo(OX + 4, cy)
      ctx.stroke()
      if (y % 2 === 0) ctx.fillText(String(y), OX - 8, cy + 4)
    }

    ctx.textAlign = 'right'
    ctx.fillText('0', OX - 6, OY + 16)
  }

  function drawScene(ctx: CanvasRenderingContext2D, p: number) {
    ctx.clearRect(0, 0, W, H)
    drawAxes(ctx)

    if (p > 0) {
      const linePct = Math.min(1, p / 0.4)
      const xEnd = -1 + (17 * linePct)

      ctx.strokeStyle = '#2E7DD1'
      ctx.lineWidth = 3
      ctx.beginPath()
      let first = true
      for (let mx = -1; mx <= xEnd; mx += 0.05) {
        const my = 2 * mx + 1
        const [cx, cy] = toCanvas(mx, my)
        if (first) { ctx.moveTo(cx, cy); first = false }
        else ctx.lineTo(cx, cy)
      }
      ctx.stroke()
    }

    if (p > 0.3) {
      ctx.globalAlpha = Math.min(1, (p - 0.3) / 0.1)
      ctx.fillStyle = '#0D1B2A'
      ctx.font = 'bold 22px Arial'
      ctx.textAlign = 'left'
      ctx.fillText('y = 2x + 1', W - 220, 60)
      ctx.globalAlpha = 1
    }

    if (p > 0.45) {
      ctx.globalAlpha = Math.min(1, (p - 0.45) / 0.1)
      const [px, py] = toCanvas(0, 1)
      ctx.fillStyle = '#1D9E75'
      ctx.beginPath()
      ctx.arc(px, py, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.font = '13px Arial'
      ctx.textAlign = 'left'
      ctx.fillText('y-intercept c = 1  →  (0, 1)', px + 10, py - 6)
      ctx.globalAlpha = 1
    }

    if (p > 0.6) {
      ctx.globalAlpha = Math.min(1, (p - 0.6) / 0.1)
      const [x1, y1] = toCanvas(3, 7)
      const [x2, y2] = toCanvas(4, 7)
      const [x3, y3] = toCanvas(4, 9)
      ctx.strokeStyle = '#FAC775'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.lineTo(x3, y3)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = '#FAC775'
      ctx.font = '13px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('run = 1', (x1 + x2) / 2, y2 + 16)
      ctx.textAlign = 'left'
      ctx.fillText('rise = 2', x2 + 6, (y2 + y3) / 2 + 4)
      ctx.globalAlpha = 1
    }

    if (p > 0.75) {
      ctx.globalAlpha = Math.min(1, (p - 0.75) / 0.1)
      ctx.fillStyle = '#556B82'
      ctx.font = '14px Arial'
      ctx.textAlign = 'left'
      ctx.fillText('gradient m = 2', W - 220, 88)
      ctx.globalAlpha = 1
    }
  }

  const renderFrame = useCallback((timestamp: number) => {
    if (!playingRef.current) return

    // drive progress from audio if available, otherwise use timer
    const audio = audioRef.current
    let newProgress: number

    if (audio && !audio.paused && audio.duration) {
      newProgress = Math.min(audio.currentTime / audio.duration, 1)
    } else {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp - progressRef.current * DURATION * 1000
      }
      const elapsed = timestamp - startTimeRef.current
      newProgress = Math.min(elapsed / (DURATION * 1000), 1)
    }

    progressRef.current = newProgress
    setDisplayProgress(newProgress)

    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) drawScene(ctx, newProgress)
    }

    if (newProgress < 1) {
      animationIdRef.current = requestAnimationFrame(renderFrame)
    } else {
      playingRef.current = false
      setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawScene(ctx, 0)
  }, [])

  useEffect(() => {
    const audio = audioRef.current

    if (isPlaying) {
      playingRef.current = true
      startTimeRef.current = null
      audio?.play()
      animationIdRef.current = requestAnimationFrame(renderFrame)
    } else {
      playingRef.current = false
      audio?.pause()
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
    }

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
    }
  }, [isPlaying, renderFrame])

  function seek(newProgress: number) {
    const clamped = Math.max(0, Math.min(1, newProgress))
    progressRef.current = clamped
    startTimeRef.current = null
    setDisplayProgress(clamped)

    // seek audio to matching position
    const audio = audioRef.current
    if (audio && audio.duration) {
      audio.currentTime = clamped * audio.duration
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawScene(ctx, clamped)
  }

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const currentSeconds = Math.floor(displayProgress * DURATION)

  return (
    <div className="flex flex-col gap-3">

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/straight-line-graphs.m4a" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="w-full aspect-video rounded-xl"
        style={{ background: '#F7F9FB' }}
      />

      {/* Controls */}
      <div className="flex flex-col gap-2 px-1">

        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={displayProgress}
          onChange={(e) => seek(parseFloat(e.target.value))}
          className="w-full cursor-pointer accent-brand-blue"
        />

        {/* Buttons row */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => seek(progressRef.current - 10 / DURATION)}
            className="text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            ↺ 10s
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-1.5 bg-brand-blue text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            onClick={() => seek(progressRef.current + 10 / DURATION)}
            className="text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            10s ↻
          </button>

          <span className="text-xs text-text-muted ml-auto">
            {formatTime(currentSeconds)} / {formatTime(DURATION)}
          </span>
        </div>

      </div>
    </div>
  )
}