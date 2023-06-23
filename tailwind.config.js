/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f6fb',
          100: '#e4e8f5',
          200: '#d0d9ed',
          300: '#afbfe1',
          400: '#899ed1',
          500: '#6c81c5',
          600: '#5969b7',
          700: '#4e59a7',
          800: '#484e90',
          900: '#3b406d',
          950: '#272a44',
          DEFAULT: '#5969b7',
        },
      },
    },
  },
  plugins: [],
};
