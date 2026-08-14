'use client'

import { useState, useRef, useEffect } from 'react'
import {
  SiFigma,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiD3,
  SiWordpress,
  SiShopify,
  SiSquarespace,
  SiSanity,
  SiGooglesheets,
  SiBuffer,
  SiZapier,
  SiMake,
  SiN8N,
  SiClaude,
  SiVercel,
  SiGithub,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

interface Tool {
  name: string
  icon?: IconType
  iconSrc?: string // local SVG for logos not in react-icons/si
  brandColor?: string // real hex — omit for monochrome-brand icons
  monochrome?: boolean // true = brand mark is officially black/near-black
}

const tools: Tool[] = [
  { name: 'Figma', icon: SiFigma, brandColor: '#F24E1E' },
  { name: 'Adobe Creative Cloud', iconSrc: '/icons/adobe-creative-cloud.svg' },
  { name: 'Canva', iconSrc: '/icons/canva.svg' },
  { name: 'Next.js', icon: SiNextdotjs, monochrome: true },
  { name: 'React', icon: SiReact, brandColor: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, brandColor: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, brandColor: '#06B6D4' },
  { name: 'Framer Motion', icon: SiFramer, brandColor: '#0055FF' },
  { name: 'D3.js', icon: SiD3, brandColor: '#F9A03C' },
  { name: 'WordPress', icon: SiWordpress, brandColor: '#21759B' },
  { name: 'Shopify', icon: SiShopify, brandColor: '#7AB55C' },
  { name: 'Squarespace', icon: SiSquarespace, monochrome: true },
  { name: 'Bubble', iconSrc: '/icons/bubble.svg' },
  { name: 'Sanity', icon: SiSanity, monochrome: true },
  { name: 'Google Sheets', icon: SiGooglesheets, brandColor: '#34A853' },
  { name: 'Buffer', icon: SiBuffer, monochrome: true },
  { name: 'Metricool', iconSrc: '/icons/metricool.svg' },
  { name: 'Zapier', icon: SiZapier, brandColor: '#FF4F00' },
  { name: 'Make', icon: SiMake, brandColor: '#6D00CC' },
  { name: 'n8n', icon: SiN8N, brandColor: '#EA4B71' },
  { name: 'Claude', icon: SiClaude, brandColor: '#D97757' },
  { name: 'Vercel', icon: SiVercel, monochrome: true },
  { name: 'GitHub', icon: SiGithub, monochrome: true },
]

function ToolItem({
  tool,
  isActive,
  onTap,
  onHover,
}: {
  tool: Tool
  isActive: boolean
  onTap: () => void
  onHover: (hovering: boolean) => void
}) {
  const Icon = tool.icon

  // react-icons/si renders fill="currentColor" — there is no baked-in
  // brand color, so we supply it ourselves via CSS `color`, then use
  // the grayscale filter to fade it in/out on hover or tap.
  const iconStyle: React.CSSProperties = tool.monochrome
    ? {
        color: isActive ? 'var(--fg)' : 'var(--muted)',
        opacity: isActive ? 1 : 0.55,
        transition: 'color 300ms ease, opacity 300ms ease',
      }
    : {
        color: tool.brandColor,
        filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
        transition: 'filter 300ms ease',
      }

  // Local SVG / <img> logos already have real colors baked into the file
  const imgStyle: React.CSSProperties = {
    filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
    transition: 'filter 300ms ease',
  }

  return (
    <button
      type="button"
      onClick={onTap}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="group relative flex shrink-0 flex-col items-center gap-2 px-2"
    >
      <div className="flex h-10 w-10 items-center justify-center">
        {Icon ? (
          <Icon size={28} style={iconStyle} />
        ) : tool.iconSrc ? (
          <img
            src={tool.iconSrc}
            alt={tool.name}
            className="h-8 w-8 object-contain"
            style={imgStyle}
          />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center border border-[var(--border)] font-mono text-[11px] uppercase leading-tight text-[var(--muted)]">
            {tool.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 3)}
          </span>
        )}
      </div>

      <span
        className={`pointer-events-none absolute -bottom-6 whitespace-nowrap font-mono text-[11px] uppercase text-[var(--fg)] transition-opacity duration-200 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {tool.name}
      </span>
    </button>
  )
}

export default function ToolsStrip() {
  const [tappedId, setTappedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Tap outside closes the pinned (mobile) tooltip
  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setTappedId(null)
      }
    }
    document.addEventListener('touchstart', handleOutside)
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('touchstart', handleOutside)
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [])

  const activeId = tappedId ?? hoveredId
  const looped = [...tools, ...tools]

  return (
    <section
      ref={containerRef}
      className="overflow-hidden border-y border-[var(--border)] py-10"
    >
      <div
        className={`animate-marquee flex w-max gap-10 ${
          activeId ? '[animation-play-state:paused]' : ''
        }`}
      >
        {looped.map((tool, i) => {
          const id = `${tool.name}-${i}`
          return (
            <ToolItem
              key={id}
              tool={tool}
              isActive={activeId === id}
              onTap={() => setTappedId(tappedId === id ? null : id)}
              onHover={(hovering) => setHoveredId(hovering ? id : null)}
            />
          )
        })}
      </div>
    </section>
  )
}