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
        primary:'#272343',
        new:'rgba(227, 246, 245, 0.4)',
        three:'#bae8e8',

        
      },
      
    },

  },
  plugins: [],
}
