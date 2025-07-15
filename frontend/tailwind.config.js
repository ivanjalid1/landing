/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Colores principales
        primary: {
          blue: '#2563eb',
          orange: '#f97316',
          dark: '#1e293b',
        },
        light_blue: {
          DEFAULT: '#eaf6ff',
          100: '#f7fbff',
          200: '#eaf6ff',
          300: '#c6e6ff',
          400: '#8ecaff',
          500: '#5eb6ff',
          600: '#2ea2ff',
          700: '#008cff',
          800: '#0070cc',
          900: '#005599',
        },
        // Paleta personalizada
        navy_blue: {
          DEFAULT: '#050C77',
          100: '#010218',
          200: '#02052f',
          300: '#030747',
          400: '#040a5e',
          500: '#050c77',
          600: '#0814c0',
          700: '#202ef6',
          800: '#6a74f9',
          900: '#b5b9fc',
        },
        jordy_blue: {
          DEFAULT: '#8CB9EE',
          100: '#0a2442',
          200: '#144883',
          300: '#1d6cc5',
          400: '#4a92e4',
          500: '#8cb9ee',
          600: '#a3c7f1',
          700: '#bad5f5',
          800: '#d1e3f8',
          900: '#e8f1fc',
        },
        palatinate_blue: {
          DEFAULT: '#253BDD',
          100: '#070b2d',
          200: '#0e175a',
          300: '#152287',
          400: '#1c2eb4',
          500: '#253bdd',
          600: '#5263e4',
          700: '#7d8aeb',
          800: '#a9b1f2',
          900: '#d4d8f8',
        },
        byzantine_blue: {
          DEFAULT: '#2355E0',
          100: '#07112e',
          200: '#0d225b',
          300: '#143389',
          400: '#1a44b6',
          500: '#2355e0',
          600: '#5078e6',
          700: '#7c9aec',
          800: '#a8bcf3',
          900: '#d3ddf9',
        },
        resolution_blue: {
          DEFAULT: '#0B2194',
          100: '#02071d',
          200: '#040d3b',
          300: '#071458',
          400: '#091b76',
          500: '#0b2194',
          600: '#1031d4',
          700: '#3b59f0',
          800: '#7c90f5',
          900: '#bec8fa',
        },
        // Colores de apoyo
        secondary: {
          cyan: '#06b6d4',
          purple: '#8b5cf6',
        },
        // Estados
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        // Neutros personalizados
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          600: '#475569',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
        'gradient-cta': 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        'gradient-hero-tech': 'linear-gradient(135deg, #050C77 0%, #8CB9EE 25%, #253BDD 50%, #2355E0 75%, #0B2194 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      },
      animation: {
        'shine': 'shine 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'cta': '0 8px 25px rgba(249, 115, 22, 0.4)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}; 