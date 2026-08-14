'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { InsightListItem, System } from '@/lib/sanity/queries'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function NotesFilterList({
  insights,
  systems,
}: {
  insights: InsightListItem[]
  systems: System[]
}) {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return insights
    return insights.filter((i) => i.systemTag?.name === activeFilter)
  }, [activeFilter, insights])

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-2 border-y border-neutral-800 py-4 font-mono text-xs uppercase">
        <button
          onClick={() => setActiveFilter('All')}
          className={`border px-3 py-1 ${
            activeFilter === 'All'
              ? 'border-current'
              : 'border-[var(--border)] text-[var(--muted)]'
          }`}
        >
          All
        </button>
        {systems.map((s) => (
          <button
            key={s._id}
            onClick={() => setActiveFilter(s.name)}
            className={`border px-3 py-1 ${
  activeFilter === s.name
    ? 'border-current'
    : 'border-[var(--border)] text-[var(--muted)]'
}`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((insight) => (
          <Link
            key={insight._id}
            href={`/notes/${insight.slug.current}`}
            className="block border-b border-neutral-800 py-6"
          >
            <h2 className="text-xl font-medium">{insight.title}</h2>
            <p className="mt-1 text-[var(--muted)]">{insight.excerpt}</p>
            <p className="mt-2 font-mono text-xs uppercase text-[var(--muted)]">
              {insight.systemTag?.name} · {formatDate(insight.publishedAt)} ·{' '}
              {insight.readTime} min read
            </p>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-[var(--muted)]">
            No essays yet in this system.
          </p>
        )}
      </div>
    </div>
  )
}