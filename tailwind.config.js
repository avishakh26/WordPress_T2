/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Inter', 'system-ui', 'sans-serif'],
        montserrat: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#EC4899', // Pink theme
        primaryDark: '#DB2777',
        secondary: '#222222', // Dark text/bg
        accent: '#61CE70', // Green accent
        textMain: '#666666',
        textMuted: '#999999',
      }
    }
  },
  plugins: [],
}
