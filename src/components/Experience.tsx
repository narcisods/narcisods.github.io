import { ibm } from '../data'
import { Section, Tag } from './ui'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <article>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-semibold">{ibm.role}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{ibm.dates}</p>
        </div>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">{ibm.summary}</p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {ibm.highlights.map((h) => (
            <li
              key={h.label}
              className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
            >
              <h4 className="font-semibold text-teal-700 dark:text-teal-300">{h.label}</h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{h.detail}</p>
            </li>
          ))}
        </ul>

        <ul aria-label="Tech used at IBM" className="mt-6 flex flex-wrap gap-2">
          {ibm.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
      </article>
    </Section>
  )
}
