import { Lock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-red-400" />
          </div>
          <CardTitle className="text-xl">Acesso Restrito</CardTitle>
          <CardDescription className="text-gray-400">
            Este perfil é privado e requer um token de acesso válido
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-200">
              <p className="font-medium mb-1">Token necessário</p>
              <p>Para acessar este conteúdo, você precisa de um link válido com token de acesso.</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => window.history.back()}
            >
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
