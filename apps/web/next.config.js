const path = require('path')
try {
  require('dotenv').config()
  // Load from monorepo root if not found
  if (!process.env.DATABASE_URL) {
    require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
  }
} catch { }

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const baseConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['@gated/ui', '@gated/components', '@gated/database'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'www.untitledui.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'startup-template-sage.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'ui.aceternity.com',
      },
    ],
  },
}

module.exports = withMDX(baseConfig)
