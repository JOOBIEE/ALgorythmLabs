import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import SocialLinks from '@/components/ui/SocialLinks'

const navigation = [
  { label: 'Systems', href: '/#systems' },
  { label: 'Process', href: '/#process' },
  { label: 'Case Studies', href: '/case-studies' },
]
const company = [
  { label: 'About', href: '/#about' },
  { label: 'Notes', href: '/notes' },
  { label: 'Contact', href: '/#start-here' },
]
const connect = [
  { label: 'Node_Status', href: '/status' },
]


export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Logo />
            <p className="mt-2 max-w-xs text-sm text-[var(--muted)]">
              Global logistics for digital infrastructure. Eliminating
              ambiguity through binary precision.
            </p>
            <div className="mt-5">
    <SocialLinks />
  </div>
          </div>

          <div className="grid grid-cols-2 gap-10 font-mono text-xs uppercase sm:grid-cols-3">
            <div>
              <p className="text-[var(--muted)]">Navigation</p>
              <ul className="mt-3 space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:opacity-70">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[var(--muted)]">Company</p>
              <ul className="mt-3 space-y-2">
                {company.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:opacity-70">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-[var(--border)] pt-6 font-mono text-xs text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Algorythm Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}