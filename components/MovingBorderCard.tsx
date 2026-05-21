'use client'

import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  accent?: 'blue' | 'amber'
  className?: string
  innerClassName?: string
  duration?: number
}

export function MovingBorderCard({
  children,
  accent = 'blue',
  className = '',
  innerClassName = '',
  duration = 5,
}: Props) {
  const color = accent === 'blue' ? '#3b82f6' : '#f59e0b'
  const colorFaint = accent === 'blue' ? 'rgba(59,130,246,0.25)' : 'rgba(245,158,11,0.25)'

  return (
    <div className={`relative p-[1px] rounded-xl overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${colorFaint} 40deg, ${color} 60deg, ${colorFaint} 80deg, transparent 130deg)`,
        }}
      />
      <div className={`relative bg-[#0d1117] rounded-[11px] h-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}
