'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'

export function CreateProfileForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    display_name: '',
    bio: '',
    followers_count: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.username || !formData.display_name) {
      alert('Username e nome de exibição são obrigatórios')
      return
    }

    setLoading(true)
    try {
      // Verificar se o username já existe
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', formData.username)
        .single()

      if (existingProfile) {
        alert('Este username já está em uso')
        setLoading(false)
        return
      }

      // Criar o perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          username: formData.username,
          display_name: formData.display_name,
          bio: formData.bio || null,
          followers_count: formData.followers_count,
        })
        .select()
        .single()

      if (profileError) throw profileError

      // Criar token de acesso padrão
      const defaultToken = `${formData.username}_access_${Date.now()}`
      const { error: tokenError } = await supabase
        .from('access_tokens')
        .insert({
          profile_id: profile.id,
          token: defaultToken,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
        })

      if (tokenError) throw tokenError

      alert(`Perfil criado com sucesso!\nToken de acesso: ${defaultToken}`)
      router.push('/admin')
    } catch (error) {
      console.error('Erro ao criar perfil:', error)
      alert('Erro ao criar perfil')
    } finally {
      setLoading(false)
    }
  }

  const generateUsername = () => {
    const name = formData.display_name.toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
    
    setFormData(prev => ({ ...prev, username: name }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Admin
        </Button>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informações do Perfil
          </CardTitle>
          <CardDescription>
            Preencha os dados básicos do novo perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="display_name">Nome de Exibição *</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                  placeholder="Ex: Bella Santos"
                  required
                />
              </div>

              <div>
                <Label htmlFor="username">Username *</Label>
                <div className="flex gap-2">
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value.toLowerCase() }))}
                    placeholder="Ex: bella_santos"
                    pattern="[a-z0-9_]+"
                    title="Apenas letras minúsculas, números e underscore"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateUsername}
                    disabled={!formData.display_name}
                  >
                    Gerar
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Apenas letras minúsculas, números e underscore
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Descrição do perfil..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="followers_count">Número de Seguidores</Label>
              <Input
                id="followers_count"
                type="number"
                min="0"
                value={formData.followers_count}
                onChange={(e) => setFormData(prev => ({ ...prev, followers_count: parseInt(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Criando...' : 'Criar Perfil'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push('/admin')}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Após criar o perfil:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Um token de acesso será gerado automaticamente</li>
                <li>• O token terá validade de 30 dias</li>
                <li>• Você poderá adicionar conteúdo na página de edição</li>
                <li>• O link de acesso será: /perfil/[username]?token=[token]</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
