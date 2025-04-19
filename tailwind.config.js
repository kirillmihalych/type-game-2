/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[class="dark-mode"]'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        mono: ['PT Mono', 'monospaced'],
        serif: ['PT Serif', 'serif'],
        sans: ['PT Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
