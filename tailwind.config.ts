import type { Config } from 'tailwindcss'

/**
 * Shape system: buttons = pill (rounded-full), cards/media = rounded-2xl,
 * inputs = underline (no radius). One accent: emerald.
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-rubik)', 'sans-serif'],
        sans: ['var(--font-heebo)', 'sans-serif'],
      },
      colors: {
        base: {
          DEFAULT: '#0c0c0e',
          raised: '#131316',
          line: 'rgba(255,255,255,0.08)',
        },
        accent: {
          DEFAULT: '#34d399',
          dim: '#10b981',
        },
      },
    },
  },
  plugins: [],
}

export default config
