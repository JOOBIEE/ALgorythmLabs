import type { Metadata } from 'next'
import Script from 'next/script'
import { getInitialThemeScript } from '@/lib/theme'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CommandPalette from '@/components/ui/CommandPalette'
import { getAllCaseStudies, getAllInsights } from '@/lib/sanity/queries'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor from '@/components/ui/CustomCursor'
import './globals.css'

const siteUrl = 'https://algorythmlabs.co' // swap for your real domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Algorythm Labs — Systems for Growing Brands',
    template: '%s — Algorythm Labs',
  },
  description:
    'Deploying operational architectures designed for scale. No theory. No bloat. Pure execution.',
  openGraph: {
    type: 'website',
    siteName: 'Algorythm Labs',
    title: 'Algorythm Labs — Systems for Growing Brands',
    description:
      'Deploying operational architectures designed for scale. No theory. No bloat. Pure execution.',
    url: siteUrl,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Algorythm Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Algorythm Labs — Systems for Growing Brands',
    description:
      'Deploying operational architectures designed for scale. No theory. No bloat. Pure execution.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [caseStudies, notes] = await Promise.all([
    getAllCaseStudies(),
    getAllInsights(),
  ])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: getInitialThemeScript() }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Algorythm Labs',
              url: siteUrl,
              logo: `${siteUrl}/logo-dark.png`,
              description:
                'Brand and digital systems agency building the infrastructure growing businesses are missing.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lagos',
                addressCountry: 'NG',
              },
            }),
          }}
        />
      </head>
     <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased">
  <ScrollProgress />
  <CustomCursor />
  <Navbar />
  {children}
  <Footer />
  <CommandPalette caseStudies={caseStudies} notes={notes} />
</body>
    </html>
  )
}