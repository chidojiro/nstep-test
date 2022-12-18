/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        expand: {
          '0%': { transform: 'scale(90%, 90%)' },
          '100%': { transform: 'scale(100%, 100%)' },
        },
        shrink: {
          '0%': { transform: 'scale(100%, 100%)' },
          '100%': { transform: 'scale(90%, 90%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in .1s ease-in-out',
        'fade-out': 'fade-out .1s ease-in-out',
        expand: 'expand .1s ease-in-out',
        shrink: 'shrink .1s ease-in-out',
      },
    },
  },
  plugins: [],
};
