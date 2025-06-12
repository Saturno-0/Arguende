/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Asegúrate de incluir tu HTML
    './src/**/*.{js,jsx,ts,tsx}', // Incluye los archivos JSX
  ],
  theme: {
    extend: {
      fontFamily: {
        consolas: ['Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}