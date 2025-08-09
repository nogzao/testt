import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, ImageIcon, Plus, Settings, Key, Eye, Calendar, AlertTriangle } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'

export default async function AdminDashboard() {
  try {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Variáveis de ambiente do Supabase não configuradas')
    }

    // Buscar estatísticas com timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout na consulta ao banco')), 10000)
    )

    const profilesPromise = supabase
      .from('profiles')
      .select(`
        id, 
        username, 
        display_name, 
        followers_count, 
        created_at,
        access_tokens (
          id,
          token,
          is_active,
          access_count,
          expires_at
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    const { data: profiles, error: profilesError } = await Promise.race([
      profilesPromise,
      timeoutPromise
    ]) as any

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
      throw new Error(`Erro ao buscar perfis: ${profilesError.message}`)
    }

    // Buscar contadores com fallback
    let totalPosts = 0
    let totalTokens = 0
    let totalAccess = 0

    try {
      const { count: postsCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
      totalPosts = postsCount || 0

      const { count: tokensCount } = await supabase
        .from('access_tokens')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
      totalTokens = tokensCount || 0

      const { data: tokenStats } = await supabase
        .from('access_tokens')
        .select('access_count')
        .eq('is_active', true)
      totalAccess = tokenStats?.reduce((sum, token) => sum + token.access_count, 0) || 0
    } catch (statsError) {
      console.warn('Error fetching stats:', statsError)
      // Continuar com valores padrão
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header com Logo */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <SiteLogo size="md" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Gerencie perfis e conteúdo da plataforma</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Perfis Ativos</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{profiles?.length || 0}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Posts</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{totalPosts}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Tokens Ativos</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Key className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{totalTokens}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Acessos</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{totalAccess}</div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="mb-8">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/admin/create" className="gap-2">
                <Plus className="w-4 h-4" />
                Criar Novo Perfil
              </Link>
            </Button>
          </div>

          {/* Profiles List */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Perfis</CardTitle>
              <CardDescription className="text-gray-600">
                Lista de todos os perfis cadastrados na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profiles && profiles.length > 0 ? (
                <div className="space-y-4">
                  {profiles.map((profile) => {
                    const activeTokens = profile.access_tokens?.filter(t => t.is_active) || []
                    const profileAccess = activeTokens.reduce((sum, token) => sum + token.access_count, 0)
                    const hasExpiredTokens = activeTokens.some(token => 
                      token.expires_at && new Date(token.expires_at) < new Date()
                    )

                    return (
                      <div key={profile.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900">{profile.display_name}</h3>
                            <Badge variant="outline" className="border-gray-300 text-gray-600">@{profile.username}</Badge>
                            {hasExpiredTokens && (
                              <Badge variant="destructive" className="text-xs bg-red-100 text-red-600 border-red-200">
                                <Calendar className="w-3 h-3 mr-1" />
                                Token Expirado
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{profile.followers_count.toLocaleString()} seguidores</span>
                            <span>{activeTokens.length} tokens ativos</span>
                            <span>{profileAccess} acessos totais</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild className="border-orange-200 text-orange-600 hover:bg-orange-50">
                            <Link href={`/admin/${profile.username}`}>
                              <Settings className="w-4 h-4 mr-1" />
                              Gerenciar
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild className="border-gray-300 text-gray-600 hover:bg-gray-50">
                            <Link href={`/perfil/${profile.username}?token=${activeTokens[0]?.token || 'no-token'}`}>
                              <Eye className="w-4 h-4 mr-1" />
                              Visualizar
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum perfil cadastrado ainda</p>
                  <Button asChild className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                    <Link href="/admin/create">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Perfil
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in AdminDashboard:', error)
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header com Logo */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <SiteLogo size="md" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
          <Card className="max-w-md bg-white border-gray-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900">Erro no Dashboard</h2>
              <p className="text-gray-600 mb-4">
                {error instanceof Error ? error.message : 'Ocorreu um erro ao carregar o dashboard.'}
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/">Voltar ao Início</Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Tentar Novamente
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}
