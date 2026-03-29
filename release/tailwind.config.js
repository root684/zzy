/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001b4d',
        secondary: '#00e5ff',
        accent: '#ff6b00',
        success: '#00ff88',
        warning: '#ffaa00',
        danger: '#ff3d71',
        info: '#00b0ff',
        error: '#ff4757',
        dark: {
          DEFAULT: '#0a0e17',
          light: '#121a2e',
          lighter: '#1e293b',
          lightest: '#334155',
        },
        neon: {
          blue: '#00e5ff',
          orange: '#ff6b00',
          green: '#00ff88',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 229, 255, 0.1), 0 2px 4px -1px rgba(0, 229, 255, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 229, 255, 0.2), 0 4px 6px -2px rgba(0, 229, 255, 0.15)',
        'neon-blue': '0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff',
        'neon-orange': '0 0 5px #ff6b00, 0 0 10px #ff6b00, 0 0 15px #ff6b00',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'glow': 'box-shadow',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)",
        'radial-gradient': "radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, rgba(10, 14, 23, 0) 70%)",
      },
      backgroundSize: {
        'grid-pattern': '20px 20px',
      },
    },
  },
  plugins: [],
}