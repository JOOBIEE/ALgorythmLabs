import type { DiagnosticReportContent } from '@/lib/diagnosticReport'

export default function DiagnosticReport({ report }: { report: DiagnosticReportContent }) {
  return (
    <div className="mt-6 border border-[var(--border)]">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <p className="font-mono text-xs uppercase text-[var(--muted)]">
          Live Document Transmission
        </p>
        <h3 className="mt-1 text-lg font-semibold">
          Diagnostic Report: {report.name}
        </h3>
        <p className="mt-1 font-mono text-xs text-[var(--muted)]">
          Report ID: {report.reportId} ·{' '}
          {new Date(report.timestamp).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-6 p-4">
        <div>
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            Recommended System
          </p>
          <p className="mt-1 text-xl font-semibold">{report.recommendedSystem}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {report.systemDescription}
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            Recommended Next Steps
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
            {report.nextSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>

        {report.secondarySignals.length > 0 && (
          <p className="font-mono text-xs text-[var(--muted)]">
            Secondary signals: {report.secondarySignals.join(', ')}
          </p>
        )}

        <p className="border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
          A copy of this report has been sent to your email.
        </p>
      </div>
    </div>
  )
}