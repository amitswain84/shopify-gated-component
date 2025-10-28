export const dynamic = 'force-dynamic'

import { Calendar } from 'lucide-react'
import { prisma } from '@gated/database'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ChangelogEntry {
  date: string
  version: string
  title: string
  badges: string[]
  image?: string
  videoUrl?: string
  features: string[]
  bugFixes: string[]
}

async function getChangelog(): Promise<ChangelogEntry[]> {
  try {
    // Query DB directly for reliability (no host assumptions)
    // Prefer Prisma model; fall back to raw SQL if needed.
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

    const fmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    return (list || []).map((e: any) => ({
      date: e.date ? fmt.format(e.date instanceof Date ? e.date : new Date(e.date)) : '',
      version: e.version ?? '',
      title: e.title ?? '',
      badges: e.badges ?? [],
      image: e.image ?? undefined,
      videoUrl: e.videoUrl ?? undefined,
      features: e.features ?? [],
      bugFixes: e.bugFixes ?? [],
    }))
  } catch {
    // ignore
  }

  // Fallback
  return [
    {
      date: 'June 30, 2025',
      version: '2.1',
      title: 'Performance & UX',
      badges: ['Performance', 'UX'],
      videoUrl: '',
      features: [
        'Improved performance and stability',
        'UI refinements and accessibility tweaks',
      ],
      bugFixes: ['Minor bug fixes'],
    },
  ]
}

export default async function ChangelogPage() {
  const changelogData = await getChangelog()

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-12">
          {changelogData.length === 0 ? (
            <div className="text-sm text-muted-foreground">No changelog entries yet.</div>
          ) : changelogData.map((entry, index) => (
            <div key={index} className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{entry.date}</span>
                </div>
                <div className="h-px flex-1 bg-border" />
                <div className="px-3 py-1 rounded-md bg-muted text-sm font-medium">
                  {entry.version}
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">{entry.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {entry.badges?.map((badge, i) => (
                  <span key={i} className="text-xs font-normal px-2 py-0.5 rounded border text-gray-700 dark:text-gray-300">
                    {badge}
                  </span>
                ))}
              </div>

              {entry.image && (
                <div className="rounded-xl border overflow-hidden bg-muted mb-6">
                  <img src={entry.image} alt={entry.title} className="w-full h-auto" />
                </div>
              )}

              {entry.videoUrl && (
                <div className="rounded-xl border overflow-hidden bg-black mb-6">
                  <div className="relative aspect-video w-full bg-gray-900">
                    {(() => {
                      const url = entry.videoUrl || ''
                      const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')
                      if (isYouTube) {
                        // Normalize to embed URL
                        let videoId = ''
                        if (url.includes('youtu.be/')) {
                          videoId = url.split('youtu.be/')[1]?.split(/[?&]/)[0] || ''
                        } else {
                          const vParam = url.split('v=')[1]
                          videoId = vParam ? vParam.split('&')[0] : ''
                        }
                        const embed = `https://www.youtube.com/embed/${videoId}`
                        return (
                          <iframe
                            src={embed}
                            title={entry.title}
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        )
                      }
                      return (
                        <video className="absolute inset-0 w-full h-full" src={url} controls />
                      )
                    })()}
                  </div>
                </div>
              )}

              <Tabs defaultValue={entry.features && entry.features.length ? 'features' : 'bugs'} className="w-full">
                <TabsList>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="bugs">Bugs</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="mt-4">
                  {entry.features && entry.features.length ? (
                    <div className="space-y-3">
                      {entry.features.map((feature, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="text-gray-800 dark:text-gray-200 mt-1">•</span>
                          <span className="flex-1 text-base leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No features listed.</p>
                  )}
                </TabsContent>
                <TabsContent value="bugs" className="mt-4">
                  {entry.bugFixes && entry.bugFixes.length ? (
                    <div className="space-y-3">
                      {entry.bugFixes.map((bug, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="text-gray-800 dark:text-gray-200 mt-1">•</span>
                          <span className="flex-1 text-base leading-relaxed">{bug}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No bug fixes listed.</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
