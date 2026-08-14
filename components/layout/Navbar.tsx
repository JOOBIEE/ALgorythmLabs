'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navLinks = [
  { href: '/#systems', label: 'Systems' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/notes', label: 'Notes' },
  { href: '/#about', label: 'About' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll while the mobile menu is open, and always show
  // a solid navbar background while it's open (even at the very top
  // of the page) so the menu never floats over transparent hero content.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  function handleLinkClick() {
    setIsMenuOpen(false)
  }

  const showSolidBg = isScrolled || isMenuOpen

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        showSolidBg
          ? 'border-[var(--border)] bg-[var(--bg)]'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Logo />

        <ul className="hidden items-center gap-6 font-mono text-xs uppercase md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:opacity-70">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/#start-here"
            className="hidden border border-[var(--border)] px-4 py-2 font-mono text-xs uppercase sm:inline-block"
          >
            Tell us where you're stuck
          </Link>
          <button
  type="button"
  onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
  className="hidden items-center gap-2 border border-[var(--border)] px-3 py-2 font-mono text-xs text-[var(--muted)] md:flex"
  aria-label="Open search"
>
  <span>Search</span>
  <kbd className="border border-[var(--border)] px-1 text-[10px]">⌘K</kbd>
</button>
          <ThemeToggle />

          

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="flex h-11 w-11 items-center justify-center border border-[var(--border)] md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] md:hidden">
          <ul className="flex flex-col divide-y divide-[var(--border)] font-mono text-sm uppercase">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-6 py-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 py-5">
            <Link
              href="/#start-here"
              onClick={handleLinkClick}
              className="block border border-[var(--fg)] px-4 py-3 text-center font-mono text-xs uppercase"
            >
              Tell us where you're stuck
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}