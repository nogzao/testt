'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Trash2, Edit, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Post, supabase } from '@/lib/supabase'

interface PostManagerProps {
  profileId: string
}

export function PostManager({ profileId }: PostManagerProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [profileId])

  const loadPosts = async () => {
    try {
      const response = await fetch(`/api/posts/${profileId}?limit=100`)
      const data = await response.json()
      
      if (response.ok) {
        setPosts(data.posts || [])
      } else {
        console.error('Error loading posts:', data.error)
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return

    try {
      const { error } = await supabase
        .from('posts')
        .update({ is_active: false })
        .eq('id', postId)

      if (error) throw error

      setPosts(posts.filter(post => post.id !== postId))
      alert('Post excluído com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir post:', error)
      alert('Erro ao excluir post')
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
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
        <CardTitle>Posts ({posts.length})</CardTitle>
        <CardDescription>
          Gerencie o conteúdo do perfil
        </CardDescription>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum post encontrado</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {post.media_type === 'image' ? (
                    <Image
                      src={post.media_url || "/placeholder.svg"}
                      alt="Post"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {post.caption || 'Sem legenda'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {post.media_type}
                  </p>
                </div>

                {/* Actions */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deletePost(post.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
