import { notFound } from 'next/navigation'
import { verifyAccessToken, getProfileByUsername, getProfilePosts } from '@/lib/auth'
import { ProfileHeader } from '@/components/profile-header'
import { SimpleMediaFeed } from '@/components/simple-media-feed'
import { AccessDenied } from '@/components/access-denied'

interface ProfilePageProps {
  params: {
    username: string
  }
  searchParams: {
    token?: string
  }
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { username } = params
  const { token } = searchParams

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
}

export async function generateMetadata({ params }: { params: { username: string } }) {
  const profile = await getProfileByUsername(params.username)
  
  if (!profile) {
    return {
      title: 'Perfil não encontrado'
    }
  }

  return {
    title: `${profile.display_name} - Perfil Privado`,
    description: profile.bio || `Perfil privado de ${profile.display_name}`,
  }
}
