'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <span
      className={`font-display font-bold tracking-tight select-none ${sizeMap[size]} ${className}`}
    >
      <span className="text-white">agent</span>
      <span
        className="text-sky-400"
        style={{ textShadow: '0 0 18px rgba(56,189,248,0.45)' }}
      >
        ro
      </span>
    </span>
  )
}
