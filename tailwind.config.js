/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-green': '#d8f3dc',
        'medium-green': '#b7e4c7',
        'dark-green': '#1b4332',
        'nyanza': '#d8f3dcff',
        'celadon': '#b7e4c7ff',
        'celadon-2': '#95d5b2ff',
        'mint': '#74c69dff',
        'mint-2': '#52b788ff',
        'sea-green': '#40916cff',
        'dartmouth-green': '#2d6a4fff',
        'brunswick-green': '#1b4332ff',
        'dark-green-2': '#081c15ff',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'radial-light': 'radial-gradient(#b7e4c7ff 1px, transparent 1px)',
        'radial-dark': 'radial-gradient(#1b4332ff 1px, transparent 1px)',
        'dotted-pattern': 'radial-gradient(circle, #b7e4c7 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}