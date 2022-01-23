module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
