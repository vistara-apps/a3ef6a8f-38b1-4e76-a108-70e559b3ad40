/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 70%, 50%)',
        accent: 'hsl(130, 70%, 50%)',
        // Dark mode colors
        bg: 'hsl(220, 15%, 10%)',
        surface: 'hsl(220, 15%, 15%)',
        'text-primary': 'hsl(220, 10%, 95%)',
        'text-secondary': 'hsl(220, 10%, 70%)',
        // Light mode colors
        'bg-light': 'hsl(220, 20%, 98%)',
        'surface-light': 'hsl(220, 20%, 95%)',
        'text-primary-light': 'hsl(220, 15%, 15%)',
        'text-secondary-light': 'hsl(220, 10%, 40%)',
        // F1 brand colors (consistent across themes)
        'f1-red': '#e10600',
        'f1-blue': '#0090ff',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0, 0%, 0%, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #0090ff, 0 0 10px #0090ff, 0 0 15px #0090ff' },
          '100%': { boxShadow: '0 0 10px #0090ff, 0 0 20px #0090ff, 0 0 30px #0090ff' },
        }
      }
    },
  },
  plugins: [],
}
