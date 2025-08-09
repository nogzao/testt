// Tipos para Next.js 15 compatibility
export interface PageProps {
  params: Promise<Record<string, string | string[]>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export interface LayoutProps {
  children: React.ReactNode
  params: Promise<Record<string, string | string[]>>
}

export interface GenerateMetadataProps {
  params: Promise<Record<string, string | string[]>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

// Tipos para API Routes
export interface APIRouteContext {
  params: Promise<Record<string, string>>
}

export interface APIRouteProps {
  params: Promise<{ [key: string]: string }>
}
