/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '13': '3.25rem'
      },
      colors: {
        'black-reddit': '#1a1a1b',
        'black2-reddit': '#1d1d1e',
        'white-reddit': '#ffffff',
        'gray-reddit': '#758284',
        'grayblack-reddit': '#272729',
        'graywhite-reddit': '#f6f7f8',
        'grayblack2-reddit': '#313133',
        'graywhite2-reddit': '#fafbfb'
      },
      backgroundImage: {
        'aurora': "url('/Aurora.jpg')",
        'banner': "url('/Banner.jpg')"
      }
    },
  },
  plugins: [],
}