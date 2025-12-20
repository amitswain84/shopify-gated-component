"use client"

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  RotateCcw,
  Package,
  ShoppingCart,
  Settings,
  Palette,
  Truck,
  TrendingUp,
  Zap,
  Shield,
  Lock,
  BarChart,
  X,
  LucideIcon,
  Check
} from 'lucide-react'
import { useUserPlan } from '@/hooks/use-user-plan'
import { useMediaQuery } from '@/hooks/use-media-query'

interface ChecklistItem {
  id: string
  title: string
  description: string
  icon: string
  isPro: boolean
  detailContent: string
}

const iconMap: Record<string, LucideIcon> = {
  Package,
  ShoppingCart,
  Settings,
  Palette,
  Truck,
  TrendingUp,
  Zap,
  Shield,
  Lock,
  BarChart,
}

export default function ChecklistClient({ initialItems }: { initialItems: ChecklistItem[] }) {
  const { user } = useUser()
  const { plan } = useUserPlan()
  const [activeTab, setActiveTab] = useState<'free' | 'pro'>(() => {
    const hasFree = initialItems.some(i => !i.isPro)
    return hasFree ? 'free' : 'pro'
  })
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(initialItems)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const { isMobile } = useMediaQuery()

  const freeItems = checklistItems.filter(item => !item.isPro)
  const proItems = checklistItems.filter(item => item.isPro)

  const fetchChecklistItems = useCallback(async () => {
    try {
      const response = await fetch('/api/checklist/items', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        const items: ChecklistItem[] = data?.items || []
        setChecklistItems(items)
        const hasFree = items.some(i => !i.isPro)
        const hasPro = items.some(i => i.isPro)
        setActiveTab(prev => {
          if (prev === 'free' && !hasFree && hasPro) return 'pro'
          if (prev === 'pro' && !hasPro && hasFree) return 'free'
          return prev
        })
      }
    } catch { }
  }, [])

  useEffect(() => {
    fetchChecklistItems()
  }, [fetchChecklistItems])

  const fetchProgress = useCallback(async () => {
    try {
      const response = await fetch('/api/checklist/progress', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        setCompletedItems(new Set(data.completed))
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetchProgress()
    } else {
      setLoading(false)
    }
  }, [user, fetchProgress])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user) {
        fetchProgress()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [user, fetchProgress])

  const handleCheckboxChange = async (itemId: string, checked: boolean) => {
    const newCompleted = new Set(completedItems)
    if (checked) newCompleted.add(itemId)
    else newCompleted.delete(itemId)
    setCompletedItems(newCompleted)

    try {
      await fetch('/api/checklist/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checklistId: itemId, completed: checked }),
      })
    } catch {
      setCompletedItems(completedItems)
    }
  }

  const handleReset = async () => {
    setCompletedItems(new Set())
    setShowResetDialog(false)
    try {
      await fetch('/api/checklist/progress', { method: 'DELETE' })
    } catch { }
  }

  const handleProItemClick = () => {
    if (plan === 'FREE') {
      window.dispatchEvent(new CustomEvent('openPricingDialog'))
    }
  }

  return (
    <>
      <div className="min-h-screen p-4 sm:p-6">
        <div className="w-full">
          <div className="flex items-center gap-3 mb-4 justify-between sm:justify-end">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'free' | 'pro')} className="min-w-0">
              <TabsList>
                <TabsTrigger value="free" className="gap-2">
                  Free
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                    {freeItems.filter(item => completedItems.has(item.id)).length}/{freeItems.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pro" className="gap-2">
                  Pro
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                    {proItems.filter(item => completedItems.has(item.id)).length}/{proItems.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" onClick={() => setShowResetDialog(true)} className="shrink-0 sm:ml-3">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'free' | 'pro')} className="w-full">
            <TabsContent value="free" className="mt-0">
              {freeItems.length === 0 ? (
                <div className="text-sm text-muted-foreground py-6 text-center">No free checklist items yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {freeItems.map((item) => (
                    <ChecklistCard
                      key={item.id}
                      item={item}
                      completed={completedItems.has(item.id)}
                      onCheckChange={(checked) => handleCheckboxChange(item.id, checked)}
                      onClick={() => setSelectedItem(item)}
                      disabled={loading}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pro" className="mt-0">
              {proItems.length === 0 ? (
                <div className="text-sm text-muted-foreground py-6 text-center">No pro checklist items yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {proItems.map((item) => (
                    <ChecklistCard
                      key={item.id}
                      item={item}
                      completed={completedItems.has(item.id)}
                      onCheckChange={(checked) => handleCheckboxChange(item.id, checked)}
                      onClick={() => plan === 'FREE' ? handleProItemClick() : setSelectedItem(item)}
                      disabled={loading || plan === 'FREE'}
                      locked={plan === 'FREE'}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="sm:max-w-lg w-[calc(100vw-2rem)] mx-auto rounded-xl p-4 sm:p-6">
          <button aria-label="Close" onClick={() => setShowResetDialog(false)} className="absolute right-3 top-3 sm:hidden inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Progress?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset all your checklist progress? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-end">
            <div className="grid grid-cols-2 gap-3 w-full">
              <AlertDialogCancel className="w-full h-10">Cancel</AlertDialogCancel>
              <AlertDialogAction className="w-full h-10" onClick={handleReset}>Reset</AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isMobile ? (
        <Drawer open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DrawerContent className="h-[70vh] sm:h-auto">
            {selectedItem && (
              <>
                <DrawerHeader>
                  <DrawerTitle className="truncate max-w-[80vw]">{selectedItem.title}</DrawerTitle>
                  <DrawerDescription className="truncate max-w-[80vw]">{selectedItem.description}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-8 overflow-y-auto max-h-[calc(70vh-100px)]">
                  <div className="space-y-4">
                    {selectedItem.isPro && plan === 'FREE' ? (
                      <p className="text-sm text-muted-foreground">This is a Pro checklist item. Upgrade to view details.</p>
                    ) : selectedItem.detailContent && selectedItem.detailContent.trim().length > 0 ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: selectedItem.detailContent.replace(/\n/g, '<br />') }} />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No detailed information available for this item.</p>
                    )}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={completedItems.has(selectedItem.id)}
                        onCheckedChange={(checked) => handleCheckboxChange(selectedItem.id, checked as boolean)}
                      />
                      <span className="text-sm">{completedItems.has(selectedItem.id) ? 'Completed' : 'Mark as complete'}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-2xl sm:p-0 overflow-hidden border-0 shadow-2xl">
            {selectedItem && (
              <div className="flex flex-col h-[85vh] sm:h-auto sm:max-h-[85vh]">
                {/* Header with improved styling */}
                <div className="px-6 pt-6 pb-4 border-b bg-muted/10">
                  <div className="flex items-start gap-4 pr-6">
                    <div className={`
                      flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-sm
                      ${completedItems.has(selectedItem.id) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground'}
                    `}>
                      {iconMap[selectedItem.icon] ? (
                        (() => {
                          const IconCmp = iconMap[selectedItem.icon];
                          return <IconCmp className="h-6 w-6" />;
                        })()
                      ) : <Package className="h-6 w-6" />}
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-bold leading-tight">{selectedItem.title}</DialogTitle>
                      <DialogDescription className="mt-1 text-base text-muted-foreground">{selectedItem.description}</DialogDescription>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  {selectedItem.isPro && plan === 'FREE' ? (
                    <div className="rounded-xl border border-border/50 bg-muted/30 p-8 text-center">
                      <Lock className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
                      <h3 className="font-semibold text-foreground">Pro Content</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">Upgrade to Pro to access this detailed guide.</p>
                      <Button onClick={() => window.dispatchEvent(new CustomEvent('openPricingDialog'))}>
                        Upgrade Now
                      </Button>
                    </div>
                  ) : selectedItem.detailContent && selectedItem.detailContent.trim().length > 0 ? (
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground leading-relaxed break-words whitespace-normal overflow-x-hidden">
                      <div dangerouslySetInnerHTML={{ __html: selectedItem.detailContent.replace(/\n/g, '<br />') }} />
                    </div>
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                      <p>No detailed description available for this step.</p>
                      <p className="text-xs mt-1">Check back later for updates.</p>
                    </div>
                  )}
                </div>

                {/* Footer with Prominent Action */}
                <div className="p-6 border-t bg-muted/10 mt-auto shrink-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs text-muted-foreground font-medium hidden sm:block">
                      {completedItems.has(selectedItem.id) ? 'Step completed' : 'Mark this step as done'}
                    </div>
                    <Button
                      size="lg"
                      variant={completedItems.has(selectedItem.id) ? "default" : "outline"}
                      className={`
                           w-full sm:w-auto min-w-[200px] transition-all
                           ${completedItems.has(selectedItem.id)
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                          : 'bg-background hover:bg-muted border-2 hover:border-primary/20'}
                        `}
                      onClick={() => handleCheckboxChange(selectedItem.id, !completedItems.has(selectedItem.id))}
                    >
                      {completedItems.has(selectedItem.id) ? (
                        <>
                          <Check className="mr-2 h-5 w-5" />
                          Completed
                        </>
                      ) : (
                        <>
                          Mark as Complete
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

interface ChecklistCardProps {
  item: ChecklistItem
  completed: boolean
  onCheckChange: (checked: boolean) => void
  onClick: () => void
  disabled?: boolean
  locked?: boolean
}

function ChecklistCard({ item, completed, onCheckChange, onClick, disabled, locked }: ChecklistCardProps) {
  // Get icon component from icon map
  const Icon = iconMap[item.icon] || Package

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`relative border rounded-lg p-3 transition-all cursor-pointer hover:shadow-sm flex items-center gap-3 ${completed
        ? 'bg-primary text-primary-foreground border-primary'
        : 'bg-card text-card-foreground border-border hover:border-primary/50'
        }`}
      onClick={onClick}
    >
      {/* Left side: Icon with background */}
      <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${completed
        ? 'bg-primary-foreground/10'
        : item.isPro
          ? 'bg-primary/10'
          : 'bg-muted'
        }`}>
        <Icon className={`w-5 h-5 ${completed
          ? 'text-primary-foreground'
          : item.isPro
            ? 'text-primary'
            : 'text-muted-foreground'
          }`} />
      </div>

      {/* Middle: Title and Description */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-sm leading-tight mb-0.5 truncate ${completed ? 'text-white dark:text-black' : ''
          }`}>{item.title}</h3>

        <p className={`text-xs leading-snug line-clamp-1 ${completed ? 'text-white/70 dark:text-black/60' : 'text-muted-foreground'
          }`}>
          {item.description}
        </p>
      </div>

      {/* Right side: Checkbox */}
      <div className="flex-shrink-0" onClick={handleCheckboxClick}>
        <Checkbox
          checked={completed}
          onCheckedChange={onCheckChange}
          disabled={disabled || locked}
          className={completed ? 'border-primary dark:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground' : ''}
        />
      </div>

      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-[2px] bg-background/70 backdrop-blur-[2px] rounded-md flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
            <span className="text-[10px] text-muted-foreground font-medium">Upgrade to Pro</span>
          </div>
        </div>
      )}
    </div>
  )
}
