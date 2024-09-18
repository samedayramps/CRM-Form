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
        'input': '0.9375rem', // 15px
        'button': '1.0625rem', // 17px
      },
      padding: {
        'input': '0.625rem 0.875rem',
        'button': '0.875rem 1.25rem',
      },
    },
  },
  plugins: [],
};