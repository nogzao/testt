import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}

export const metadata = {
  title: 'Admin - Privacy Platform',
  description: 'Dashboard administrativo da plataforma Privacy',
}
