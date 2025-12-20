"use client"

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { changelogEntries } from '@/content/changelog'
import { ChangelogContent } from '@/components/changelog-content'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ChangelogDialog() {
  const { isMobile } = useMediaQuery()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener('openChangelogDialog', handleOpen)
    return () => window.removeEventListener('openChangelogDialog', handleOpen)
  }, [])

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[90vh] rounded-t-[20px]">
          <DrawerHeader className="border-b px-4 py-3 flex flex-row items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">Changelog</DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerHeader>
          <div className="overflow-y-auto flex-1">
            <ChangelogContent entries={changelogEntries} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-0">
        <ChangelogContent entries={changelogEntries} />
      </DialogContent>
    </Dialog>
  )
}
