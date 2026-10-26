import { profile } from '../data'
import { ButtonLink } from './ui'

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
            {profile.title}
          </p>
          <h1 id="hero-title" className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I'm {profile.name}.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-neutral-600 dark:text-neutral-300">
            {profile.tagline} 3.5 years at IBM on watsonx Orchestrate. Former Culinary Director of a
            Michelin-starred restaurant.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={profile.resume} download>
              Download resume
            </ButtonLink>
            <ButtonLink href={profile.linkedin} variant="secondary" external>
              LinkedIn
            </ButtonLink>
            <ButtonLink href={profile.github} variant="secondary" external>
              GitHub
            </ButtonLink>
          </div>
        </div>
        <img
          src="/headshot.webp"
          alt="Portrait of Narciso Salvador"
          width={640}
          height={960}
          className="mx-auto w-48 rounded-2xl object-cover shadow-lg sm:w-64"
          fetchPriority="high"
        />
      </div>
    </section>
  )
}
