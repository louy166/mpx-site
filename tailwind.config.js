/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005A2E',
          light: '#007A3E',
          dark: '#003D1A',
          50: '#E6F5ED',
          100: '#CCE9DA',
          200: '#99D3B5',
          500: '#005A2E',
          600: '#004D27',
          700: '#003D1A',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFE44D',
          dark: '#CCB100',
        },
        surface: '#F8F9FA',
        border: '#E5E7EB',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
