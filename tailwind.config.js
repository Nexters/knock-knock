/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderColor: {
      DEFAULT: 'black',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
