import { SiteLogo } from '@/components/site-logo'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Header com Logo */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 py-4 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <SiteLogo size="md" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 mt-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-1">Carregando...</h2>
          <p className="text-sm text-gray-600">Aguarde um momento</p>
        </div>
      </div>
    </div>
  )
}
