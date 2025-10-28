import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Ensure at least 3 demo rows exist
    const count = (await prisma.$queryRaw<any[]>`SELECT id FROM "ChangelogEntry"`).length
    if (count < 3) {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "ChangelogEntry" (date, version, title, badges, image, "videoUrl", features, "bugFixes", "order", "isActive") VALUES
        ('2025-06-30', '2.1', 'Performance & UX refresh', ARRAY['Performance','UX'], '/thumbnails/placeholder.svg', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', ARRAY['Optimized Tailwind build and reduced bundle size','Refined sidebar header alignment and breadcrumbs','New Components page filters: All, Free, Pro'], ARRAY['Fixed env loading for Prisma','Resolved cookie modal state issues'], 1, true),
        ('2025-06-15', '2.0', 'Major release with DB-backed components', ARRAY['Release'], '/thumbnails/avatar.svg', '', ARRAY['Components sourced from Supabase DB','Component detail page revamp'], ARRAY['Various UI polish across pages'], 2, true),
        ('2025-06-01', '1.9.5', 'Quality of life improvements', ARRAY['UI','DX'], '/thumbnails/placeholder.svg', '', ARRAY['Improved docs styling','Faster local dev builds'], ARRAY['Fixed breadcrumb truncation on mobile'], 3, true)
        ON CONFLICT DO NOTHING;`)
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'seed-failed' }, { status: 500 })
  }
}