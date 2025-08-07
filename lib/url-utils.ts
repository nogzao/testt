// Utilitários para trabalhar com URLs de mídia

export function sanitizeUrl(url: string): string {
  try {
    // Remover espaços extras no início e fim
    let cleanUrl = url.trim()
    
    // Codificar espaços e caracteres especiais na parte do path
    const urlObj = new URL(cleanUrl)
    
    // Dividir o pathname em partes e codificar cada uma
    const pathParts = urlObj.pathname.split('/').map(part => {
      if (part) {
        // Codificar caracteres especiais, incluindo espaços
        return encodeURIComponent(part)
      }
      return part
    })
    
    // Reconstruir a URL
    urlObj.pathname = pathParts.join('/')
    
    return urlObj.toString()
  } catch (error) {
    console.error('Erro ao sanitizar URL:', error)
    // Se falhar, pelo menos tentar codificar espaços básicos
    return url.trim().replace(/ /g, '%20')
  }
}

export function isValidMediaUrl(url: string): boolean {
  try {
    new URL(url)
    
    // Verificar se tem extensão de mídia
    const lowerUrl = url.toLowerCase()
    const mediaExtensions = [
      '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff',
      '.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.flv', '.m4v'
    ]
    
    return mediaExtensions.some(ext => lowerUrl.includes(ext))
  } catch {
    return false
  }
}

export function detectMediaType(url: string): 'image' | 'video' {
  const lowerUrl = url.toLowerCase()
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.flv', '.m4v']
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff']
  
  if (videoExtensions.some(ext => lowerUrl.includes(ext))) {
    return 'video'
  }
  if (imageExtensions.some(ext => lowerUrl.includes(ext))) {
    return 'image'
  }
  
  // Detectar por palavras-chave na URL
  if (lowerUrl.includes('video') || lowerUrl.includes('mp4') || lowerUrl.includes('stream')) {
    return 'video'
  }
  
  return 'image' // default para imagem
}

export function getStorageProvider(url: string) {
  const lowerUrl = url.toLowerCase()
  
  if (lowerUrl.includes('.r2.dev') || lowerUrl.includes('r2.cloudflarestorage.com')) {
    return { 
      name: 'Cloudflare R2', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50 border-orange-200',
      badgeColor: 'bg-orange-500'
    }
  }
  if (lowerUrl.includes('s3.') || lowerUrl.includes('amazonaws.com')) {
    return { 
      name: 'AWS S3', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50 border-yellow-200',
      badgeColor: 'bg-yellow-500'
    }
  }
  if (lowerUrl.includes('cloudfront.net')) {
    return { 
      name: 'CloudFront CDN', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50 border-blue-200',
      badgeColor: 'bg-blue-500'
    }
  }
  if (lowerUrl.includes('supabase.co/storage')) {
    return { 
      name: 'Supabase Storage', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50 border-green-200',
      badgeColor: 'bg-green-500'
    }
  }
  if (lowerUrl.includes('bunnycdn.com') || lowerUrl.includes('b-cdn.net')) {
    return { 
      name: 'Bunny CDN', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50 border-purple-200',
      badgeColor: 'bg-purple-500'
    }
  }
  if (lowerUrl.includes('digitaloceanspaces.com')) {
    return { 
      name: 'DigitalOcean Spaces', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50 border-blue-200',
      badgeColor: 'bg-blue-500'
    }
  }
  if (lowerUrl.includes('gtv-videos-bucket') || lowerUrl.includes('commondatastorage.googleapis.com')) {
    return { 
      name: 'Google Storage', 
      color: 'text-red-600', 
      bgColor: 'bg-red-50 border-red-200',
      badgeColor: 'bg-red-500'
    }
  }
  if (lowerUrl.includes('picsum.photos')) {
    return { 
      name: 'Picsum Photos', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50 border-green-200',
      badgeColor: 'bg-green-500'
    }
  }
  
  return { 
    name: 'URL Externa', 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-50 border-gray-200',
    badgeColor: 'bg-gray-500'
  }
}
