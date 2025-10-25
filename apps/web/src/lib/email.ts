import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const data = await resend.emails.send({
      from: 'Gated Components <onboarding@gatedcomponents.com>',
      to: [to],
      subject: 'Welcome to Gated Component Library!',
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Thank you for joining Gated Component Library.</p>
        <p>You now have access to our collection of premium UI components.</p>
        <p>Get started by exploring our components: <a href="https://yourdomain.com/components">Browse Components</a></p>
      `,
    })
    return data
  } catch (error) {
    console.error('Error sending welcome email:', error)
    throw error
  }
}

export async function sendSubscriptionConfirmation(to: string, plan: string) {
  try {
    const data = await resend.emails.send({
      from: 'Gated Components <billing@gatedcomponents.com>',
      to: [to],
      subject: 'Subscription Confirmed',
      html: `
        <h1>Subscription Confirmed!</h1>
        <p>Your ${plan} subscription is now active.</p>
        <p>You now have access to all premium components.</p>
      `,
    })
    return data
  } catch (error) {
    console.error('Error sending subscription confirmation:', error)
    throw error
  }
}
