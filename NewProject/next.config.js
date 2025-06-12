/** @type {import('next').NextConfig} */

// Configuración condicional para desarrollo local vs GitHub Pages
const isGithubPages = process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS;

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Solo aplicar basePath y assetPrefix en GitHub Pages
  ...(isGithubPages && {
    basePath: '/longevityanalytics',
    assetPrefix: '/longevityanalytics/',
  })
}

module.exports = nextConfig
