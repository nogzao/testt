import Image from 'next/image'
import Link from 'next/link'

interface SiteLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  linkToHome?: boolean
}

export function SiteLogo({ className = '', size = 'md', linkToHome = true }: SiteLogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  }

  const logoElement = (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/privacy-logo.webp"
        alt="Privacy"
        width={size === 'sm' ? 120 : size === 'md' ? 150 : 180}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
        className={`${sizeClasses[size]} w-auto`}
        priority
      />
    </div>
  )

  if (linkToHome) {
    return (
      <Link href="/" className="hover:opacity-80 transition-opacity">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}
