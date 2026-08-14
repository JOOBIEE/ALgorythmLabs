import Link from 'next/link'
import { getAllInsights, getAllSystems } from '@/lib/sanity/queries'
import NotesFilterList from '@/components/sections/NotesFilterList'

export const metadata = {
  title: 'Notes — Algorythm Labs',
  description: 'Thinking on branding, systems, and growth. Documented as we build.',
}

export const revalidate = 60

export default async function NotesPage() {
  const [insights, systems] = await Promise.all([
    getAllInsights(),
    getAllSystems(),
  ])

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-sm text-[var(--muted)]">// notes</p>
      <p className="mt-2 text-lg">
        Thinking on branding, systems, and growth. Documented as we build.
      </p>

      <NotesFilterList insights={insights} systems={systems} />
    </main>
  )
}