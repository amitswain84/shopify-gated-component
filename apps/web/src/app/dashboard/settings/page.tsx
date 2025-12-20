import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PlanInfoClient } from './PlanInfoClient'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, User } from 'lucide-react'

export default async function SettingsPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="w-full max-w-4xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Subscription & Billing */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Subscription & Billing</CardTitle>
              <CardDescription className="text-sm">Manage your subscription plan and billing information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PlanInfoClient />
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Account Settings</CardTitle>
              <CardDescription className="text-sm">Update your personal information and security settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border bg-muted/50">
            <div className="space-y-1">
              <p className="font-medium text-sm sm:text-base">Profile & Security</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Manage your account details, email, and password</p>
            </div>
            <Link 
              href="/dashboard/profile" 
              className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors text-center shrink-0"
            >
              Manage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
