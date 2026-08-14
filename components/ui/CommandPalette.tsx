'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'

interface SearchItem {
  label: string
  href: string
  group: string
}

interface Props {
  caseStudies: { title: string; slug: { current: string } }[]
  notes: { title: string; slug: { current: string } }[]
}

const staticPages: SearchItem[] = [
  { label: 'Home', href: '/', group: 'Pages' },
  { label: 'Systems', href: '/#systems', group: 'Pages' },
  { label: 'About', href: '/#about', group: 'Pages' },
  { label: 'Testimonials', href: '/#testimonials', group: 'Pages' },
  { label: 'Case Studies', href: '/case-studies', group: 'Pages' },
  { label: 'Notes', href: '/notes', group: 'Pages' },
  { label: 'System Status', href: '/status', group: 'Pages' },
  { label: "Tell us where you're stuck", href: '/#start-here', group: 'Pages' },
]

export default function CommandPalette({ caseStudies, notes }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    function handleExternalOpen() {
      setOpen(true)
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleExternalOpen)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleExternalOpen)
    }
  }, [])

  const goTo = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-24"
      onClick={() => setOpen(false)}
    >
      <Command
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg border border-[var(--border)] bg-[var(--bg)] font-mono shadow-2xl"
        label="Site command palette"
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <span className="text-[var(--muted)]">&gt;</span>
          <Command.Input
            autoFocus
            placeholder="Search systems, case studies, notes..."
            className="w-full bg-transparent text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)]"
          />
          <kbd className="shrink-0 border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-[var(--muted)]">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Pages"
            className="px-2 py-1 text-[10px] uppercase tracking-wide text-[var(--muted)] [&_[cmdk-group-items]]:mt-1"
          >
            {staticPages.map((item) => (
              <Command.Item
                key={item.href}
                value={item.label}
                onSelect={() => goTo(item.href)}
                className="cursor-pointer px-3 py-2 text-sm text-[var(--fg)] aria-selected:bg-[var(--border)]"
              >
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>

          {caseStudies.length > 0 && (
            <Command.Group
              heading="Case Studies"
              className="mt-2 px-2 py-1 text-[10px] uppercase tracking-wide text-[var(--muted)] [&_[cmdk-group-items]]:mt-1"
            >
              {caseStudies.map((cs) => (
                <Command.Item
                  key={cs.slug.current}
                  value={cs.title}
                  onSelect={() => goTo(`/case-studies/${cs.slug.current}`)}
                  className="cursor-pointer px-3 py-2 text-sm text-[var(--fg)] aria-selected:bg-[var(--border)]"
                >
                  {cs.title}
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {notes.length > 0 && (
            <Command.Group
              heading="Notes"
              className="mt-2 px-2 py-1 text-[10px] uppercase tracking-wide text-[var(--muted)] [&_[cmdk-group-items]]:mt-1"
            >
              {notes.map((note) => (
                <Command.Item
                  key={note.slug.current}
                  value={note.title}
                  onSelect={() => goTo(`/notes/${note.slug.current}`)}
                  className="cursor-pointer px-3 py-2 text-sm text-[var(--fg)] aria-selected:bg-[var(--border)]"
                >
                  {note.title}
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
      </Command>
    </div>
  )
}