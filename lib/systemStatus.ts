import { client } from './sanity/client'

export interface SystemStatus {
  latencyMs: number
  cmsConnected: boolean
  counts: {
    systems: number
    caseStudies: number
    notes: number
    testimonials: number
    graphNodes: number
  }
}

export async function getSystemStatus(): Promise<SystemStatus> {
  const start = performance.now()
  let cmsConnected = true
  let counts = {
    systems: 0,
    caseStudies: 0,
    notes: 0,
    testimonials: 0,
    graphNodes: 0,
  }

  try {
    // Deliberately using the raw client here, not the cached sanityFetch
    // helper — the whole point of this page is a live, uncached reading.
    counts = await client.fetch(`{
      "systems": count(*[_type == "system"]),
      "caseStudies": count(*[_type == "caseStudy"]),
      "notes": count(*[_type == "insight"]),
      "testimonials": count(*[_type == "testimonial"]),
      "graphNodes": count(*[_type == "graphNode"])
    }`)
  } catch {
    cmsConnected = false
  }

  const latencyMs = Math.round(performance.now() - start)

  return { latencyMs, cmsConnected, counts }
}