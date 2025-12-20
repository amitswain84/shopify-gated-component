"use client"

import { Calendar } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ChangelogEntry } from '@/content/changelog'

export function ChangelogContent({ entries }: { entries: ChangelogEntry[] }) {
  const fmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="space-y-8">
        {entries.length === 0 ? (
          <div className="text-sm text-muted-foreground">No changelog entries yet.</div>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{fmt.format(new Date(entry.date))}</span>
                </div>
                <div className="h-px flex-1 bg-border" />
                <div className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium">{entry.version}</div>
              </div>

              <h2 className="text-lg font-bold mb-3">{entry.title}</h2>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {entry.badges?.map((badge, i) => (
                  <span key={i} className="text-[10px] font-normal px-1.5 py-0.5 rounded border text-foreground/80">
                    {badge}
                  </span>
                ))}
              </div>

              {entry.image && (
                <div className="rounded-lg border overflow-hidden bg-muted mb-4">
                  <img src={entry.image} alt={entry.title} className="w-full h-auto" />
                </div>
              )}

              {entry.videoUrl && (
                <div className="rounded-lg border overflow-hidden bg-black mb-4">
                  <div className="relative aspect-video w-full bg-gray-900">
                    <video className="absolute inset-0 w-full h-full" src={entry.videoUrl} controls />
                  </div>
                </div>
              )}

              <Tabs defaultValue={entry.features && entry.features.length ? 'features' : 'bugs'} className="w-full">
                <TabsList className="h-9">
                  <TabsTrigger value="features" className="text-xs">Features</TabsTrigger>
                  <TabsTrigger value="bugs" className="text-xs">Bugs</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="mt-3">
                  {entry.features && entry.features.length ? (
                    <div className="space-y-2">
                      {entry.features.map((feature, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-foreground mt-0.5 text-sm">•</span>
                          <span className="flex-1 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No features listed.</p>
                  )}
                </TabsContent>
                <TabsContent value="bugs" className="mt-3">
                  {entry.bugFixes && entry.bugFixes.length ? (
                    <div className="space-y-2">
                      {entry.bugFixes.map((bug, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-foreground mt-0.5 text-sm">•</span>
                          <span className="flex-1 text-sm leading-relaxed">{bug}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No bug fixes listed.</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
