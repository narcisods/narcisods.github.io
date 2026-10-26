import type { ReactNode } from 'react'

// Shared building blocks so every section and button looks and behaves the same.

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:focus-visible:outline-teal-300'

export function Section({
  id,
  title,
  children,
  className = '',
}: {
  id: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`px-4 py-20 sm:px-6 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  external?: boolean
  download?: boolean
}

export function ButtonLink({ href, children, variant = 'primary', external, download }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-teal-700 text-white hover:bg-teal-800 dark:bg-teal-300 dark:text-neutral-950 dark:hover:bg-teal-200'
      : 'border border-neutral-300 text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800'
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${styles} ${focusRing}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {children}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
      {children}
    </li>
  )
}

export { focusRing }
