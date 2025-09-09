import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS custom properties
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Core theme colors
        primary: {
          DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
          950: "var(--accent-950)",
        },
        
        // Surface and UI colors
        surface: "var(--surface)",
        'surface-elevated': "var(--surface-elevated)",
        'surface-hover': "var(--surface-hover)",
        
        // Text colors
        'text-primary': "var(--text-primary)",
        'text-secondary': "var(--text-secondary)",
        'text-muted': "var(--text-muted)",
        
        // Border and input colors
        border: "var(--border)",
        'border-subtle': "var(--border-subtle)",
        input: "var(--input)",
        ring: "var(--ring)",
        
        // Status colors
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
        
        // F1 Brand colors (theme-aware)
        'f1-red': "var(--f1-red)",
        'f1-blue': "var(--f1-blue)",
        
        // Retro futuristic colors
        neon: {
          pink: "var(--neon-pink)",
          cyan: "var(--neon-cyan)",
          purple: "var(--neon-purple)",
          green: "var(--neon-green)",
          yellow: "var(--neon-yellow)",
        },
        
        // Chart colors
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        
        // Legacy support
        muted: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-muted)",
        },
        destructive: {
          DEFAULT: "var(--error)",
          foreground: "var(--text-primary)",
        },
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'neon': 'var(--shadow-neon)',
        'neon-strong': 'var(--shadow-neon-strong)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow": {
          '0%': { 
            boxShadow: '0 0 5px var(--neon-cyan), 0 0 10px var(--neon-cyan), 0 0 15px var(--neon-cyan)' 
          },
          '100%': { 
            boxShadow: '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan)' 
          },
        },
        "pulse-neon": {
          '0%, 100%': { 
            opacity: '1',
            filter: 'brightness(1) saturate(1)'
          },
          '50%': { 
            opacity: '0.8',
            filter: 'brightness(1.2) saturate(1.5)'
          },
        },
        "scan-line": {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        "theme-transition": {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scan-line 3s linear infinite",
        "theme-transition": "theme-transition 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
