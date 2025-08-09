/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de imagem
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'commondatastorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Configurações de pacotes externos (corrigido para Next.js 15)
  serverExternalPackages: ['@supabase/supabase-js'],

  // Configurações de build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Configurações de runtime
  poweredByHeader: false,
  compress: true,

  // Configurações experimentais para Next.js 15
  experimental: {
    // Remover configurações que podem causar problemas
  },

  // Configurações de redirecionamento
  async redirects() {
    return [
      {
        source: '/perfil/:username',
        has: [
          {
            type: 'query',
            key: 'token',
            value: undefined,
          },
        ],
        destination: '/',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
