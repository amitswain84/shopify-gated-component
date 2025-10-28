'use client'

import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const COOKIE_CONSENT_KEY = 'cookie-consent'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setShowBanner(true)
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ necessary: true, analytics: true, marketing: true }))
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ necessary: true, analytics: false, marketing: false }))
    setShowBanner(false)
  }

  const handleSave = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ necessary: true, analytics, marketing }))
    setShowSettings(false)
    setShowBanner(false)
  }

  if (!showBanner) return null

  // Mobile drawer
  if (isMobile) {
    return (
      <Sheet open={showBanner} onOpenChange={setShowBanner}>
        <SheetContent side="bottom" className="pb-safe">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5" />
              Cookie Preferences
            </SheetTitle>
            <SheetDescription className="text-left">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 mt-6">
            <Button onClick={handleAccept} className="w-full">
              Accept All
            </Button>
            <Button onClick={handleReject} variant="outline" className="w-full">
              Reject
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop banner (bottom left, matching screenshot)
  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-xl animate-in slide-in-from-bottom-5 duration-500">
      <div className="rounded-2xl border bg-card text-card-foreground shadow-xl">
        <div className="p-6">
          <h3 className="font-semibold text-2xl mb-3">Cookie Preferences</h3>
          <p className="text-base text-muted-foreground mb-6">
            We use cookies to enhance your experience. Choose your preferences below. Read about our privacy policy <a className="underline" href="/privacy">here</a>.
          </p>
          <div className="flex items-center gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowSettings(true)}>
              Settings
            </Button>
            <Button variant="outline" onClick={handleReject}>
              Reject
            </Button>
            <Button onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSettings(false)} />
          <div className="relative bg-card text-card-foreground rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-semibold">Cookie Settings</h4>
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border bg-muted p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">Necessary Cookies</div>
                  <div className="text-sm text-muted-foreground">Required for the website to function. Cannot be disabled.</div>
                </div>
                <div className="h-6 w-11 rounded-full bg-foreground/80 opacity-50" />
              </div>

              <div className="rounded-xl border p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">Analytics Cookies</div>
                  <div className="text-sm text-muted-foreground">Help us improve by collecting anonymous usage data.</div>
                </div>
                <button onClick={() => setAnalytics(!analytics)} className={`h-6 w-11 rounded-full ${analytics ? 'bg-foreground' : 'bg-muted-foreground/30'}`}>
                  <span className={`block h-5 w-5 bg-background rounded-full translate-x-1 transition-transform ${analytics ? 'translate-x-5' : ''}`} />
                </button>
              </div>

              <div className="rounded-xl border p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">Marketing Cookies</div>
                  <div className="text-sm text-muted-foreground">Used to show you relevant ads across websites.</div>
                </div>
                <button onClick={() => setMarketing(!marketing)} className={`h-6 w-11 rounded-full ${marketing ? 'bg-foreground' : 'bg-muted-foreground/30'}`}>
                  <span className={`block h-5 w-5 bg-background rounded-full translate-x-1 transition-transform ${marketing ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={() => setShowSettings(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Preferences</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
