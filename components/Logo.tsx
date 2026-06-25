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
        className="text-indigo-400"
        style={{ textShadow: '0 0 18px rgba(99,102,241,0.5)' }}
      >
        my
      </span>
    </span>
  )
}
