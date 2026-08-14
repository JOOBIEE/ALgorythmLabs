import { sanityFetch } from './client'

// ---------- Types ----------

export interface System {
  _id: string
  name: string
  slug: { current: string }
  index: number
  shortDescription: string
  expandedContent?: any[]
}

export interface CaseStudyListItem {
  _id: string
  title: string
  slug: { current: string }
  homepageSummary?: string
  reportId?: string
  order?: number
}

export interface CaseStudyDetail extends CaseStudyListItem {
  timestamp?: string
  systemApplied?: string
  relatedSystem?: { name: string; slug: { current: string } }
  initialPerception?: {
    heading?: string
    body?: string
    figureImage?: any
    figureLabel?: string
  }
  intervention?: {
    appliedLogicLabel?: string
    bulletPoints?: string[]
    figureImage?: any
    figureLabel?: string
  }
  result?: {
    metrics?: { label: string; value: string }[]
    quote?: string
    quoteAuthorName?: string
    quoteAuthorTitle?: string
    quoteAuthorPhoto?: any
  }
  seoDescription?: string
}

export interface Testimonial {
  _id: string
  quote: string
  authorName: string
  authorTitle?: string
  authorPhoto?: any
  relatedCaseStudy?: { slug: { current: string } }
}

export interface InsightListItem {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  readTime: number
  systemTag: { name: string; slug: { current: string } }
}

export interface InsightDetail extends InsightListItem {
  body: any[]
  relatedEssays: InsightListItem[]
  seoDescription?: string
}

export interface GraphNode {
  _id: string
  label: string
  nodeType: 'core' | 'system' | 'team'
  group: 'home' | 'about'
  bio?: string
  relatedSystem?: { name: string; slug: { current: string }; shortDescription?: string }
  connections?: { _id: string }[]
  position?: { x: number; y: number }
}

// ---------- Systems ----------

export async function getAllSystems(): Promise<System[]> {
  return sanityFetch<System[]>(
    `*[_type == "system"] | order(index asc) {
      _id, name, slug, index, shortDescription, expandedContent
    }`
  )
}

// ---------- Case Studies ----------

export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudyListItem[]> {
  return sanityFetch<CaseStudyListItem[]>(
    `*[_type == "caseStudy"] | order(order asc, timestamp desc) [0...$limit] {
      _id, title, slug, homepageSummary, reportId, order
    }`,
    { limit }
  )
}

export async function getAllCaseStudies(): Promise<CaseStudyListItem[]> {
  return sanityFetch<CaseStudyListItem[]>(
    `*[_type == "caseStudy"] | order(order asc, timestamp desc) {
      _id, title, slug, homepageSummary, reportId, order
    }`
  )
}

export async function getCaseStudySlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(
    `*[_type == "caseStudy"]{ "slug": slug.current }`
  )
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  return sanityFetch<CaseStudyDetail | null>(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id, title, slug, homepageSummary, reportId, timestamp, systemApplied, seoDescription,
      relatedSystem->{ name, slug },
      initialPerception, intervention, result
    }`,
    { slug }
  )
}

// ---------- Testimonials ----------

export async function getTestimonials(): Promise<Testimonial[]> {
  return sanityFetch<Testimonial[]>(
    `*[_type == "testimonial"] | order(order asc) {
      _id, quote, authorName, authorTitle, authorPhoto,
      relatedCaseStudy->{ slug }
    }`
  )
}

// ---------- Notes (Sanity type: "insight") ----------

export async function getAllInsights(): Promise<InsightListItem[]> {
  return sanityFetch<InsightListItem[]>(
    `*[_type == "insight"] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, readTime,
      systemTag->{ name, slug }
    }`
  )
}

export async function getFeaturedInsights(limit = 3): Promise<InsightListItem[]> {
  return sanityFetch<InsightListItem[]>(
    `*[_type == "insight"] | order(featuredOnHome desc, publishedAt desc) [0...$limit] {
      _id, title, slug, excerpt, publishedAt, readTime,
      systemTag->{ name, slug }
    }`,
    { limit }
  )
}

export async function getInsightsBySystem(systemSlug: string): Promise<InsightListItem[]> {
  return sanityFetch<InsightListItem[]>(
    `*[_type == "insight" && systemTag->slug.current == $systemSlug] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, readTime,
      systemTag->{ name, slug }
    }`,
    { systemSlug }
  )
}

export async function getInsightSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(
    `*[_type == "insight"]{ "slug": slug.current }`
  )
}

export async function getInsightBySlug(slug: string): Promise<InsightDetail | null> {
  return sanityFetch<InsightDetail | null>(
    `*[_type == "insight" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt, readTime, body, seoDescription,
      systemTag->{ name, slug },
      relatedEssays[]->{
        _id, title, slug, excerpt, publishedAt, readTime,
        systemTag->{ name, slug }
      }
    }`,
    { slug }
  )
}

// ---------- Graph Nodes ----------

export async function getGraphNodes(group: 'home' | 'about'): Promise<GraphNode[]> {
  return sanityFetch<GraphNode[]>(
    `*[_type == "graphNode" && group == $group] {
      _id, label, nodeType, group, bio, position,
      relatedSystem->{ name, slug, shortDescription },
      connections[]->{ _id }
    }`,
    { group }
  )
}

export interface ProofStats {
  provenCount: number
  inProgressCount: number
  soldBeforeTestedCount: number
}

export async function getProofStats(): Promise<ProofStats | null> {
  return sanityFetch<ProofStats | null>(
    `*[_type == "proofStats"][0] {
      provenCount, inProgressCount, soldBeforeTestedCount
    }`
  )
}