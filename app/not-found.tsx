import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <CardTitle className="text-xl">Página Não Encontrada</CardTitle>
          <CardDescription className="text-gray-400">
            A página que você está procurando não existe ou foi removida
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/" className="gap-2">
                <Home className="w-4 h-4" />
                Voltar ao Início
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
