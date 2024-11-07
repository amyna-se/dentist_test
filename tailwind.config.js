/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'source-code': ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#bf00ff',
        'neon-pink': '#ff00f7',
        'neon-green': '#00ff9d',
        primary: {
          DEFAULT: '#00f3ff',
          light: '#4dffff',
          dark: '#00c4cc',
        },
        accent: {
          purple: '#bf00ff',
          pink: '#ff00f7',
          green: '#00ff9d',
        },
        dark: {
          DEFAULT: '#0a0a0f',
          light: '#16161f',
          lighter: '#1e1e2d',
        },
      },
      boxShadow: {
        'glow-sm': '0 2px 8px -1px rgba(0, 243, 255, 0.15)',
        'glow-md': '0 4px 16px -2px rgba(0, 243, 255, 0.2)',
        'glow-lg': '0 8px 24px -4px rgba(0, 243, 255, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-card': 'linear-gradient(180deg, rgba(22, 22, 31, 0) 0%, rgba(22, 22, 31, 0.9) 100%)',
      },
    },
  },
  plugins: [],
};