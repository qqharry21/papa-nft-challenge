/** @format */

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: { max: '425px' },
      md: { max: '768px' },
      lg: { max: '1024px' },
      xl: { max: '1280px' },
    },
    extend: {},
  },
  plugins: [],
};
