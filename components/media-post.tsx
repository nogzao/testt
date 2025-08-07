'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Heart, MessageCircle, AlertCircle, Volume2, Cloud, RefreshCw, Settings } from 'lucide-react'
import { Post } from '@/lib/supabase'
import { sanitizeUrl, detectMediaType, getStorageProvider } from '@/lib/url-utils'

interface MediaPostProps {
  post: Post
}

export function MediaPost({ post }: MediaPostProps) {
  const [liked, setLiked] = useState(false)
  const [loadingStrategy, setLoadingStrategy] = useState<'img' | 'background' | 'iframe'>('img')
  const [mediaState, setMediaState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [retryCount, setRetryCount] = useState(0)
  const [showDebug, setShowDebug] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const sanitizedUrl = sanitizeUrl(post.media_url)
  const actualMediaType = detectMediaType(sanitizedUrl)
  const storageInfo = getStorageProvider(sanitizedUrl)
  const isR2 = sanitizedUrl.includes('.r2.dev')

  console.log('MediaPost render:', {
    id: post.id,
    original: post.media_url,
    sanitized: sanitizedUrl,
    type: actualMediaType,
    isR2,
    strategy: loadingStrategy,
    state: mediaState
  })

  // Strategy 1: Native img tag
  const loadWithImgTag = () => {
    setMediaState('loading')
    if (imgRef.current) {
      imgRef.current.src = sanitizedUrl
    }
  }

  // Strategy 2: Background image
  const loadWithBackground = () => {
    setMediaState('loading')
    if (divRef.current) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        if (divRef.current) {
          divRef.current.style.backgroundImage = `url(${sanitizedUrl})`
          setMediaState('loaded')
        }
      }
      img.onerror = () => setMediaState('error')
      img.src = sanitizedUrl
    }
  }

  // Strategy 3: Proxy/fetch approach
  const loadWithProxy = async () => {
    setMediaState('loading')
    try {
      // Try to load through a proxy or different method
      const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(sanitizedUrl)}`)
      if (response.ok) {
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)
        if (imgRef.current) {
          imgRef.current.src = objectUrl
        }
      } else {
        setMediaState('error')
      }
    } catch (error) {
      console.error('Proxy load failed:', error)
      setMediaState('error')
    }
  }

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', sanitizedUrl)
    setMediaState('loaded')
  }

  const handleImageError = (e: any) => {
    console.error('❌ Image load failed:', {
      url: sanitizedUrl,
      error: e,
      strategy: loadingStrategy,
      retry: retryCount
    })
    setMediaState('error')
  }

  const handleRetry = () => {
    const newRetryCount = retryCount + 1
    setRetryCount(newRetryCount)
    
    // Try different strategies on retry
    if (newRetryCount === 1) {
      setLoadingStrategy('background')
      loadWithBackground()
    } else if (newRetryCount === 2) {
      setLoadingStrategy('img')
      loadWithImgTag()
    } else {
      // Reset and try img again
      setLoadingStrategy('img')
      loadWithImgTag()
    }
  }

  // Initial load
  useEffect(() => {
    if (actualMediaType === 'image') {
      if (isR2) {
        // For R2, try background image first
        setLoadingStrategy('background')
        loadWithBackground()
      } else {
        loadWithImgTag()
      }
    }
  }, [sanitizedUrl, actualMediaType, isR2])

  return (
    <div className="mb-1 bg-gray-900 rounded-lg overflow-hidden">
      {/* Debug Toggle */}
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Estratégia: {loadingStrategy}</span>
          <span>Estado: {mediaState}</span>
          {retryCount > 0 && <span>Tentativas: {retryCount}</span>}
        </div>
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="text-gray-400 hover:text-white"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Debug Info */}
      {showDebug && (
        <div className="p-3 bg-gray-800 text-xs text-gray-300 space-y-1">
          <p><strong>Original:</strong> {post.media_url}</p>
          <p><strong>Sanitizada:</strong> {sanitizedUrl}</p>
          <p><strong>Tipo:</strong> {actualMediaType}</p>
          <p><strong>R2:</strong> {isR2 ? 'Sim' : 'Não'}</p>
          <p><strong>Provedor:</strong> {storageInfo?.name}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => { setLoadingStrategy('img'); loadWithImgTag() }}
              className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
            >
              IMG Tag
            </button>
            <button
              onClick={() => { setLoadingStrategy('background'); loadWithBackground() }}
              className="px-2 py-1 bg-green-600 text-white rounded text-xs"
            >
              Background
            </button>
          </div>
        </div>
      )}

      {/* Media Container */}
      <div className="relative aspect-[4/5] bg-gray-800">
        
        {/* Loading State */}
        {mediaState === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
            <p className="text-xs text-gray-400">
              Carregando com {loadingStrategy}...
            </p>
          </div>
        )}

        {/* Error State */}
        {mediaState === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <AlertCircle className="w-12 h-12 mb-3 text-red-400" />
            <p className="text-sm font-medium text-white mb-2">
              Falha no carregamento
            </p>
            <p className="text-xs text-gray-400 text-center mb-4">
              Estratégia: {loadingStrategy} | Tentativa: {retryCount + 1}
            </p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Image - Strategy 1: IMG Tag */}
        {actualMediaType === 'image' && loadingStrategy === 'img' && (
          <img
            ref={imgRef}
            alt={post.caption || 'Post image'}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: mediaState === 'error' ? 'none' : 'block' }}
            crossOrigin="anonymous"
          />
        )}

        {/* Image - Strategy 2: Background Image */}
        {actualMediaType === 'image' && loadingStrategy === 'background' && (
          <div
            ref={divRef}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ display: mediaState === 'error' ? 'none' : 'block' }}
          />
        )}

        {/* Video */}
        {actualMediaType === 'video' && (
          <video
            src={sanitizedUrl}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
            onLoadedData={() => setMediaState('loaded')}
            onError={handleImageError}
            style={{ display: mediaState === 'error' ? 'none' : 'block' }}
            crossOrigin="anonymous"
          />
        )}

        {/* Storage Provider Badge */}
        {storageInfo && mediaState === 'loaded' && (
          <div className="absolute top-4 right-4">
            <div className={`${storageInfo.badgeColor}/90 rounded px-2 py-1 flex items-center gap-1`}>
              <Cloud className="w-3 h-3 text-white" />
              <span className="text-xs text-white font-medium">
                {storageInfo.name}
              </span>
            </div>
          </div>
        )}

        {/* Video Controls */}
        {actualMediaType === 'video' && mediaState === 'loaded' && (
          <div className="absolute top-4 left-4">
            <div className="bg-black/50 rounded-full p-2">
              <Volume2 className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-4 space-y-3">
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`transition-colors ${
              liked ? 'text-red-500' : 'text-white hover:text-gray-300'
            }`}
          >
            <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button className="text-white hover:text-gray-300 transition-colors">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Caption */}
        {post.caption && (
          <p className="text-sm text-gray-200 leading-relaxed">
            {post.caption}
          </p>
        )}

        {/* Post Info */}
        <div className="space-y-1">
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className={`px-2 py-1 rounded ${
              actualMediaType === 'image' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {actualMediaType === 'image' ? 'Imagem' : 'Vídeo'}
            </span>
            {storageInfo && (
              <span className="text-gray-500">
                via {storageInfo.name}
              </span>
            )}
            <span className={`px-2 py-1 rounded ${
              mediaState === 'loaded' ? 'bg-green-500/20 text-green-400' :
              mediaState === 'loading' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {mediaState}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
