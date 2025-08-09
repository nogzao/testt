import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ProfileEditor } from '@/components/profile-editor'
import { TokenManager } from '@/components/token-manager'
import { SiteLogo } from '@/components/site-logo'

interface EditProfilePageProps {
  params: Promise<{
    username: string
  }>
}

export default async function EditProfilePage({ params }: EditProfilePageProps) {
  try {
    // Await params para Next.js 15
    const { username } = await params

    // Query mais simples e rápida
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        id, 
        username, 
        display_name, 
        bio, 
        followers_count, 
        is_active,
        profile_image_url,
        banner_image_url,
        description,
        show_comments,
        restricted_content_text,
        restricted_content_link,
        button_text,
        button_link
      `)
      .eq('username', username)
      .eq('is_active', true)
      .single()

    if (error || !profile) {
      console.error('Profile not found:', username, error)
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header com Logo */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <SiteLogo size="md" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Perfil</h1>
            <p className="text-gray-600">@{profile.username}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Editor */}
            <div>
              <ProfileEditor profile={profile} />
            </div>

            {/* Token Manager */}
            <div>
              <TokenManager profileId={profile.id} profileUsername={profile.username} />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in EditProfilePage:', error)
    notFound()
  }
}
