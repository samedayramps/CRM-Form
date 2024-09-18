const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ebfd2a',
        'primary-dark': '#d9eb1e',
      },
      // Remove the fontFamily definition if it exists
      fontSize: {
        'input': '0.9375rem', // 15px
        'button': '1.0625rem', // 17px
      },
      padding: {
        'input': '0.75rem 1rem',
        'button': '1rem 1.5rem',
      },
      spacing: {
        'form-element': '0.75rem',
        'form-group': '1.5rem',
        'form-section': '2rem',
      },
    },
  },
  plugins: [],
};