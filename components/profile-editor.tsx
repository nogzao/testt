'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, User, Image, Settings, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Profile, supabase } from '@/lib/supabase'
import { SimpleMediaUpload } from '@/components/simple-media-upload'
import { PostManager } from '@/components/post-manager'

interface ProfileEditorProps {
  profile: Profile
}

export function ProfileEditor({ profile }: ProfileEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    display_name: profile.display_name,
    bio: profile.bio || '',
    description: (profile as any).description || '',
    profile_image_url: (profile as any).profile_image_url || '',
    banner_image_url: (profile as any).banner_image_url || '',
    followers_count: profile.followers_count,
    show_comments: (profile as any).show_comments || false,
    restricted_content_text: (profile as any).restricted_content_text || 'Desbloquear conteúdo restrito',
    restricted_content_link: (profile as any).restricted_content_link || '',
    button_text: (profile as any).button_text || 'Seguir',
    button_link: (profile as any).button_link || '',
  })

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      // Primeiro, vamos verificar quais colunas existem
      const { data: columns } = await supabase
        .from('information_schema.columns')
        .select('column_name')
        .eq('table_name', 'profiles')

      const existingColumns = columns?.map(col => col.column_name) || []
      
      // Construir objeto de update apenas com colunas que existem
      const updateData: any = {
        display_name: formData.display_name,
        bio: formData.bio,
        followers_count: formData.followers_count,
        updated_at: new Date().toISOString(),
      }

      // Adicionar colunas opcionais apenas se existirem
      if (existingColumns.includes('description')) {
        updateData.description = formData.description
      }
      if (existingColumns.includes('profile_image_url')) {
        updateData.profile_image_url = formData.profile_image_url || null
      }
      if (existingColumns.includes('banner_image_url')) {
        updateData.banner_image_url = formData.banner_image_url || null
      }
      if (existingColumns.includes('button_text')) {
        updateData.button_text = formData.button_text
      }
      if (existingColumns.includes('button_link')) {
        updateData.button_link = formData.button_link || null
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', profile.id)

      if (error) throw error

      alert('Perfil atualizado com sucesso!')
      router.refresh()
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar perfil: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      // Verificar quais colunas de configuração existem
      const { data: columns } = await supabase
        .from('information_schema.columns')
        .select('column_name')
        .eq('table_name', 'profiles')

      const existingColumns = columns?.map(col => col.column_name) || []
      
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      // Adicionar configurações apenas se as colunas existirem
      if (existingColumns.includes('show_comments')) {
        updateData.show_comments = formData.show_comments
      }
      if (existingColumns.includes('restricted_content_text')) {
        updateData.restricted_content_text = formData.restricted_content_text
      }
      if (existingColumns.includes('restricted_content_link')) {
        updateData.restricted_content_link = formData.restricted_content_link || null
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', profile.id)

      if (error) throw error

      alert('Configurações salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      alert('Erro ao salvar configurações: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="border-gray-300 text-gray-600 hover:bg-gray-50">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="profile" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Perfil</TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Mídia</TabsTrigger>
          <TabsTrigger value="posts" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Posts</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Configurações</TabsTrigger>
        </TabsList>

        {/* Aba Perfil */}
        <TabsContent value="profile">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-500" />
                </div>
                Informações do Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="display_name" className="text-gray-700">Nome de Exibição</Label>
                  <Input
                    id="display_name"
                    value={formData.display_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <Label htmlFor="followers_count" className="text-gray-700">Seguidores</Label>
                  <Input
                    id="followers_count"
                    type="number"
                    value={formData.followers_count}
                    onChange={(e) => setFormData(prev => ({ ...prev, followers_count: parseInt(e.target.value) || 0 }))}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <Label htmlFor="button_text" className="text-gray-700">Texto do Botão</Label>
                  <Input
                    id="button_text"
                    value={formData.button_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                    placeholder="Seguir"
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <Label htmlFor="button_link" className="text-gray-700">Link do Botão</Label>
                  <Input
                    id="button_link"
                    value={formData.button_link}
                    onChange={(e) => setFormData(prev => ({ ...prev, button_link: e.target.value }))}
                    placeholder="https://exemplo.com/seguir"
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Link para onde o usuário será direcionado ao clicar no botão
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="bio" className="text-gray-700">Bio (Breve)</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Bio curta que aparece no cabeçalho..."
                  rows={2}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-700">Descrição Completa</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição mais detalhada do perfil..."
                  rows={4}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <Label htmlFor="profile_image" className="text-gray-700">URL da Foto de Perfil</Label>
                <Input
                  id="profile_image"
                  value={formData.profile_image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, profile_image_url: e.target.value }))}
                  placeholder="https://exemplo.com/foto-perfil.jpg"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
                {formData.profile_image_url && (
                  <div className="mt-2">
                    <img
                      src={formData.profile_image_url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg"
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="banner_image" className="text-gray-700">URL do Banner</Label>
                <Input
                  id="banner_image"
                  value={formData.banner_image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, banner_image_url: e.target.value }))}
                  placeholder="https://exemplo.com/banner.jpg"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
                {formData.banner_image_url && (
                  <div className="mt-2">
                    <img
                      src={formData.banner_image_url || "/placeholder.svg"}
                      alt="Preview Banner"
                      className="w-full h-32 object-cover rounded border-2 border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg"
                      }}
                    />
                  </div>
                )}
              </div>

              <Button onClick={handleSaveProfile} disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Salvando...' : 'Salvar Perfil'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Mídia */}
        <TabsContent value="media">
          <SimpleMediaUpload profileId={profile.id} />
        </TabsContent>

        {/* Aba Posts */}
        <TabsContent value="posts">
          <PostManager profileId={profile.id} />
        </TabsContent>

        {/* Aba Configurações */}
        <TabsContent value="settings">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-4 h-4 text-orange-500" />
                </div>
                Configurações do Perfil
              </CardTitle>
              <CardDescription className="text-gray-600">
                Configure como o perfil se comporta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Comentários */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-700">Mostrar Comentários</Label>
                  <p className="text-sm text-gray-500">
                    Permitir que usuários vejam a opção de comentários nos posts
                  </p>
                </div>
                <Switch
                  checked={formData.show_comments}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, show_comments: checked }))
                  }
                />
              </div>

              {/* Conteúdo Restrito */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Conteúdo Restrito</h3>
                
                <div>
                  <Label htmlFor="restricted_text" className="text-gray-700">Texto do Botão de Desbloqueio</Label>
                  <Input
                    id="restricted_text"
                    value={formData.restricted_content_text}
                    onChange={(e) => 
                      setFormData(prev => ({ ...prev, restricted_content_text: e.target.value }))
                    }
                    placeholder="Desbloquear conteúdo restrito"
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <Label htmlFor="restricted_link" className="text-gray-700">Link do Botão de Desbloqueio</Label>
                  <Input
                    id="restricted_link"
                    value={formData.restricted_content_link}
                    onChange={(e) => 
                      setFormData(prev => ({ ...prev, restricted_content_link: e.target.value }))
                    }
                    placeholder="https://exemplo.com/premium"
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Link para onde o usuário será direcionado ao clicar no botão
                  </p>
                </div>
              </div>

              <Button onClick={handleSaveSettings} disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
