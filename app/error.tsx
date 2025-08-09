'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log do erro para debugging
    console.error('Application Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    })
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Header com Logo */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 py-4 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <SiteLogo size="md" />
          </div>
        </div>
      </div>

      <Card className="w-full max-w-md bg-white border-gray-200 shadow-lg mt-20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <CardTitle className="text-xl text-gray-900">Algo deu errado</CardTitle>
          <CardDescription className="text-gray-600">
            Ocorreu um erro inesperado. Tente novamente ou volte à página inicial.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Informações do erro (apenas em desenvolvimento) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-3 bg-gray-100 rounded-lg text-xs">
              <p className="font-medium text-gray-800 mb-1">Debug Info:</p>
              <p className="text-gray-600 break-all">{error.message}</p>
              {error.digest && (
                <p className="text-gray-500 mt-1">Digest: {error.digest}</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button 
              onClick={reset}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </div>

          {/* Informações de contato */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Se o problema persistir, recarregue a página ou tente mais tarde.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
