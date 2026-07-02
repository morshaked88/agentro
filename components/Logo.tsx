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
      <span className="text-zinc-100">agent</span>
      <span className="text-accent">my</span>
    </span>
  )
}
