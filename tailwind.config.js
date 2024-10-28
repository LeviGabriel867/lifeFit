/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',         // Inclua o HTML principal se estiver no root
    './src/**/*.{html,js,jsx,ts,tsx}',  // Inclua todos os arquivos relevantes na pasta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
