import Link from 'next/link'
import { getFeaturedInsights } from '@/lib/sanity/queries'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function NotesPreview() {
  const notes = await getFeaturedInsights(3)

  if (notes.length === 0) return null

  return (
    <section className="border-y border-[var(--border)]">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            [ Notes ]
          </p>
          <Link
            href="/notes"
            className="font-mono text-xs uppercase text-[var(--muted)] hover:text-[var(--fg)]"
          >
            More notes →
          </Link>
        </div>

        <div className="mt-8 divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {notes.map((note) => (
            <Link
              key={note._id}
              href={`/notes/${note.slug.current}`}
              className="block py-6"
            >
              <h3 className="text-lg font-medium">{note.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{note.excerpt}</p>
              <p className="mt-2 font-mono text-xs uppercase text-[var(--muted)]">
                {note.systemTag?.name} · {formatDate(note.publishedAt)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}