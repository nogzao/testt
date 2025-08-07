'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Play, AlertTriangle, Lock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Post, Profile, supabase } from '@/lib/supabase'

interface SimpleMediaPostProps {
  post: Post
  profileId: string
  showComments?: boolean
}

export function SimpleMediaPost({ post, profileId, showComments = false }: SimpleMediaPostProps) {
  const [liked, setLiked] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [currentLikes, setCurrentLikes] = useState(post.likes_count || 0)

  // Carregar dados do perfil
  useEffect(() => {
    loadProfile()
  }, [profileId])

  const loadProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('show_comments, restricted_content_text, restricted_content_link')
        .eq('id', profileId)
        .single()

      if (data) {
        setProfile(data as Profile)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  // Função simples para detectar tipo de mídia
  const getMediaType = (url: string): 'image' | 'video' => {
    const lowerUrl = url.toLowerCase()
    if (lowerUrl.includes('.mp4') || lowerUrl.includes('.webm') || lowerUrl.includes('.ogg') || lowerUrl.includes('video')) {
      return 'video'
    }
    return 'image'
  }

  const mediaType = getMediaType(post.media_url)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    console.log('✅ Mídia carregada:', post.media_url)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    console.error('❌ Erro ao carregar:', post.media_url)
  }

  const handleLike = () => {
    setLiked(!liked)
    setCurrentLikes(prev => liked ? prev - 1 : prev + 1)
  }

  const handleUnlockContent = () => {
    if (profile?.restricted_content_link) {
      window.open(profile.restricted_content_link, '_blank')
    }
  }

  return (
    <div className="mb-6 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      {/* Container da mídia */}
      <div className="relative aspect-[4/5] bg-gray-100">
        
        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Error */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500">
            <AlertTriangle className="w-12 h-12 mb-2" />
            <p className="text-sm">Não foi possível carregar</p>
            <p className="text-xs mt-1 px-4 text-center break-all">{post.media_url}</p>
          </div>
        )}

        {/* Imagem */}
        {mediaType === 'image' && (
          <img
            src={post.media_url || "/placeholder.svg"}
            alt={post.caption || 'Post'}
            className={`w-full h-full object-cover ${post.is_restricted ? 'blur-md' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
            style={{ display: hasError ? 'none' : 'block' }}
          />
        )}

        {/* Vídeo */}
        {mediaType === 'video' && (
          <>
            <video
              src={post.media_url}
              className={`w-full h-full object-cover ${post.is_restricted ? 'blur-md' : ''}`}
              controls={!post.is_restricted}
              preload="metadata"
              onLoadedData={handleLoad}
              onError={handleError}
              style={{ display: hasError ? 'none' : 'block' }}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </>
        )}

        {/* Overlay de Conteúdo Restrito - CENTRALIZADO */}
        {post.is_restricted && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center space-y-4 px-6">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-white font-semibold text-lg">Conteúdo Restrito</p>
                <p className="text-gray-200 text-sm">
                  Este conteúdo é exclusivo para assinantes
                </p>
              </div>
              {profile?.restricted_content_link && (
                <Button
                  onClick={handleUnlockContent}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {profile.restricted_content_text || 'Desbloquear conteúdo restrito'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo do post */}
      <div className="p-4">
        {/* Botões de ação */}
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              liked ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{currentLikes.toLocaleString()}</span>
          </button>
          
          {(showComments || profile?.show_comments) && (
            <button className="text-gray-600 hover:text-orange-500 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Legenda */}
        {post.caption && (
          <p className="text-sm text-gray-800 mb-2 leading-relaxed">
            {post.caption}
          </p>
        )}

        {/* Data e status */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleDateString('pt-BR')}
          </p>
          <div className="flex items-center gap-2">
            {post.is_restricted && (
              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded">
                Restrito
              </span>
            )}
            <span className="text-xs text-gray-500">
              {currentLikes} likes
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
