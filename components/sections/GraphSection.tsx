import { getGraphNodes } from '@/lib/sanity/queries'
import RelationalGraph from '@/components/graph/RelationalGraph'

export default async function GraphSection() {
  const nodes = await getGraphNodes('home')
  if (nodes.length === 0) return null

  return (
    <div className="mx-auto max-w-2xl px-6 pb-16">
      <div className="border border-[var(--border)] px-4 py-6">
        <RelationalGraph nodes={nodes} />
      </div>
    </div>
  )
}