/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16c5bb',
          dark: '#0fa39b',
          light: '#4dd4cc'
        },
        secondary: {
          DEFAULT: '#02152b',
          light: '#0a2a4a',
          dark: '#010e1a'
        },
        accent: '#333333'
      },
      fontFamily: {
        'lexend': ['Lexend Exa', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
