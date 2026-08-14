import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return {}
  return {
    title: `${cs.title} — Algorythm Labs`,
    description: cs.seoDescription || cs.homepageSummary,
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Intelligence Report: ${cs.title}`,
    description: cs.seoDescription || cs.homepageSummary,
    datePublished: cs.timestamp,
    author: {
      '@type': 'Organization',
      name: 'Algorythm Labs',
    },
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="font-mono text-xs uppercase text-[var(--muted)]">
        Live Document Transmission
      </p>
      <h1 className="mt-2 text-4xl font-semibold">
        Intelligence Report: {cs.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 font-mono text-xs uppercase text-[var(--muted)]">
        {cs.reportId && <span>Report ID: {cs.reportId}</span>}
        {cs.timestamp && <span>Timestamp: {formatDate(cs.timestamp)}</span>}
        {cs.systemApplied && <span>System Applied: {cs.systemApplied}</span>}
      </div>

      {cs.initialPerception?.heading && (
        <section className="mt-16 border-t border-[var(--border)] pt-8">
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            01 — Initial Perception
          </p>
          <h2 className="mt-3 text-2xl font-medium">
            {cs.initialPerception.heading}
          </h2>
          {cs.initialPerception.body && (
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              {cs.initialPerception.body}
            </p>
          )}
          {cs.initialPerception.figureImage && (
            <Image
              src={urlFor(cs.initialPerception.figureImage).width(900).url()}
              alt={cs.initialPerception.figureLabel || ''}
              width={900}
              height={500}
              className="mt-6 w-full border border-[var(--border)]"
            />
          )}
        </section>
      )}

      {cs.intervention && (
        <section className="mt-16 border-t border-[var(--border)] pt-8">
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            02 — Intervention
          </p>
          {cs.intervention.appliedLogicLabel && (
            <h2 className="mt-3 text-xl font-medium">
              Applied Logic: {cs.intervention.appliedLogicLabel}
            </h2>
          )}
          {cs.intervention.bulletPoints && (
            <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--muted)]">
              {cs.intervention.bulletPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          )}
          {cs.intervention.figureImage && (
            <Image
              src={urlFor(cs.intervention.figureImage).width(900).url()}
              alt={cs.intervention.figureLabel || ''}
              width={900}
              height={500}
              className="mt-6 w-full border border-[var(--border)]"
            />
          )}
        </section>
      )}

      {cs.result && (
        <section className="mt-16 border-t border-[var(--border)] pt-8">
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            03 — Result
          </p>
          {cs.result.metrics && (
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {cs.result.metrics.map((m, i) => (
                <div key={i}>
                  <p className="font-mono text-xs uppercase text-[var(--muted)]">
                    {m.label}
                  </p>
                  <p className="mt-1 text-4xl font-semibold sm:text-4xl">{m.value}</p>
                </div>
              ))}
            </div>
          )}
          {cs.result.quote && (
            <blockquote className="mt-10 border-l-2 border-[var(--border)] pl-6 text-lg leading-relaxed">
              "{cs.result.quote}"
              {cs.result.quoteAuthorName && (
                <footer className="mt-3 font-mono text-xs uppercase text-[var(--muted)]">
                  {cs.result.quoteAuthorName}
                  {cs.result.quoteAuthorTitle && `, ${cs.result.quoteAuthorTitle}`}
                </footer>
              )}
            </blockquote>
          )}
        </section>
      )}

      <div className="mt-16 flex justify-between border-t border-[var(--border)] pt-8">
        <Link
          href="/case-studies"
          className="font-mono text-xs uppercase text-[var(--muted)]"
        >
          ← Back to Case Studies
        </Link>
        <Link
          href="/#start-here"
          className="border border-[var(--fg)] px-4 py-2 font-mono text-xs uppercase"
        >
          Tell us where you're stuck
        </Link>
      </div>
    </main>
  )
}