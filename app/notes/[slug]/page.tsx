import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { getInsightBySlug, getInsightSlugs } from '@/lib/sanity/queries'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getInsightSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = await getInsightBySlug(slug)
  if (!insight) return {}
  return {
    title: `${insight.title} — Algorythm Labs`,
    description: insight.seoDescription || insight.excerpt,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-neutral-500 pl-6 text-xl">
        {children}
      </blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-medium">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-medium">{children}</h3>
    ),
  },
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = await getInsightBySlug(slug)
  if (!insight) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.seoDescription || insight.excerpt,
    datePublished: insight.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Algorythm Labs',
    },
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="font-mono text-xs uppercase text-[var(--muted)]">
        {insight.systemTag?.name} SYSTEMS · {formatDate(insight.publishedAt)} ·{' '}
        {insight.readTime} min read
      </p>
      <h1 className="mt-3 text-4xl font-semibold">{insight.title}</h1>

      <div className="prose prose-invert mt-10 max-w-none leading-relaxed">
        <PortableText value={insight.body} components={portableTextComponents} />
      </div>

      {insight.systemTag && (
        <Link
          href={`/#systems`}
          className="mt-12 block border border-[var(--border)] p-4 font-mono text-sm"
        >
          → Related System: {insight.systemTag.name}
        </Link>
      )}

      <Link
        href="/#start-here"
        className="mt-10 inline-block border border-[var(--fg)] px-6 py-3 font-mono text-sm uppercase"
      >
        Tell us where you're stuck
      </Link>

      {insight.relatedEssays?.length > 0 && (
        <div className="mt-16 border-t border-[var(--border)] pt-8">
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            Related notes
          </p>
          <ul className="mt-4 space-y-2">
            {insight.relatedEssays.map((r) => (
              <li key={r._id}>
                <Link href={`/notes/${r.slug.current}`} className="underline">
                  {r.title}
                </Link>
                <span className="ml-2 font-mono text-xs text-[var(--muted)]">
                  {r.systemTag?.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}