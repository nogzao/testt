import Image from 'next/image'
import { Users, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Profile } from '@/lib/supabase'

interface ProfileHeaderProps {
  profile: Profile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const handleButtonClick = () => {
    if (profile.button_link) {
      window.open(profile.button_link, '_blank')
    }
  }

  return (
    <div className="bg-white">
      {/* Header com Logo */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Image
              src="/images/privacy-logo.webp"
              alt="Privacy"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Banner */}
        <div className="h-48 md:h-64 relative overflow-hidden">
          {profile.banner_image_url ? (
            <Image
              src={profile.banner_image_url || "/placeholder.svg"}
              alt="Banner"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Profile Info */}
        <div className="relative px-4 pb-6 bg-white">
          {/* Profile Picture */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                {profile.profile_image_url ? (
                  <Image
                    src={profile.profile_image_url || "/placeholder.svg"}
                    alt={profile.display_name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback para inicial se a imagem falhar
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-4xl font-bold text-white">
                            ${profile.display_name.charAt(0).toUpperCase()}
                          </div>
                        `
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-4xl font-bold text-white">
                    {profile.display_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Name and Bio */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">{profile.display_name}</h1>
            
            {profile.bio && (
              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                {profile.bio}
              </p>
            )}

            {profile.description && (
              <p className="text-gray-700 text-base leading-relaxed max-w-lg mx-auto">
                {profile.description}
              </p>
            )}

            {/* Followers and Button */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  {profile.followers_count.toLocaleString()} seguidores
                </span>
              </div>
              
              {profile.button_text && (
                <Button
                  onClick={handleButtonClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
                  size="sm"
                >
                  {profile.button_text}
                  {profile.button_link && <ExternalLink className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
