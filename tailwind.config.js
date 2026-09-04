const themeColor = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        body: ['"Manrope Variable"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: themeColor('primary-50'),
          100: themeColor('primary-100'),
          200: themeColor('primary-200'),
          300: themeColor('primary-300'),
          400: themeColor('primary-400'),
          500: themeColor('primary-500'),
          600: themeColor('primary-600'),
          700: themeColor('primary-700'),
          800: themeColor('primary-800'),
          900: themeColor('primary-900'),
        },
        dark: {
          50: themeColor('dark-50'),
          100: themeColor('dark-100'),
          200: themeColor('dark-200'),
          300: themeColor('dark-300'),
          400: themeColor('dark-400'),
          500: themeColor('dark-500'),
          600: themeColor('dark-600'),
          700: themeColor('dark-700'),
          800: themeColor('dark-800'),
          900: themeColor('dark-900'),
        },
        accent: {
          50: themeColor('accent-50'),
          100: themeColor('accent-100'),
          200: themeColor('accent-200'),
          300: themeColor('accent-300'),
          400: themeColor('accent-400'),
          500: themeColor('accent-500'),
          600: themeColor('accent-600'),
          700: themeColor('accent-700'),
          800: themeColor('accent-800'),
          900: themeColor('accent-900'),
        },
        gray: {
          50: themeColor('gray-50'),
          100: themeColor('gray-100'),
          200: themeColor('gray-200'),
          300: themeColor('gray-300'),
          400: themeColor('gray-400'),
          500: themeColor('gray-500'),
          600: themeColor('gray-600'),
          700: themeColor('gray-700'),
          800: themeColor('gray-800'),
          900: themeColor('gray-900'),
        },
        white: themeColor('white'),
        black: themeColor('black'),
        // Label colour for a solid brand fill. Does not invert: a primary
        // button is dark in both themes, so `text-white` would go unreadable
        // in light mode where the white token becomes ink.
        onPrimary: themeColor('on-primary'),
        // The mock CLI stays dark in both themes — see index.css.
        term: {
          bg: themeColor('term-bg'),
          bar: themeColor('term-bar'),
          border: themeColor('term-border'),
          ink: themeColor('term-ink'),
          muted: themeColor('term-muted'),
          accent: themeColor('term-accent'),
        },
      },
    },
  },
  plugins: [],
}
