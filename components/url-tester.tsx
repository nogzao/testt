'use client'

import { useState } from 'react'
import { TestTube, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function UrlTester() {
  const [testUrl, setTestUrl] = useState('')
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<{
    status: 'success' | 'error' | 'warning'
    message: string
    details?: string
  } | null>(null)

  const testUrl_func = async () => {
    if (!testUrl) return

    setTesting(true)
    setResult(null)

    try {
      // Testar se a URL é válida
      const url = new URL(testUrl)
      
      // Detectar tipo de mídia
      const isImage = /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?|$)/i.test(testUrl)
      const isVideo = /\.(mp4|webm|ogg|mov|avi|mkv|flv)(\?|$)/i.test(testUrl)
      
      if (!isImage && !isVideo) {
        setResult({
          status: 'warning',
          message: 'Tipo de mídia não detectado',
          details: 'Certifique-se de que a URL termina com uma extensão de imagem ou vídeo'
        })
        return
      }

      // Testar se a URL é acessível
      const response = await fetch(testUrl, { 
        method: 'HEAD',
        mode: 'no-cors' // Evitar problemas de CORS no teste
      })

      setResult({
        status: 'success',
        message: `${isImage ? 'Imagem' : 'Vídeo'} detectado com sucesso`,
        details: `URL válida e acessível. Provedor: ${getProviderName(testUrl)}`
      })

    } catch (error) {
      console.error('Erro no teste:', error)
      
      if (error instanceof TypeError && error.message.includes('Invalid URL')) {
        setResult({
          status: 'error',
          message: 'URL inválida',
          details: 'Verifique se a URL está no formato correto'
        })
      } else {
        setResult({
          status: 'warning',
          message: 'Não foi possível testar a URL',
          details: 'A URL pode funcionar mesmo assim. Problemas de CORS são comuns em testes.'
        })
      }
    } finally {
      setTesting(false)
    }
  }

  const getProviderName = (url: string) => {
    const lowerUrl = url.toLowerCase()
    if (lowerUrl.includes('.r2.dev')) return 'Cloudflare R2'
    if (lowerUrl.includes('s3.') || lowerUrl.includes('amazonaws.com')) return 'AWS S3'
    if (lowerUrl.includes('cloudfront.net')) return 'CloudFront'
    if (lowerUrl.includes('supabase.co')) return 'Supabase'
    if (lowerUrl.includes('picsum.photos')) return 'Picsum Photos'
    if (lowerUrl.includes('commondatastorage.googleapis.com')) return 'Google Storage'
    return 'Provedor desconhecido'
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-blue-500" />
          Testar URL
        </CardTitle>
        <CardDescription>
          Teste se uma URL de mídia está funcionando antes de adicionar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            disabled={testing}
          />
          <Button onClick={testUrl_func} disabled={testing || !testUrl}>
            {testing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <TestTube className="w-4 h-4" />
            )}
          </Button>
        </div>

        {result && (
          <div className={`p-3 rounded-lg border ${
            result.status === 'success' ? 'bg-green-50 border-green-200' :
            result.status === 'error' ? 'bg-red-50 border-red-200' :
            'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-start gap-2">
              {result.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
              {result.status === 'error' && <XCircle className="w-5 h-5 text-red-600 mt-0.5" />}
              {result.status === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />}
              
              <div>
                <p className={`font-medium text-sm ${
                  result.status === 'success' ? 'text-green-800' :
                  result.status === 'error' ? 'text-red-800' :
                  'text-yellow-800'
                }`}>
                  {result.message}
                </p>
                {result.details && (
                  <p className={`text-xs mt-1 ${
                    result.status === 'success' ? 'text-green-600' :
                    result.status === 'error' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {result.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
