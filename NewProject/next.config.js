/** @type {import('next').NextConfig} */

// Configuración condicional para desarrollo local vs GitHub Pages
const isGithubPages = process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS;
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Solo usar export estático para GitHub Pages, no para desarrollo
  ...(isGithubPages && {
  output: 'export',
  }),
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
