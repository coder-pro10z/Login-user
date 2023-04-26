/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        rubik:['Rubik', 'sans-serif'],
       },
      colors:{
        primary:'rgb(1, 122, 243)',
      },
      
    },

  },
  plugins: [],
}
