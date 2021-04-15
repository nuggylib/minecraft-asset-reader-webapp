module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: `2rem`
    },
    extend: {
      backgroundImage: theme => ({
        'dirt-pattern': "url('./img/dirt.jpg')",
        'stone-pattern': "url('./img/stone.jpg')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
