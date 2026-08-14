'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as
      | 'dark'
      | 'light'
      | null
    if (current) setTheme(current)

    // keep in sync if the toggle changes theme without a full reload
    const observer = new MutationObserver(() => {
      const updated = document.documentElement.getAttribute('data-theme') as
        | 'dark'
        | 'light'
        | null
      if (updated) setTheme(updated)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Algorythm Labs — Home">
      <Image
        src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
        alt="Algorythm Labs"
        width={28}
        height={24}
        priority
      />
      <span className="font-semibold tracking-tight">ALGORYTHM LABS</span>
    </Link>
  )
}