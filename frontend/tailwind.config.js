/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Venice AI premium palette
        'stucco-light': '#eeede4',   // Warm parchment — main background
        'stucco-mid':   '#bea989',   // Warm sand — accents, borders
        'stucco-dark':  '#63534b',   // Deep earthy — subtle dividers
        'sea-dark':     '#0e2942',   // Deep navy — headings & dark text
        'sea-mid':      '#1a3f60',   // Mid navy — hover states
        'accent':       '#125da3',   // Vivid blue — CTAs, links
        'kollej-red':   '#d4171e',   // Institutional red — badges, tags
        // Keep old names as aliases for backward compat
        'brand-blue':   '#0e2942',
        'brand-accent': '#125da3',
        'brand-light':  '#eeede4',
        'brand-dark':   '#0e2942',
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      keyframes: {
        'landing-fade-scale': {
          '0%':   { opacity: '0', transform: 'scale(0.88)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'landing-fade-blur': {
          '0%':   { filter: 'blur(6px)', opacity: '0', transform: 'translateY(12px)' },
          '100%': { filter: 'blur(0)',   opacity: '1', transform: 'translateY(0)' },
        },
        'landing-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(6px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-pulse': {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '0.5' },
          '50%':      { transform: 'scaleY(0.6)', opacity: '0.2' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-scale':    'landing-fade-scale 0.55s cubic-bezier(0.16,1,0.3,1) both',
        'fade-blur':     'landing-fade-blur  0.65s cubic-bezier(0.16,1,0.3,1) 0.1s both',
        'fade-blur-200': 'landing-fade-blur  0.65s cubic-bezier(0.16,1,0.3,1) 0.2s both',
        'fade-blur-350': 'landing-fade-blur  0.65s cubic-bezier(0.16,1,0.3,1) 0.35s both',
        'fade-blur-500': 'landing-fade-blur  0.65s cubic-bezier(0.16,1,0.3,1) 0.5s  both',
        'bounce-down':   'landing-bounce 2s ease-in-out infinite',
        'marquee':       'marquee 30s linear infinite',
        'scroll-pulse':  'scroll-pulse 2s cubic-bezier(0.65,0,0.35,1) infinite',
        'fade-in':       'fade-in 0.4s ease both',
      },
      backdropBlur: {
        xl: '24px',
      },
    },
  },
  plugins: [],
}
