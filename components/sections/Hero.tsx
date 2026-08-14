'use client'

import { useEffect, useRef } from 'react'

const GRID_COLS = 14
const GRID_ROWS = 9
const PULL_RADIUS = 90
const PULL_STRENGTH = 10

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = gridRef.current
    if (!container) return

    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      dotsRef.current.forEach((dot) => {
        if (!dot) return
        const dotX = dot.offsetLeft
        const dotY = dot.offsetTop
        const dx = mouseX - dotX
        const dy = mouseY - dotY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < PULL_RADIUS) {
          const force = (1 - distance / PULL_RADIUS) * PULL_STRENGTH
          const angle = Math.atan2(dy, dx)
          const offsetX = Math.cos(angle) * force
          const offsetY = Math.sin(angle) * force
          dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`
        } else {
          dot.style.transform = 'translate(0, 0)'
        }
      })
    }

    function handleMouseLeave() {
      dotsRef.current.forEach((dot) => {
        if (dot) dot.style.transform = 'translate(0, 0)'
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const dots = Array.from({ length: GRID_COLS * GRID_ROWS })

  return (
    <section className="relative overflow-hidden pt-40 pb-32">
      {/* Blueprint grid background — decorative, aria-hidden */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className="pointer-events-auto absolute inset-0 hidden sm:flex flex-wrap content-between justify-between px-8 py-8 opacity-[0.15]"
      >
        {dots.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el
            }}
            className="h-1 w-1 rounded-full bg-[var(--fg)] transition-transform duration-150 ease-out"
            style={{
              position: 'absolute',
              left: `${(i % GRID_COLS) * (100 / (GRID_COLS - 1))}%`,
              top: `${Math.floor(i / GRID_COLS) * (100 / (GRID_ROWS - 1))}%`,
            }}
          />
        ))}
      </div>

      {/* Real, immediately-present content — nothing here waits on JS */}
      <div className="relative mx-auto max-w-4xl px-6">
        <h1 className="animate-mask-wipe text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Systems for growing brands.
          <br />
          We prove it on ourselves before we sell it.
        </h1>

        <p className="mt-6 max-w-xl font-mono text-sm text-[var(--muted)]">
          [LOG_INIT]: Deploying operational architectures designed for
          scale. No theory. No bloat. Pure execution.
        </p>
      </div>
    </section>
  )
}