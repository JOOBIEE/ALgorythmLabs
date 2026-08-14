'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import type { System } from '@/lib/sanity/queries'

export default function FiveSystemsGrid({ systems }: { systems: System[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="grid divide-y divide-[var(--border)] border-y border-[var(--border)] sm:grid-cols-5 sm:divide-x sm:divide-y-0">
      {systems.map((system) => {
        const isExpanded = expandedId === system._id
        return (
          <div key={system._id} className="flex flex-col px-6 py-8">
            <span className="font-mono text-xs text-[var(--muted)]">
              {String(system.index).padStart(2, '0')}
            </span>
            <h3 className="mt-8 text-xl font-medium">{system.name}</h3>
            <p className="mt-3 flex-1 text-sm text-[var(--muted)]">
              {system.shortDescription}
            </p>
            <button
              onClick={() => setExpandedId(isExpanded ? null : system._id)}
              aria-expanded={isExpanded}
              className="mt-6 border border-[var(--border)] px-4 py-2 font-mono text-xs uppercase"
            >
              {isExpanded ? 'Close' : `Expand ${String(system.index).padStart(2, '0')}`}
            </button>

            {isExpanded && system.expandedContent && (
              <div className="mt-6 border-t border-[var(--border)] pt-6 text-sm leading-relaxed">
                <PortableText value={system.expandedContent} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}