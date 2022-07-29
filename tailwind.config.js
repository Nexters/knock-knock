/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderColor: {
      DEFAULT: 'black',
    },
    colors: {
      bgColor: '#18191F',
      cardBg: '#2B2F37',
      textGray: '#BABABC',
      white: '#FFF',
      from: '#16C674',
      to: '#28D899',
      kakao: '#FEE500',
    },
    screens: {
      xs: '375px',
      sm: '390px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/colors/themes')['[data-theme=dark]'],
          primary: '#16C674',
          'primary-content': '#FFFFFF',
          neutral: '#46474C',
          secondary: '#FFFFFF',
          'secondary-content': '#28D899',
          'primary-focus': '#28D899',
          'neutral-content': '#7F6AFF',
        },
      },
      'dark',
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
