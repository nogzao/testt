'use client'

import { useState } from 'react'
import { TestTube, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function R2ImageTester() {
  const [testUrl, setTestUrl] = useState('https://pub-d34eff651b7a4f5bb4dd8eee19134c9d.r2.dev/WhatsApp%20Image%202025-06-28%20at%2013.16.46.jpeg')
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<{
    imgTag: 'loading' | 'success' | 'error' | null
    nextImage: 'loading' | 'success' | 'error' | null
    fetch: 'loading' | 'success' | 'error' | null
    cors: 'loading' | 'success' | 'error' | null
  }>({
    imgTag: null,
    nextImage: null,
    fetch: null,
    cors: null
  })
  const [errorDetails, setErrorDetails] = useState<string>('')

  const runTests = async () => {
    setTesting(true)
    setResults({
      imgTag: 'loading',
      nextImage: 'loading',
      fetch: 'loading',
      cors: 'loading'
    })
    setErrorDetails('')

    // Test 1: Native img tag
    const testImgTag = () => {
      return new Promise((resolve) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          console.log('✅ IMG tag success')
          resolve('success')
        }
        img.onerror = (e) => {
          console.error('❌ IMG tag error:', e)
          resolve('error')
        }
        img.src = testUrl
        
        // Timeout after 10 seconds
        setTimeout(() => {
          console.log('⏰ IMG tag timeout')
          resolve('error')
        }, 10000)
      })
    }

    // Test 2: Fetch test
    const testFetch = async () => {
      try {
        const response = await fetch(testUrl, { 
          method: 'HEAD',
          mode: 'no-cors'
        })
        console.log('✅ Fetch success:', response.status)
        return 'success'
      } catch (error) {
        console.error('❌ Fetch error:', error)
        return 'error'
      }
    }

    // Test 3: CORS test
    const testCors = async () => {
      try {
        const response = await fetch(testUrl, { 
          method: 'HEAD',
          mode: 'cors'
        })
        console.log('✅ CORS success:', response.status)
        return 'success'
      } catch (error) {
        console.error('❌ CORS error:', error)
        setErrorDetails(error.toString())
        return 'error'
      }
    }

    // Run tests
    const [imgResult, fetchResult, corsResult] = await Promise.all([
      testImgTag(),
      testFetch(),
      testCors()
    ])

    setResults({
      imgTag: imgResult as any,
      nextImage: 'error', // We'll test this separately
      fetch: fetchResult as any,
      cors: corsResult as any
    })

    setTesting(false)
  }

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'loading': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />
      default: return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-blue-500" />
          Teste Específico R2
        </CardTitle>
        <CardDescription>
          Diagnóstico completo para URLs do Cloudflare R2
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="URL do R2 para testar"
            disabled={testing}
          />
          <Button onClick={runTests} disabled={testing}>
            {testing ? 'Testando...' : 'Testar'}
          </Button>
        </div>

        {/* Test Results */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 border rounded">
            {getStatusIcon(results.imgTag)}
            <span className="text-sm">Tag IMG nativa</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 border rounded">
            {getStatusIcon(results.fetch)}
            <span className="text-sm">Fetch (no-cors)</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 border rounded">
            {getStatusIcon(results.cors)}
            <span className="text-sm">Fetch (cors)</span>
          </div>
        </div>

        {/* Error Details */}
        {errorDetails && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm">
            <p className="font-medium text-red-800 mb-1">Detalhes do Erro:</p>
            <code className="text-red-600 text-xs">{errorDetails}</code>
          </div>
        )}

        {/* Live Preview */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Preview Ao Vivo:</p>
          <div className="border rounded p-4 bg-gray-50">
            <div className="aspect-[4/5] max-w-xs mx-auto bg-gray-200 rounded overflow-hidden">
              <img
                src={testUrl || "/placeholder.svg"}
                alt="Teste R2"
                className="w-full h-full object-cover"
                onLoad={() => console.log('✅ Preview carregou')}
                onError={(e) => {
                  console.error('❌ Preview erro:', e)
                  setResults(prev => ({ ...prev, nextImage: 'error' }))
                }}
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>

        {/* URL Analysis */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <p className="font-medium text-blue-800 mb-2">Análise da URL:</p>
          <div className="space-y-1 text-blue-700">
            <p>• Domínio: {new URL(testUrl).hostname}</p>
            <p>• Protocolo: {new URL(testUrl).protocol}</p>
            <p>• Path: {decodeURIComponent(new URL(testUrl).pathname)}</p>
            <p>• Codificada: {testUrl.includes('%') ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
