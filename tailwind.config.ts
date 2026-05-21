import type { Config } from 'tailwindcss'

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
        display: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        spark: {
          bg: '#0a0a0a',
          surface: '#111111',
          elevated: '#1a1a1a',
          blue: '#3b82f6',
          amber: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
}

export default config
