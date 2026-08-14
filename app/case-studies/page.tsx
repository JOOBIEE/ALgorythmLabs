import Link from 'next/link'
import { getAllCaseStudies } from '@/lib/sanity/queries'

export const metadata = {
  title: 'Case Studies — Algorythm Labs',
  description: 'Intelligence reports from systems deployed in the field.',
}

export const revalidate = 60

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-sm text-[var(--muted)]">// case studies</p>
      <p className="mt-2 text-lg">
        Intelligence reports from systems deployed in the field.
      </p>

      <div className="mt-10 divide-y divide-[var(--border)] border-t border-[var(--border)]">
        {caseStudies.map((cs) => (
          <Link
            key={cs._id}
            href={`/case-studies/${cs.slug.current}`}
            className="flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-center"
          >
            <span className="text-lg font-medium">{cs.title}</span>
            {cs.homepageSummary && (
              <span className="font-mono text-sm text-[var(--muted)]">
                {cs.homepageSummary}
              </span>
            )}
          </Link>
        ))}
        {caseStudies.length === 0 && (
          <p className="py-12 text-center text-[var(--muted)]">
            No case studies published yet.
          </p>
        )}
      </div>
    </main>
  )
}