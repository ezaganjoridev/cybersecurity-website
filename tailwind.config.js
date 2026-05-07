/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Emerald/Neon primary (speed, 'go')
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#2d3342',
          800: '#171c26',
          900: '#0e1117', // Very deep gray-violet
        },
        accent: {
          100: '#f3e8ff',
          300: '#d8b4fe',
          500: '#a855f7', // Electric Violet (tech, contrast)
          600: '#9333ea',
          700: '#7e22ce',
        },
      },
    },
  },
  plugins: [],
}
