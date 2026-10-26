import { about } from '../data'
import { Section } from './ui'

export default function About() {
  return (
    <Section id="about" title="About" className="bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        {about.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
