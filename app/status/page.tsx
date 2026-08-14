import { getSystemStatus } from '@/lib/systemStatus'

// Forces this route to run fresh on every request — no caching, no
// static generation. If this page could be cached, the latency number
// and counts would go stale, which defeats the entire purpose of it.
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'System Status — Algorythm Labs',
  description: 'Live operational status of the infrastructure running this site.',
}

export default async function StatusPage() {
  const status = await getSystemStatus()
  const environment = process.env.VERCEL_ENV || 'development'
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local'
  const checkedAt = new Date().toISOString()

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs uppercase text-[var(--muted)]">
        // status
      </p>
      <h1 className="mt-2 text-2xl font-semibold">System Status</h1>
      <p className="mt-2 text-[var(--muted)]">
        A live read on the infrastructure running this site — no theory,
        just what's actually operational right now.
      </p>

      <div className="mt-10 border border-[var(--border)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <span className="font-mono text-xs uppercase text-[var(--muted)]">
            SYSTEM_STATUS.LOG
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full animate-pulse-dot ${
                status.cmsConnected ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="font-mono text-xs uppercase">
              {status.cmsConnected ? 'Operational' : 'Degraded'}
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-6 font-mono text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-[var(--muted)]">Environment</p>
            <p className="mt-1">{environment}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-[var(--muted)]">Build Commit</p>
            <p className="mt-1">{commitSha}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-[var(--muted)]">CMS Latency</p>
            <p className="mt-1">{status.latencyMs}ms</p>
          </div>
          <div>
            <p className="text-xs uppercase text-[var(--muted)]">Checked At</p>
            <p className="mt-1">{checkedAt}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px border-t border-[var(--border)] bg-[var(--border)] sm:grid-cols-5">
          {[
            { label: 'Systems', value: status.counts.systems },
            { label: 'Case Studies', value: status.counts.caseStudies },
            { label: 'Notes', value: status.counts.notes },
            { label: 'Testimonials', value: status.counts.testimonials },
            { label: 'Graph Nodes', value: status.counts.graphNodes },
          ].map((item) => (
            <div key={item.label} className="bg-[var(--bg)] p-4 text-center">
              <p className="text-2xl font-semibold">{item.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase text-[var(--muted)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}