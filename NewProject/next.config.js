/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/longevityanalytics',
  assetPrefix: '/longevityanalytics/',
}

module.exports = nextConfig
