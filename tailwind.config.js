/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paw: {
          dark: '#352018',
          darker: '#26160e',
          brown: '#4a2e1b',
          lightBrown: '#6b442b',
          tile: '#b87d55',
          tileBorder: '#a36c45',
          cream: '#fbf6f0',
          cardCream: '#faefe4',
          badgePeach: '#faebd7',
          accentBlue: '#3d97ca',
          alertRed: '#d94141',
          successGreen: '#3aa866',
          warningAmber: '#ea8e24'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Nunito', 'system-ui', 'sans-serif'],
        fredoka: ['Fredoka', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'hero': '0 24px 50px rgba(53, 32, 24, 0.16), 0 6px 12px rgba(53, 32, 24, 0.08)',
        'card': '0 10px 30px rgba(74, 46, 27, 0.08)',
        'card-hover': '0 18px 40px rgba(74, 46, 27, 0.14)',
        'pill': '0 4px 14px rgba(74, 46, 27, 0.15)',
      }
    },
  },
  plugins: [],
}
