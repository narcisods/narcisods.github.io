import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
      © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Vite, and Tailwind CSS.
    </footer>
  )
}
