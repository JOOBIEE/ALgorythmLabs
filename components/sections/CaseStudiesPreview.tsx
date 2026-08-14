import Link from 'next/link'
import { getFeaturedCaseStudies } from '@/lib/sanity/queries'

export default async function CaseStudiesPreview() {
  const caseStudies = await getFeaturedCaseStudies(3)

  if (caseStudies.length === 0) return null

  return (
    <section id="case-studies" className="border-y border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            [ Case Studies ]
          </p>
          <Link
            href="/case-studies"
            className="font-mono text-xs uppercase text-[var(--muted)] hover:text-[var(--fg)]"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 divide-y divide-[var(--border)] border-t border-[var(--border)]">
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
        </div>
      </div>
    </section>
  )
}