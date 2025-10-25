/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@gated/ui', '@gated/components', '@gated/database'],
}

module.exports = nextConfig
