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
        new:'#e8eefc',
        three:'#bae8e8',
        // light:'#edf2fb',

        
      },
      
    },

  },
  plugins: [],
}
