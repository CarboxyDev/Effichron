/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        dark: colors.zinc,
      },
      spacing: {
        15: '60px',
        17: '68px',
        18: '72px',
        19: '76px',
        22: '88px',
        25: '100px',
        26: '104px',
        30: '120px',
        50: '200px',
        70: '280px',
        84: '336px',
        88: '352px',
        90: '360px',
        100: '400px',
        104: '416px',
        108: '432px',
        112: '448px',
        116: '464px',
        120: '480px',
        125: '500px',
        130: '520px',
        140: '560px',
        150: '600px',
        160: '640px',
        170: '680px',
        180: '720px',
        190: '760px',
        200: '800px',
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-debug-screens')],
};
