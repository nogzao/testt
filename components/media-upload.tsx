'use client'

import { useState } from 'react'
import { LinkIcon, Check, AlertCircle, Cloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { sanitizeUrl, isValidMediaUrl, detectMediaType, getStorageProvider } from '@/lib/url-utils'

interface MediaUploadProps {
  profileId: string
}

export function MediaUpload({ profileId }: MediaUploadProps) {
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleUrlChange = (url: string) => {
    setMediaUrl(url)
    
    if (url.trim()) {
      const sanitized = sanitizeUrl(url)
      
      if (isValidMediaUrl(sanitized)) {
        setPreviewUrl(sanitized)
        console.log('URL válida detectada:', {
          original: url,
          sanitized,
          type: detectMediaType(sanitized),
          provider: getStorageProvider(sanitized)
        })
      } else {
        setPreviewUrl(null)
      }
    } else {
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async () => {
    const sanitized = sanitizeUrl(mediaUrl)
    
    if (!sanitized || !isValidMediaUrl(sanitized)) {
      alert('Por favor, insira uma URL válida de mídia')
      return
    }

    setLoading(true)
    try {
      const mediaType = detectMediaType(sanitized)
      
      console.log('Salvando post:', {
        url: sanitized,
        type: mediaType,
        caption
      })

      const { data, error } = await supabase
        .from('posts')
        .insert({
          profile_id: profileId,
          media_url: sanitized,
          media_type: mediaType,
          caption: caption || null,
        })
        .select()

      if (error) throw error

      console.log('✅ Post salvo:', data)
      alert('Mídia adicionada com sucesso!')
      
      // Limpar formulário
      setCaption('')
      setMediaUrl('')
      setPreviewUrl(null)
      
      // Recarregar página
      window.location.reload()
    } catch (error) {
      console.error('❌ Erro ao salvar:', error)
      alert('Erro ao adicionar mídia')
    } finally {
      setLoading(false)
    }
  }

  const sanitized = mediaUrl ? sanitizeUrl(mediaUrl) : ''
  const mediaType = sanitized ? detectMediaType(sanitized) : 'image'
  const storageInfo = sanitized ? getStorageProvider(sanitized) : null
  const isValid = sanitized && isValidMediaUrl(sanitized)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-blue-500" />
          Adicionar Mídia via URL
        </CardTitle>
        <CardDescription>
          Cole o link direto da sua mídia (R2, S3, CDN, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Caption */}
        <div>
          <Label htmlFor="caption">Legenda (opcional)</Label>
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Adicione uma legenda..."
            rows={2}
          />
        </div>

        {/* URL Input */}
        <div>
          <Label htmlFor="media-url">URL da Mídia</Label>
          <div className="flex gap-2">
            <Input
              id="media-url"
              type="url"
              value={mediaUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://pub-123.r2.dev/imagem.jpg"
              disabled={loading}
              className="flex-1"
            />
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !isValid}
              className="px-6"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Check className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Storage Provider Info */}
        {storageInfo && isValid && (
          <div className={`p-3 border rounded-lg ${storageInfo.bgColor}`}>
            <div className="flex items-center gap-2 mb-2">
              <Cloud className={`w-4 h-4 ${storageInfo.color}`} />
              <span className={`text-sm font-medium ${storageInfo.color}`}>
                {storageInfo.name} detectado
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                mediaType === 'image' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {mediaType === 'image' ? 'Imagem' : 'Vídeo'}
              </span>
            </div>
            <p className={`text-xs ${storageInfo.color.replace('600', '500')}`}>
              Mídia será carregada diretamente do {storageInfo.name}
            </p>
          </div>
        )}

        {/* Preview */}
        {previewUrl && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="relative w-full max-w-xs mx-auto">
              <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
                {mediaType === 'image' ? (
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => console.log('Erro no preview')}
                  />
                ) : (
                  <video
                    src={previewUrl}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    onError={() => console.log('Erro no preview do vídeo')}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Help */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-blue-800">
              <p className="font-medium text-sm">Dica:</p>
              <p className="text-xs">
                URLs com espaços são corrigidas automaticamente. 
                Suporte completo para Cloudflare R2, AWS S3, e outros CDNs.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
