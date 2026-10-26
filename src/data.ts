// All site copy lives here so content edits never touch component code.

export const profile = {
  name: 'Narciso Salvador',
  title: 'Frontend Software Engineer',
  tagline: 'I build UI for LLM and agentic AI products.',
  email: 'narcisodsalvador@gmail.com',
  resume: '/Narciso_Salvador_Resume.pdf',
  linkedin: 'https://www.linkedin.com/in/narciso-salvador/',
  github: 'https://github.com/narcisods',
}

export const about = [
  "I'm a frontend engineer at IBM, where I've spent 3.5 years building production UI for AI products, most recently watsonx Orchestrate, IBM's AI agent and automation platform.",
  'Before tech, I was Culinary Director of a Michelin-starred restaurant, where I learned to work under pressure and sweat the details. I bring the same care to software: clean, reliable, accessible interfaces.',
  "Outside of work I build side projects like CastLine, a surf fishing conditions app that combines my two passions: code and the outdoors. I'm open to frontend, full-stack, and AI product engineering roles in the Bay Area or remote.",
]

export type Highlight = { label: string; detail: string }

export const ibm = {
  role: 'Software Developer, IBM',
  dates: 'May 2023 – Present',
  summary:
    "Frontend developer for watsonx Orchestrate's document processing team, plus Watson NLU and Watson Discovery.",
  highlights: [
    {
      label: 'LLM model selector',
      detail:
        'Designed and built an API-driven model picker supporting 20+ LLMs across 3 components, with deprecation, pricing, and legal-notice warnings. Shipped to all watsonx Orchestrate users.',
    },
    {
      label: 'Onboarding redesign',
      detail:
        'Replaced a crowded first page with one guided action per step, cutting new-user drop-off from 40% to 5%.',
    },
    {
      label: 'Document lifecycle state machine',
      detail:
        'Made status transitions a single source of truth and blocked impossible states. No state-related bugs reported since launch.',
    },
    {
      label: 'Performance',
      detail:
        'Consolidated per-item tooltips to remove slowdowns on long extraction-field lists, and tuned TanStack Query caching to cut refetches and re-renders.',
    },
    {
      label: 'Beyond the UI',
      detail:
        'Release Manager, Iteration Manager for Watson NLU, Security Focal for Discovery tooling, on-call (12+ incidents), and helped migrate CI/CD for 12 repositories.',
    },
  ] satisfies Highlight[],
  stack: ['React', 'TypeScript', 'IBM Carbon', 'TanStack', 'Vitest', 'Playwright', 'Storybook'],
}

export type Project = {
  name: string
  subtitle: string
  description: string
  tech: string[]
  image: string
  imageAlt: string
  live?: string
  code: string
}

export const projects: Project[] = [
  {
    name: 'CastLine',
    subtitle: 'Surf fishing conditions app',
    description:
      'Helps anglers plan trips around real-time tide, wave, and wind data at their favorite beaches.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query', 'Node.js', 'Express'],
    image: '/castline.webp',
    imageAlt: 'CastLine dashboard showing a tide chart and a table of surf conditions',
    live: 'https://castline-frontend-phi.vercel.app/',
    code: 'https://github.com/narcisods/castline',
  },
  {
    name: 'Fish on!',
    subtitle: 'A social app for anglers',
    description:
      'A full-stack CRUD app where anglers share their catches and fishing adventures with other enthusiasts.',
    tech: ['React', 'Redux', 'React Router', 'Node.js', 'Express', 'Mongoose'],
    image: '/fishon.webp',
    imageAlt: 'Fish on! feed with catch posts, user profile, and crew list',
    code: 'https://github.com/narcisods/fish-on',
  },
]
