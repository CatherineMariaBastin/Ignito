/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05040c',
        'void-deep': '#020208',
        'nebula-blue': '#3a5cff',
        'nebula-indigo': '#6d3bff',
        'nebula-pink': '#ff3fa4',
        'nebula-magenta': '#c026d3',
        'nebula-green': '#39ffb0',
        'star-yellow': '#ffd23f',
        'star-amber': '#ff9d3f',
        starlight: '#f4f4ff',
        'horizon-black': '#08060f',
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'nebula-radial':
          'radial-gradient(circle at 20% 20%, rgba(58,92,255,0.25), transparent 45%), radial-gradient(circle at 80% 30%, rgba(255,63,164,0.20), transparent 45%), radial-gradient(circle at 50% 80%, rgba(57,255,176,0.15), transparent 45%)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.25, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px 0 rgba(58,92,255,0.4)' },
          '50%': { boxShadow: '0 0 45px 8px rgba(58,92,255,0.7)' },
        },
        drift: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        rise: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        orbit: 'orbit linear infinite',
        'orbit-reverse': 'orbit-reverse linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3.5s ease-in-out infinite',
        drift: 'drift 30s linear infinite alternate',
        'spin-slow': 'spin-slow 40s linear infinite',
        rise: 'rise 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
}
