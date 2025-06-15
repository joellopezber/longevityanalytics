/** @type {import('next').NextConfig} */

const nextConfig = {
  // Configuración para deployment dinámico (Vercel, Netlify, etc.)
  // No usar output: 'export' porque tenemos rutas API dinámicas
  trailingSlash: false,
  images: {
    unoptimized: false
  }
}

module.exports = nextConfig
