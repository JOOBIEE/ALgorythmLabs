import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
})

// Every query in this project should go through this helper instead of
// calling client.fetch directly — it applies Next.js's fetch cache with
// a 60s revalidation window, matching the `revalidate = 60` set on our
// pages. Without this, every Sanity call round-trips live on every
// request, which was a big contributor to the low Performance score.
export function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  })
}