/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        dark_gray: 'hsl(var(--very--dark--gray))',
        gray: 'hsl(var(--dark--gray))'
      },
      backgroundImage:{
        hero:"url(/src/ip-address-tracker-master/images/pattern-bg.png)"
      },
      fontFamily:{
        rubik:['Rubik']
      }
    },
  },
  plugins: [],
}
