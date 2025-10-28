import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ''

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        )
      }
      
      // Resubscribe
      await prisma.newsletter.update({
        where: { email },
        data: { subscribed: true },
      })
    } else {
      // New subscription
      await prisma.newsletter.create({
        data: { email },
      })
    }

    // Add to Resend audience
    if (!AUDIENCE_ID) {
      console.error('⚠️ RESEND_AUDIENCE_ID not set in environment variables!')
      console.error('Please add RESEND_AUDIENCE_ID to your .env.local file')
      console.error('Email saved to database but NOT added to Resend audience')
    } else {
      try {
        console.log('📧 Adding contact to Resend audience:', email)
        console.log('Using Audience ID:', AUDIENCE_ID)
        
        const result = await resend.contacts.create({
          email: email,
          audienceId: AUDIENCE_ID,
        })
        
        console.log('✅ Successfully added to Resend audience!')
        console.log('Contact ID:', result.data?.id)
      } catch (audienceError: any) {
        console.error('❌ Resend audience error details:')
        console.error('Message:', audienceError?.message)
        console.error('Status Code:', audienceError?.statusCode)
        console.error('Full error:', JSON.stringify(audienceError, null, 2))
        
        // Check for common error types
        const errorMsg = audienceError?.message?.toLowerCase() || ''
        if (errorMsg.includes('already exists') || errorMsg.includes('contact_already_exists')) {
          console.log('ℹ️ Contact already exists in Resend audience - this is OK')
        } else if (errorMsg.includes('invalid') || errorMsg.includes('not found')) {
          console.error('⚠️ Invalid Audience ID or API Key - check your environment variables!')
        } else {
          console.error('⚠️ Unexpected error adding to Resend audience')
        }
        
        // Don't fail the whole request - subscription still successful in database
      }
    }

    // Send welcome email via Resend
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Gated Components <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to Gated Components Newsletter',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Welcome!</h1>
              </div>
              
              <div style="background: #f7f7f7; padding: 30px; border-radius: 10px;">
                <h2 style="color: #333; margin-top: 0;">Thank you for subscribing!</h2>
                <p style="font-size: 16px; line-height: 1.8;">You're now part of the Gated Components community. Here's what you can expect:</p>
                
                <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px;">
                  <li>🎨 New component releases and updates</li>
                  <li>💡 Tips and best practices</li>
                  <li>📚 Tutorials and guides</li>
                  <li>🎁 Exclusive content and early access</li>
                </ul>
                
                <p style="font-size: 16px; line-height: 1.8; margin-top: 30px;">
                  Get started by exploring our <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/components" style="color: #667eea; text-decoration: none; font-weight: 600;">component library</a>.
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #666; font-size: 14px;">Best regards,<br><strong>The Gated Components Team</strong></p>
                <p style="color: #999; font-size: 12px; margin-top: 20px;">
                  You're receiving this because you subscribed to our newsletter.
                </p>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Continue even if email fails - subscription is still successful
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
