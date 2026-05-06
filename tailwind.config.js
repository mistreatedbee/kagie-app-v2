
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914',
          hover: '#CC0812',
          light: '#FFEBEB',
        },
        dark: '#111827',
        background: '#F5F6FA',
        border: '#E5E7EB',
        accent: {
          orange: '#FF5A1F',
          yellow: '#FFD24C',
          blue: '#2F9BFF',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
