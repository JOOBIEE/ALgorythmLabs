import { FiLinkedin, FiGithub, FiFacebook, FiInstagram } from 'react-icons/fi'
import { TbBrandTiktok } from 'react-icons/tb'

interface SocialLink {
  label: string
  href: string
  icon: React.ComponentType<{ size?: number }>
}

// Swap these placeholder hrefs for your real profile URLs
const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/algorythmlabs', icon: FiLinkedin },
  { label: 'GitHub', href: 'https://github.com/algorythmlabs', icon: FiGithub },
  { label: 'Facebook', href: 'https://facebook.com/algorythmlabs', icon: FiFacebook },
  { label: 'Instagram', href: 'https://instagram.com/algorythmlabs', icon: FiInstagram },
  { label: 'TikTok', href: 'https://tiktok.com/@algorythmlabs', icon: TbBrandTiktok },
]

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ label, href, icon: Icon }) => (
        
       <a   key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  )
}