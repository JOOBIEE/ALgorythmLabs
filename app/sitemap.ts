import type { MetadataRoute } from 'next'
import { getCaseStudySlugs, getInsightSlugs } from '@/lib/sanity/queries'

const siteUrl = 'https://algorythmlabs.co' // match layout.tsx

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudySlugs, noteSlugs] = await Promise.all([
    getCaseStudySlugs(),
    getInsightSlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudySlugs.map((item) => ({
    url: `${siteUrl}/case-studies/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const noteRoutes: MetadataRoute.Sitemap = noteSlugs.map((item) => ({
    url: `${siteUrl}/notes/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...caseStudyRoutes, ...noteRoutes]
}