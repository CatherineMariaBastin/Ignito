import { useEffect, useRef } from 'react'

// A full-viewport fixed canvas of drifting stars that gently part and glow
// around the user's cursor / finger, like disturbing dust in a nebula.
export default function StarfieldCanvas() {
  const canvasRef = useRef(null)
  const pointer = useRef({ x: -9999, y: -9999, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let width, height
    let stars = []

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const STAR_COLORS = ['#f4f4ff', '#a9c3ff', '#ffd23f', '#ff9fd0', '#8fffdd']

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      const count = Math.round((width * height) / 9000)
      stars = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        baseR: 0,
        speed: Math.random() * 0.15 + 0.02,
        twinkle: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }))
      stars.forEach((s) => (s.baseR = s.r))
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      const { x: px, y: py, active } = pointer.current

      for (const s of stars) {
        s.twinkle += 0.02
        s.y -= s.speed
        if (s.y < -5) {
          s.y = height + 5
          s.x = Math.random() * width
        }

        let r = s.baseR + Math.sin(s.twinkle) * 0.4
        let alpha = 0.55 + Math.sin(s.twinkle) * 0.4

        if (active) {
          const dx = s.x - px
          const dy = s.y - py
          const dist = Math.sqrt(dx * dx + dy * dy)
          const radius = 140
          if (dist < radius) {
            const force = (1 - dist / radius) * 6
            s.x += (dx / (dist || 1)) * force * 0.12
            s.y += (dy / (dist || 1)) * force * 0.12
            r += (1 - dist / radius) * 2.4
            alpha = Math.min(1, alpha + (1 - dist / radius))
          }
        }

        ctx.beginPath()
        ctx.fillStyle = s.color
        ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha))
        ctx.arc(s.x, s.y, Math.max(0.2, r), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (active) {
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 160)
        glow.addColorStop(0, 'rgba(58,92,255,0.16)')
        glow.addColorStop(1, 'rgba(58,92,255,0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(px, py, 160, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }

    function handleMove(e) {
      const touch = e.touches && e.touches[0]
      pointer.current.x = touch ? touch.clientX : e.clientX
      pointer.current.y = touch ? touch.clientY : e.clientY
      pointer.current.active = true
    }
    function handleLeave() {
      pointer.current.active = false
    }

    resize()
    draw()
    if (prefersReduced) {
      // Draw a single static frame for reduced-motion users.
      draw()
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleMove, { passive: true })
    window.addEventListener('touchstart', handleMove, { passive: true })
    window.addEventListener('mouseleave', handleLeave)
    window.addEventListener('touchend', handleLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchstart', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('touchend', handleLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
