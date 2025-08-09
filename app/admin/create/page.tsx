import { CreateProfileForm } from '@/components/create-profile-form'
import { SiteLogo } from '@/components/site-logo'

export default function CreateProfilePage() {
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

      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Perfil</h1>
          <p className="text-gray-600">Adicione um novo perfil à plataforma</p>
        </div>
        
        <CreateProfileForm />
      </div>
    </div>
  )
}
