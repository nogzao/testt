import { notFound } from 'next/navigation'
import { verifyAccessToken, getProfileByUsername, getProfilePosts } from '@/lib/auth'
import { ProfileHeader } from '@/components/profile-header'
import { SimpleMediaFeed } from '@/components/simple-media-feed'
import { AccessDenied } from '@/components/access-denied'

interface ProfilePageProps {
  params: Promise<{
    username: string
  }>
  searchParams: Promise<{
    token?: string
  }>
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  try {
    // Await params e searchParams para Next.js 15
    const { username } = await params
    const { token } = await searchParams

    // Buscar perfil
    const profile = await getProfileByUsername(username)
    
    if (!profile) {
      notFound()
    }

    // Verificar token de acesso
    if (!token) {
      return <AccessDenied />
    }

    const { valid } = await verifyAccessToken(token, profile.id)
    
    if (!valid) {
      return <AccessDenied />
    }

    // Buscar posts do perfil
    const posts = await getProfilePosts(profile.id, 20)

    return (
      <div className="min-h-screen bg-black text-white">
        <ProfileHeader profile={profile} />
        <SimpleMediaFeed posts={posts || []} profileId={profile.id} />
      </div>
    )
  } catch (error) {
    console.error('Error in ProfilePage:', error)
    notFound()
  }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params
    const profile = await getProfileByUsername(username)
    
    if (!profile) {
      return {
        title: 'Perfil não encontrado'
      }
    }

    return {
      title: `${profile.display_name} - Perfil Privado`,
      description: profile.bio || `Perfil privado de ${profile.display_name}`,
    }
  } catch (error) {
    return {
      title: 'Perfil não encontrado'
    }
  }
}
