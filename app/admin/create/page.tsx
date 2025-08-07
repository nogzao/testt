import { CreateProfileForm } from '@/components/create-profile-form'

export default function CreateProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
