/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./presentations/**/*.html",
    "./presentations/**/*.js",
  ],
  safelist: [
    'bg-blue-600', 'border-blue-400',
    'bg-green-600', 'border-green-400',
    'bg-yellow-600', 'border-yellow-400',
    'bg-purple-600', 'border-purple-400',
    'bg-red-600', 'border-red-400',
    'bg-indigo-600', 'border-indigo-400',
    'bg-pink-600', 'border-pink-400',
    'bg-teal-600', 'border-teal-400',
    'bg-orange-600', 'border-orange-400',
    'bg-cyan-600', 'border-cyan-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
