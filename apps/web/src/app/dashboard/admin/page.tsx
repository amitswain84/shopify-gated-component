'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Loader2 } from 'lucide-react'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const grantProAccess = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/grant-pro', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        setResult('✅ PRO access granted! Refresh the page to see changes.')
      } else {
        setResult(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setResult('❌ Failed to grant PRO access')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Testing</h1>
        <p className="text-muted-foreground">
          Tools for testing payment and subscription features
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grant PRO Access</CardTitle>
          <CardDescription>
            Manually grant PRO subscription to the current user for testing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={grantProAccess}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? 'Processing...' : 'Grant PRO Access Now'}
          </Button>

          {result && (
            <div className={`p-4 rounded-lg bg-muted text-foreground`}>
              {result}
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>After granting access:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Refresh the page or navigate around</li>
              <li>Check dashboard - should show &quot;PRO&quot; plan</li>
              <li>Try accessing PRO components - should be unlocked</li>
              <li>Check PRO checklist items - should be accessible</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Status</CardTitle>
          <CardDescription>
            Check your subscription status in the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>To check database:</strong></p>
            <code className="block bg-muted p-2 rounded">
              cd packages/database && pnpm db:studio
            </code>
            <p className="text-muted-foreground mt-2">
              Then check the Subscription table for your user
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
