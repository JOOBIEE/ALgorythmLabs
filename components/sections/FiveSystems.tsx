import { getAllSystems } from '@/lib/sanity/queries'
import FiveSystemsGrid from './FiveSystemsGrid'

export default async function FiveSystems() {
  const systems = await getAllSystems()

  if (systems.length === 0) return null

  return (
    <section id="systems" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase text-[var(--muted)]">
        [ The Five Systems ]
      </p>
      <FiveSystemsGrid systems={systems} />
    </section>
  )
}