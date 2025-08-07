'use client'

import { useState } from 'react'
import { Plus, Check, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { supabase } from '@/lib/supabase'

interface SimpleMediaUploadProps {
  profileId: string
}

export function SimpleMediaUpload({ profileId }: SimpleMediaUploadProps) {
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [isRestricted, setIsRestricted] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  // Detectar tipo de mídia simples
  const detectType = (url: string): 'image' | 'video' => {
    const lower = url.toLowerCase()
    if (lower.includes('.mp4') || lower.includes('.webm') || lower.includes('.ogg') || lower.includes('video')) {
      return 'video'
    }
    return 'image'
  }

  const handleSubmit = async () => {
    if (!mediaUrl.trim()) {
      alert('Por favor, insira uma URL')
      return
    }

    setLoading(true)
    try {
      const mediaType = detectType(mediaUrl)
      
      // Construir dados do post - tentar inserir todas as colunas
      const postData: any = {
        profile_id: profileId,
        media_url: mediaUrl.trim(),
        media_type: mediaType,
        caption: caption.trim() || null,
        is_restricted: isRestricted,
        likes_count: likesCount,
      }

      const { error } = await supabase
        .from('posts')
        .insert(postData)

      if (error) {
        // Se der erro por coluna não existir, tentar sem as colunas extras
        if (error.message.includes('column') && error.message.includes('does not exist')) {
          const basicPostData = {
            profile_id: profileId,
            media_url: mediaUrl.trim(),
            media_type: mediaType,
            caption: caption.trim() || null,
          }
        
          const { error: basicError } = await supabase
            .from('posts')
            .insert(basicPostData)
          
          if (basicError) throw basicError
        } else {
          throw error
        }
      }

      alert('Post adicionado com sucesso!')
      
      // Limpar
      setCaption('')
      setMediaUrl('')
      setIsRestricted(false)
      setLikesCount(0)
      
      // Recarregar
      window.location.reload()
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao adicionar post: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-6 bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Plus className="w-4 h-4 text-orange-500" />
          </div>
          Adicionar Post
        </CardTitle>
        <CardDescription className="text-gray-600">
          Adicione uma imagem ou vídeo via URL
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="url" className="text-gray-700">URL da Mídia</Label>
          <Input
            id="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            disabled={loading}
            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <Label htmlFor="caption" className="text-gray-700">Legenda (opcional)</Label>
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Escreva uma legenda..."
            rows={2}
            disabled={loading}
            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="likes" className="text-gray-700">Número de Likes</Label>
            <Input
              id="likes"
              type="number"
              min="0"
              value={likesCount}
              onChange={(e) => setLikesCount(parseInt(e.target.value) || 0)}
              placeholder="0"
              disabled={loading}
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-700">Conteúdo Restrito</Label>
              <p className="text-xs text-gray-500">
                Marcar como conteúdo premium
              </p>
            </div>
            <Switch
              checked={isRestricted}
              onCheckedChange={setIsRestricted}
              disabled={loading}
            />
          </div>
        </div>

        {isRestricted && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-800">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Conteúdo Restrito</span>
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Este post será exibido com blur e botão de desbloqueio
            </p>
          </div>
        )}

        <Button 
          onClick={handleSubmit} 
          disabled={loading || !mediaUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Check className="w-4 h-4 mr-2" />
          )}
          {loading ? 'Adicionando...' : 'Adicionar Post'}
        </Button>

        {/* Preview simples */}
        {mediaUrl && (
          <div className="mt-4">
            <Label className="text-gray-700">Preview</Label>
            <div className="mt-2 p-2 border border-gray-200 rounded bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs text-gray-600">
                  Tipo: {detectType(mediaUrl) === 'image' ? 'Imagem' : 'Vídeo'}
                </p>
                {isRestricted && (
                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                    Restrito
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {likesCount} likes
                </span>
              </div>
              <p className="text-xs text-gray-500 break-all">
                {mediaUrl}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
