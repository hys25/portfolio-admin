/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto'],
        fancy: ['Caveat'],
      },
      colors: {
        white: '#FFFFFF',
        black: '#101011',
        grey: '#A8A8A8',
        greyDark: '#323130',
        error: '#ff0033',
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
      },
    },
  },
  plugins: [],
}
