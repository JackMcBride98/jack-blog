module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{html,js,mdx,jsx,tsx}',
    './components/**/*.{html,js,mdx,jsx,tsx}',
  ],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
