/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'emotion-happy': '#FFD700',
        'emotion-sad': '#1E90FF',
        'emotion-angry': '#FF4500',
        'emotion-neutral': '#C0C0C0',
        'emotion-excited': '#7FFF00',
      },
    },
  },
  plugins: [],
}
