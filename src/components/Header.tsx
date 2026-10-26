import { profile } from '../data'
import { focusRing } from './ui'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <nav aria-label="Main" className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className={`rounded font-bold tracking-tight ${focusRing}`}>
          {profile.name}
        </a>
        {/* Section links hide on very small screens; the page is short enough to scroll. */}
        <ul className="hidden gap-6 text-sm font-medium sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded text-neutral-600 hover:text-teal-700 dark:text-neutral-300 dark:hover:text-teal-300 ${focusRing}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resume}
            className={`rounded-lg bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-800 dark:bg-teal-300 dark:text-neutral-950 dark:hover:bg-teal-200 ${focusRing}`}
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  )
}
