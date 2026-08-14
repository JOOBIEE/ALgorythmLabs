'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isLocked, setIsLocked] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    // Only enable on devices with a real mouse — meaningless on touch,
    // and we don't want it interfering with tap interactions there.
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setIsEnabled(hasFinePointer)
    if (!hasFinePointer) return

    function handleMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      setIsLocked(!!target.closest('a, button, [role="button"]'))
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  if (!isEnabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[200] transition-transform duration-150 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isLocked ? 1.6 : 1})`,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="var(--fg)"
          strokeWidth={isLocked ? 1.5 : 1}
          opacity={isLocked ? 1 : 0.5}
        />
        <line x1="12" y1="0" x2="12" y2="5" stroke="var(--fg)" opacity={isLocked ? 1 : 0.4} />
        <line x1="12" y1="19" x2="12" y2="24" stroke="var(--fg)" opacity={isLocked ? 1 : 0.4} />
        <line x1="0" y1="12" x2="5" y2="12" stroke="var(--fg)" opacity={isLocked ? 1 : 0.4} />
        <line x1="19" y1="12" x2="24" y2="12" stroke="var(--fg)" opacity={isLocked ? 1 : 0.4} />
      </svg>
    </div>
  )
}