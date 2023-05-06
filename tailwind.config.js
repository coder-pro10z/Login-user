/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        rubik:['Rubik', 'sans-serif'],
        no:['Poppins'],
       },
      colors:{
        primary:'rgb(1, 122, 243)',
        fade:'#AFD3E2',
        
      },
      
    },

  },
  plugins: [],
}
