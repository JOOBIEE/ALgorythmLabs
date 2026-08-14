import Link from 'next/link'
import { getSystemStatus } from '@/lib/systemStatus'
import { getProofStats } from '@/lib/sanity/queries'

function pluralize(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? '' : 'S'}`
}

export default async function ProofStrip() {
  const [status, stats] = await Promise.all([
    getSystemStatus(),
    getProofStats(),
  ])

  const staticStats = stats
    ? [
        { label: `${pluralize(stats.provenCount, 'SYSTEM')} PROVEN.` },
        { label: `${pluralize(stats.inProgressCount, 'SYSTEM')} IN PROGRESS.` },
        { label: `${pluralize(stats.soldBeforeTestedCount, 'SYSTEM')} SOLD BEFORE TESTED.` },
      ]
    : [
        // Fallback if the Sanity document hasn't been created/published yet —
        // keeps the section from rendering empty or breaking.
        { label: '1 SYSTEM PROVEN.' },
        { label: '1 IN PROGRESS.' },
        { label: '0 SOLD BEFORE TESTED.' },
      ]

  return (
    <section className="border-y border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col divide-y divide-[var(--border)] sm:flex-row sm:divide-x sm:divide-y-0">
        {staticStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-1 items-center gap-3 px-6 py-4"
          >
            <span
              aria-hidden="true"
              className="animate-pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--fg)]"
            />
            <span className="font-mono text-xs uppercase tracking-wide text-[var(--muted)]">
              {stat.label}
            </span>
          </div>
        ))}

        <Link
          href="/status"
          className="flex flex-1 items-center gap-3 px-6 py-4 hover:bg-[var(--border)]/20"
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full animate-pulse-dot ${
              status.cmsConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-wide text-[var(--muted)]">
            LIVE: {status.cmsConnected ? 'OPERATIONAL' : 'DEGRADED'} ·{' '}
            {status.latencyMs}ms →
          </span>
        </Link>
      </div>
    </section>
  )
}