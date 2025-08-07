'use client'

import { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Post } from '@/lib/supabase'
import { MediaPost } from './media-post'
import { R2ImageTester } from './r2-image-tester'

interface MediaFeedProps {
  posts: Post[]
  profileId: string
}

export function MediaFeed({ posts: initialPosts, profileId }: MediaFeedProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showTester, setShowTester] = useState(false)

  const loadMorePosts = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/posts/${profileId}?limit=10&offset=${posts.length}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch posts')
      }

      const newPosts = data.posts || []
      
      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setPosts(prev => [...prev, ...newPosts])
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error)
      setError('Erro ao carregar mais posts')
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [posts.length, loading, hasMore])

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="text-6xl mb-4">📸</div>
        <p className="text-center">Nenhum conteúdo disponível ainda</p>
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 inline mr-2" />
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Debug Tester */}
      <div className="mb-4">
        <button
          onClick={() => setShowTester(!showTester)}
          className="text-xs text-gray-400 hover:text-white"
        >
          {showTester ? 'Ocultar' : 'Mostrar'} Testador R2
        </button>
      </div>
      
      {showTester && <R2ImageTester />}
      
      <div className="mb-4 text-xs text-gray-500 text-center">
        {posts.length} posts carregados
      </div>
      
      {posts.map((post, index) => (
        <MediaPost key={`${post.id}-${index}`} post={post} />
      ))}
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-4">
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 inline mr-2" />
            {error}
          </div>
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>Você viu todo o conteúdo disponível</p>
        </div>
      )}
    </div>
  )
}
