import { Suspense } from 'react'
import Reveal from '@/components/ui/Reveal'
import Hero from '@/components/sections/Hero'
import GraphSection from '@/components/sections/GraphSection'
import ProofStrip from '@/components/sections/ProofStrip'
import AboutSection from '@/components/sections/AboutSection'
import FiveSystems from '@/components/sections/FiveSystems'
import CaseStudiesPreview from '@/components/sections/CaseStudiesPreview'
import Process from '@/components/sections/Process'
import ToolsStrip from '@/components/sections/ToolsStrip'
import NotesPreview from '@/components/sections/NotesPreview'
import Testimonials from '@/components/sections/Testimonials'
import StartHere from '@/components/sections/StartHere'

function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="h-6 w-32 animate-pulse bg-[var(--border)]" />
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="pt-20">
      <Hero />

      <Suspense fallback={<SectionSkeleton />}>
        <GraphSection />
      </Suspense>

      <ProofStrip />

      <Reveal>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
      </Reveal>

      <Reveal>
        <Suspense fallback={<SectionSkeleton />}>
          <FiveSystems />
        </Suspense>
      </Reveal>

      <Reveal>
        <Suspense fallback={<SectionSkeleton />}>
          <CaseStudiesPreview />
        </Suspense>
      </Reveal>

      <Reveal>
        <Process />
      </Reveal>

      <Reveal>
        <ToolsStrip />
      </Reveal>

      <Reveal>
        <Suspense fallback={<SectionSkeleton />}>
          <NotesPreview />
        </Suspense>
      </Reveal>

      <Reveal>
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>
      </Reveal>

      <StartHere />
    </main>
  )
}