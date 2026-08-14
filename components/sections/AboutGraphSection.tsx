import { getGraphNodes } from '@/lib/sanity/queries'
import RelationalGraph from '@/components/graph/RelationalGraph'

export default async function AboutGraphSection() {
  const nodes = await getGraphNodes('about')
  if (nodes.length === 0) return null

  return (
    <div className="border border-[var(--border)] px-4 py-6">
      <RelationalGraph nodes={nodes} height={360} cycleInterval={3000} />
    </div>
  )
}