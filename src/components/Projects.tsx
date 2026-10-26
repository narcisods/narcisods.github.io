import { projects } from '../data'
import { ButtonLink, Section, Tag } from './ui'

export default function Projects() {
  return (
    <Section id="projects" title="Projects" className="bg-neutral-50 dark:bg-neutral-900">
      <ul className="space-y-12">
        {projects.map((p) => (
          <li key={p.name}>
            <article className="grid items-center gap-8 md:grid-cols-2">
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                className="w-full rounded-xl border border-neutral-200 shadow-sm dark:border-neutral-800"
              />
              <div>
                <h3 className="text-2xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-teal-700 dark:text-teal-300">{p.subtitle}</p>
                <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-300">{p.description}</p>
                <ul aria-label={`Tech used in ${p.name}`} className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {p.live && (
                    <ButtonLink href={p.live} external>
                      Live site
                    </ButtonLink>
                  )}
                  <ButtonLink href={p.code} variant="secondary" external>
                    View code
                  </ButtonLink>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
