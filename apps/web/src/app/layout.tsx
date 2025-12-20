import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Gated Component Library - Premium React & Tailwind Components',
    template: '%s | Gated Components'
  },
  description: 'Access 850+ premium React components and Shopify checklists. Built with Tailwind CSS and shadcn/ui. Start with 20 free components. Perfect for developers and agencies.',
  keywords: ['React components', 'Tailwind CSS', 'shadcn/ui', 'UI components', 'component library', 'Shopify development', 'web development', 'frontend components', 'React UI library', 'premium components'],
  authors: [{ name: 'Gated Components' }],
  creator: 'Gated Components',
  publisher: 'Gated Components',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Gated Component Library',
    title: 'Gated Component Library - Premium React & Tailwind Components',
    description: 'Access 850+ premium React components and Shopify checklists. Built with Tailwind CSS and shadcn/ui.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gated Component Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gated Component Library - Premium React & Tailwind Components',
    description: 'Access 850+ premium React components and Shopify checklists. Built with Tailwind CSS and shadcn/ui.',
    images: ['/og-image.png'],
    creator: '@gatedcomponents',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="canonical" href="https://your-domain.com" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="theme-color" content="#000000" />
        </head>
        <body className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable} font-sans`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
