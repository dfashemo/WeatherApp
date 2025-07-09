
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  // extend  default theme to add fonts, colors, etc.
  theme: {
    extend: {
      fontFamily: {
        // use Inter as default sans-serif
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        sky: {
          light: '#E0F2FE',
          DEFAULT: '#0E7490',
          dark: '#035E7B',
        },
        sun: {
          light: '#FFF7CD',
          DEFAULT: '#FCD34D',
          dark: '#FBBF24',
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
