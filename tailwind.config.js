/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
   content: ['./**.{html,js}', './**/**.htm'],
   darkMode: 'class',
   theme: {
      fontFamily: {
         oswald: ['Oswald'],
         playfair: ['Playfair Display'],
      },
      extend: {
         screens: {
            sm: '40rem',
            md: '48rem',
            lg: '64rem',
            528: '33rem',
         },
      },
   },
   plugins: [
      plugin(function ({ addVariant }) {
         addVariant('active', '&.active');
         addVariant('menu-open', '.menu-open &');
         addVariant('lock', '.lock &');
         addVariant('submitted', '&.submitted');
         addVariant('scrolled', '.scrolled &');
      }),
   ],
};
