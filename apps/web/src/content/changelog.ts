export type ChangelogEntry = {
  date: string
  version: string
  title: string
  badges: string[]
  image?: string
  videoUrl?: string
  features: string[]
  bugFixes: string[]
}

export const changelogEntries: ChangelogEntry[] = [
  {
    date: '2025-06-30',
    version: '2.1',
    title: 'Performance & UX refresh',
    badges: ['Performance', 'UX'],
    image: '/thumbnails/placeholder.svg',
    videoUrl: '',
    features: [
      'Optimized Tailwind build and reduced bundle size',
      'Refined sidebar header alignment and breadcrumbs',
      'New Components page filters: All, Free, Pro',
    ],
    bugFixes: ['Fixed env loading for Prisma', 'Resolved cookie modal state issues'],
  },
  {
    date: '2025-06-15',
    version: '2.0',
    title: 'Major release with local content collections',
    badges: ['Release'],
    image: '/thumbnails/avatar.svg',
    videoUrl: '',
    features: ['Components sourced from content collections', 'Component detail page revamp'],
    bugFixes: ['Various UI polish across pages'],
  },
  {
    date: '2025-06-01',
    version: '1.9.5',
    title: 'Quality of life improvements',
    badges: ['UI', 'DX'],
    image: '/thumbnails/placeholder.svg',
    videoUrl: '',
    features: ['Improved docs styling', 'Faster local dev builds'],
    bugFixes: ['Fixed breadcrumb truncation on mobile'],
  },
]
