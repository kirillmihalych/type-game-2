/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[class="dark-mode"]'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospaced'],
        serif: ['Roboto Serif', 'serif'],
        sans: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
