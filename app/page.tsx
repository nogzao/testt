import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Users, ImageIcon, Shield } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header com Logo */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <SiteLogo size="md" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Plataforma de Perfis Privados
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plataforma de perfis privados com conteúdo exclusivo. 
            Acesso controlado por token para máxima privacidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/admin">
                Dashboard Admin
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-orange-500 text-orange-500 hover:bg-orange-50">
              <Link href="/perfil/bella_model?token=premium_access_2024">
                Ver Perfil Demo
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-orange-500" />
              </div>
              <CardTitle className="text-gray-900">Acesso Privado</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Controle total sobre quem acessa o conteúdo através de tokens únicos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-orange-500" />
              </div>
              <CardTitle className="text-gray-900">Feed Vertical</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Interface otimizada para visualização de fotos e vídeos em formato vertical
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <CardTitle className="text-gray-900">Perfis Personalizados</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Cada perfil com banner, foto, bio e contador de seguidores personalizado
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <CardTitle className="text-gray-900">Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Tokens com expiração e controle de acesso para máxima segurança
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experimente as Demos
          </h2>
          <p className="text-gray-600 mb-8">
            Veja como funcionam os perfis privados com nossos exemplos
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white">
                    B
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Bella Santos</h3>
                    <p className="text-sm text-gray-600">@bella_model</p>
                    <p className="text-xs text-gray-500">15.420 seguidores</p>
                  </div>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <Link href="/perfil/bella_model?token=premium_access_2024">
                      Acessar Perfil
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white">
                    B
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Badmi Style</h3>
                    <p className="text-sm text-gray-600">@badmi</p>
                    <p className="text-xs text-gray-500">8.750 seguidores</p>
                  </div>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <Link href="/perfil/badmi?token=badmi_premium_2024">
                      Acessar Perfil
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white">
                    B
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Badmii Creative</h3>
                    <p className="text-sm text-gray-600">@badmii</p>
                    <p className="text-xs text-gray-500">12.350 seguidores</p>
                  </div>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <Link href="/perfil/badmii?token=badmii_premium_access_2024">
                      Acessar Perfil
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Adicionar metadata para SEO e compartilhamento
export const metadata = {
  title: 'Privacy - Plataforma de Perfis Privados',
  description: 'Plataforma de perfis privados com conteúdo exclusivo. Acesso controlado por token para máxima privacidade.',
  keywords: 'perfis privados, conteúdo exclusivo, tokens de acesso, privacidade',
  authors: [{ name: 'Privacy Platform' }],
  creator: 'Privacy Platform',
  publisher: 'Privacy Platform',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Privacy - Plataforma de Perfis Privados',
    description: 'Plataforma de perfis privados com conteúdo exclusivo.',
    siteName: 'Privacy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy - Plataforma de Perfis Privados',
    description: 'Plataforma de perfis privados com conteúdo exclusivo.',
  },
}
