'use client'

import { useState, useEffect } from 'react'
import { Copy, Edit, Plus, Trash2, Eye, EyeOff, RefreshCw, Calendar, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { AccessToken, supabase } from '@/lib/supabase'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface TokenManagerProps {
  profileId: string
  profileUsername: string
}

export function TokenManager({ profileId, profileUsername }: TokenManagerProps) {
  const [tokens, setTokens] = useState<AccessToken[]>([])
  const [loading, setLoading] = useState(true)
  const [showTokens, setShowTokens] = useState<{ [key: string]: boolean }>({})
  const [editingToken, setEditingToken] = useState<string | null>(null)
  const [newTokenValue, setNewTokenValue] = useState('')
  const [newTokenExpiry, setNewTokenExpiry] = useState('')

  useEffect(() => {
    loadTokens()
  }, [profileId])

  const loadTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('access_tokens')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTokens(data || [])
    } catch (error) {
      console.error('Erro ao carregar tokens:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (token: string) => {
    const fullUrl = `${window.location.origin}/perfil/${profileUsername}?token=${token}`
    try {
      await navigator.clipboard.writeText(fullUrl)
      alert('Link copiado para a área de transferência!')
    } catch (error) {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea')
      textArea.value = fullUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Link copiado para a área de transferência!')
    }
  }

  const toggleTokenVisibility = (tokenId: string) => {
    setShowTokens(prev => ({
      ...prev,
      [tokenId]: !prev[tokenId]
    }))
  }

  const startEditingToken = (token: AccessToken) => {
    setEditingToken(token.id)
    setNewTokenValue(token.token)
    setNewTokenExpiry(token.expires_at ? new Date(token.expires_at).toISOString().split('T')[0] : '')
  }

  const saveTokenEdit = async () => {
    if (!editingToken || !newTokenValue) return

    try {
      const updateData: any = {
        token: newTokenValue,
        updated_at: new Date().toISOString()
      }

      if (newTokenExpiry) {
        updateData.expires_at = new Date(newTokenExpiry + 'T23:59:59').toISOString()
      } else {
        updateData.expires_at = null
      }

      const { error } = await supabase
        .from('access_tokens')
        .update(updateData)
        .eq('id', editingToken)

      if (error) throw error

      alert('Token atualizado com sucesso!')
      setEditingToken(null)
      setNewTokenValue('')
      setNewTokenExpiry('')
      loadTokens()
    } catch (error) {
      console.error('Erro ao atualizar token:', error)
      alert('Erro ao atualizar token')
    }
  }

  const generateNewToken = async () => {
    const newToken = `${profileUsername}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30) // 30 dias

    try {
      const { error } = await supabase
        .from('access_tokens')
        .insert({
          profile_id: profileId,
          token: newToken,
          expires_at: expiryDate.toISOString(),
        })

      if (error) throw error

      alert('Novo token criado com sucesso!')
      loadTokens()
    } catch (error) {
      console.error('Erro ao criar token:', error)
      alert('Erro ao criar token')
    }
  }

  const deleteToken = async (tokenId: string) => {
    if (!confirm('Tem certeza que deseja excluir este token?')) return

    try {
      const { error } = await supabase
        .from('access_tokens')
        .update({ is_active: false })
        .eq('id', tokenId)

      if (error) throw error

      alert('Token desativado com sucesso!')
      loadTokens()
    } catch (error) {
      console.error('Erro ao desativar token:', error)
      alert('Erro ao desativar token')
    }
  }

  const isTokenExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false
    return new Date(expiresAt) < new Date()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tokens de Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Tokens de Acesso ({tokens.filter(t => t.is_active).length})
            </CardTitle>
            <CardDescription>
              Gerencie os tokens de acesso ao perfil
            </CardDescription>
          </div>
          <Button onClick={generateNewToken} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Token
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tokens.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum token encontrado</p>
          </div>
        ) : (
          tokens.map((token) => (
            <div key={token.id} className="border rounded-lg p-4 space-y-3">
              {/* Token Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={token.is_active ? "default" : "secondary"}>
                    {token.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                  {token.expires_at && isTokenExpired(token.expires_at) && (
                    <Badge variant="destructive">Expirado</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTokenVisibility(token.id)}
                  >
                    {showTokens[token.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(token.token)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditingToken(token)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteToken(token.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Token Value */}
              <div>
                <Label className="text-xs text-gray-500">Token</Label>
                <div className="font-mono text-sm bg-gray-50 p-2 rounded border">
                  {showTokens[token.id] ? token.token : '•'.repeat(token.token.length)}
                </div>
              </div>

              {/* Token Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-gray-500">Acessos</Label>
                  <p className="font-medium">{token.access_count}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Criado em</Label>
                  <p className="font-medium">{formatDate(token.created_at)}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Expira em</Label>
                  <p className="font-medium">
                    {token.expires_at ? formatDate(token.expires_at) : 'Nunca'}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Link Completo</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(token.token)}
                    className="h-6 text-xs"
                  >
                    Copiar Link
                  </Button>
                </div>
              </div>

              {/* Edit Form */}
              {editingToken === token.id && (
                <div className="border-t pt-4 space-y-3">
                  <div>
                    <Label htmlFor="edit-token">Editar Token</Label>
                    <Input
                      id="edit-token"
                      value={newTokenValue}
                      onChange={(e) => setNewTokenValue(e.target.value)}
                      placeholder="Token personalizado"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-expiry">Data de Expiração (opcional)</Label>
                    <Input
                      id="edit-expiry"
                      type="date"
                      value={newTokenExpiry}
                      onChange={(e) => setNewTokenExpiry(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveTokenEdit} size="sm">
                      Salvar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingToken(null)
                        setNewTokenValue('')
                        setNewTokenExpiry('')
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
