/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        'h-13': '3.25rem'
      },
      colors:{
        'black-reddit': '#1a1a1b',
        'white-reddit': '#d7dadc',
        'gray-reddit': '#758284',
        'grayblack-reddit' : '#272729'
      }
    },
  },
  plugins: [],
}