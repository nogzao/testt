'use client'

import { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Post } from '@/lib/supabase'
import { SimpleMediaPost } from './simple-media-post'

interface SimpleMediaFeedProps {
  posts: Post[]
  profileId: string
}

export function SimpleMediaFeed({ posts: initialPosts, profileId }: SimpleMediaFeedProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMorePosts = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    
    try {
      const response = await fetch(`/api/posts/${profileId}?limit=10&offset=${posts.length}`)
      const data = await response.json()
      
      if (response.ok) {
        const newPosts = data.posts || []
        if (newPosts.length === 0) {
          setHasMore(false)
        } else {
          setPosts(prev => [...prev, ...newPosts])
        }
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error)
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
      <div className="bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="text-6xl mb-4">📸</div>
          <p className="text-center">Nenhum conteúdo disponível</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        {posts.map((post) => (
          <SimpleMediaPost 
            key={post.id} 
            post={post} 
            profileId={profileId}
          />
        ))}
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}
        
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Fim do conteúdo</p>
          </div>
        )}
      </div>
    </div>
  )
}
