import { profile } from '../data'
import { ButtonLink, Section } from './ui'

export default function Contact() {
  return (
    <Section id="contact" title="Get in touch">
      <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
        I'm open to frontend, full-stack, and AI product engineering roles. Email me about opportunities,
        questions, or just to say hi.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`mailto:${profile.email}`}>{profile.email}</ButtonLink>
        <ButtonLink href={profile.linkedin} variant="secondary" external>
          LinkedIn
        </ButtonLink>
      </div>
    </Section>
  )
}
