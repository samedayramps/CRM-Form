const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ebfd2a',
        'primary-dark': '#d9eb1e',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'input': '1.125rem', // 18px
        'button': '1.25rem', // 20px
      },
      padding: {
        'input': '0.75rem 1rem',
        'button': '1rem 1.5rem',
      },
    },
  },
  plugins: [],
};