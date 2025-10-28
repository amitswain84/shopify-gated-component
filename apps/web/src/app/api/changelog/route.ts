import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Try Prisma client first; fallback to raw SQL if model isn't generated
    const client: any = prisma as any

    let list: any[] = []
    if (client?.changelogEntry?.findMany) {
      list = await client.changelogEntry.findMany({
        where: { isActive: true },
        orderBy: [{ order: 'asc' }, { date: 'desc' }, { createdAt: 'desc' }],
      })
    } else {
      list = await prisma.$queryRaw<any[]>`SELECT id::text as id, date, version, title, badges, image, "videoUrl", features, "bugFixes", "isActive", "order" FROM "ChangelogEntry" WHERE COALESCE("isActive", true) = true ORDER BY COALESCE("order", 0) ASC, COALESCE(date, now()) DESC`
    }

    if (!Array.isArray(list) || list.length < 3) {
      // Ensure we have at least 3 entries
      const seedData = [
        {
          date: new Date('2025-06-30'),
          version: '2.1',
          title: 'Performance & UX refresh',
          badges: ['Performance', 'UX'],
          image: '/thumbnails/placeholder.svg',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          features: [
            'Optimized Tailwind build and reduced bundle size',
            'Refined sidebar header alignment and breadcrumbs',
            'New Components page filters: All, Free, Pro',
          ],
          bugFixes: ['Fixed env loading for Prisma', 'Resolved cookie modal state issues'],
          order: 1,
          isActive: true,
        },
        {
          date: new Date('2025-06-15'),
          version: '2.0',
          title: 'Major release with DB-backed components',
          badges: ['Release'],
          image: '/thumbnails/avatar.svg',
          videoUrl: '',
          features: ['Components sourced from Supabase DB', 'Component detail page revamp'],
          bugFixes: ['Various UI polish across pages'],
          order: 2,
          isActive: true,
        },
        {
          date: new Date('2025-06-01'),
          version: '1.9.5',
          title: 'Quality of life improvements',
          badges: ['UI', 'DX'],
          image: '/thumbnails/placeholder.svg',
          videoUrl: '',
          features: ['Improved docs styling', 'Faster local dev builds'],
          bugFixes: ['Fixed breadcrumb truncation on mobile'],
          order: 3,
          isActive: true,
        },
      ]

      if (client?.changelogEntry?.createMany) {
        await client.changelogEntry.createMany({ data: seedData })
        list = await client.changelogEntry.findMany({
          where: { isActive: true },
          orderBy: [{ order: 'asc' }, { date: 'desc' }, { createdAt: 'desc' }],
        })
      } else {
        await prisma.$executeRawUnsafe(`
          INSERT INTO "ChangelogEntry" (date, version, title, badges, image, "videoUrl", features, "bugFixes", "order", "isActive") VALUES
          ('2025-06-30', '2.1', 'Performance & UX refresh', ARRAY['Performance','UX'], '/thumbnails/placeholder.svg', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', ARRAY['Optimized Tailwind build and reduced bundle size','Refined sidebar header alignment and breadcrumbs','New Components page filters: All, Free, Pro'], ARRAY['Fixed env loading for Prisma','Resolved cookie modal state issues'], 1, true),
          ('2025-06-15', '2.0', 'Major release with DB-backed components', ARRAY['Release'], '/thumbnails/avatar.svg', '', ARRAY['Components sourced from Supabase DB','Component detail page revamp'], ARRAY['Various UI polish across pages'], 2, true),
          ('2025-06-01', '1.9.5', 'Quality of life improvements', ARRAY['UI','DX'], '/thumbnails/placeholder.svg', '', ARRAY['Improved docs styling','Faster local dev builds'], ARRAY['Fixed breadcrumb truncation on mobile'], 3, true)
          ON CONFLICT DO NOTHING;`)
        list = await prisma.$queryRaw<any[]>`SELECT id::text as id, date, version, title, badges, image, "videoUrl", features, "bugFixes", "isActive", "order" FROM "ChangelogEntry" WHERE COALESCE("isActive", true) = true ORDER BY COALESCE("order", 0) ASC, COALESCE(date, now()) DESC`
      }
    }

    const normalized = list.map((e: any) => ({
      id: e.id,
      date: (e.date instanceof Date ? e.date : new Date(e.date ?? Date.now())).toISOString(),
      version: e.version,
      title: e.title,
      badges: e.badges ?? [],
      image: e.image ?? null,
      videoUrl: e.videoUrl ?? null,
      features: e.features ?? [],
      bugFixes: e.bugFixes ?? [],
      isActive: e.isActive,
      order: e.order,
    }))

    return NextResponse.json({ entries: normalized }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    const entries = [
      {
        date: '2025-06-30T00:00:00.000Z',
        version: '2.1',
        title: 'Release 2.1 - Improvements',
        badges: ['Performance', 'UX'],
        videoUrl: '',
        features: [
          'Improved performance and stability',
          'UI refinements and accessibility tweaks',
        ],
        bugFixes: ['Minor bug fixes'],
      },
    ]
    return NextResponse.json({ entries }, { headers: { 'Cache-Control': 'no-store' } })
  }
}
