/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./.vitepress/**/*.{js,ts,vue}",
    "./.vitepress/theme/**/*.{js,ts,vue,css}",
    "./**/*.md"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}