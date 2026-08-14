'use client'

import { useState, useEffect, useRef } from 'react'
import type { GraphNode } from '@/lib/sanity/queries'

interface Props {
  nodes: GraphNode[]
  height?: number
  cycleInterval?: number
}

export default function RelationalGraph({
  nodes,
  height = 320,
  cycleInterval = 3000,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [autoFocusId, setAutoFocusId] = useState<string | null>(null)
  const cycleIndexRef = useRef(0)

  useEffect(() => {
    if (nodes.length === 0) return
    if (hoveredId || activeId) return

    const id = setInterval(() => {
      cycleIndexRef.current = (cycleIndexRef.current + 1) % nodes.length
      setAutoFocusId(nodes[cycleIndexRef.current]._id)
    }, cycleInterval)

    if (!autoFocusId) setAutoFocusId(nodes[0]?._id ?? null)

    return () => clearInterval(id)
  }, [nodes, hoveredId, activeId, cycleInterval])

  const focusId = hoveredId ?? activeId ?? autoFocusId
  const activeNode = nodes.find((n) => n._id === activeId)

  function getConnectedIds(id: string | null): Set<string> {
    if (!id) return new Set()
    const node = nodes.find((n) => n._id === id)
    const direct = new Set(node?.connections?.map((c) => c._id) ?? [])
    nodes.forEach((n) => {
      if (n.connections?.some((c) => c._id === id)) direct.add(n._id)
    })
    direct.add(id)
    return direct
  }

  const connectedIds = getConnectedIds(focusId)

  const edges: { from: GraphNode; to: GraphNode }[] = []
  const seen = new Set<string>()
  nodes.forEach((node) => {
    node.connections?.forEach((conn) => {
      const target = nodes.find((n) => n._id === conn._id)
      if (!target || !node.position || !target.position) return
      const key = [node._id, target._id].sort().join('-')
      if (seen.has(key)) return
      seen.add(key)
      edges.push({ from: node, to: target })
    })
  })

  return (
    <div className="relative">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ height }}
        className="w-full"
        role="img"
        aria-label="Diagram of Algorythm Labs' five core systems connected to a central node"
      >
        {edges.map(({ from, to }) => {
          const isFocused = focusId && connectedIds.has(from._id) && connectedIds.has(to._id)
          const isDimmed = focusId && !isFocused
          return (
            <line
              key={`${from._id}-${to._id}`}
              x1={from.position!.x}
              y1={from.position!.y}
              x2={to.position!.x}
              y2={to.position!.y}
              stroke="var(--border)"
              strokeWidth={isFocused ? 0.4 : 0.2}
              opacity={isDimmed ? 0.25 : 1}
              className="transition-all duration-500"
            />
          )
        })}

        {nodes.map((node) => {
          if (!node.position) return null
          const isFocused = focusId === node._id
          const isDimmed = focusId ? !connectedIds.has(node._id) : false
          const isCore = node.nodeType === 'core'
          const baseRadius = isCore ? 4 : 2.4
          const radius = isFocused && !isCore ? baseRadius * 1.35 : baseRadius

          return (
            <g
              key={node._id}
              transform={`translate(${node.position.x}, ${node.position.y})`}
              onMouseEnter={() => setHoveredId(node._id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setActiveId(activeId === node._id ? null : node._id)}
              className="cursor-pointer transition-opacity duration-500"
              opacity={isDimmed ? 0.3 : 1}
            >
              <circle
                r={radius}
                fill={isCore || isFocused ? 'var(--fg)' : 'var(--bg)'}
                stroke="var(--fg)"
                strokeWidth={isFocused ? 0.55 : 0.4}
                className="transition-all duration-500"
              />
              <text
                y={-radius - 2}
                textAnchor="middle"
                fontSize={isFocused ? 3.4 : 2.9}
                fontFamily="monospace"
                fontWeight={isFocused ? 700 : 400}
                fill="var(--fg)"
                className="uppercase tracking-wide transition-all duration-500"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      {activeNode && (activeNode.bio || activeNode.relatedSystem?.shortDescription) && (
        <div className="mt-4 border-t border-[var(--border)] px-4 pt-4">
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            {activeNode.label}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {activeNode.bio || activeNode.relatedSystem?.shortDescription}
          </p>
        </div>
      )}
    </div>
  )
}