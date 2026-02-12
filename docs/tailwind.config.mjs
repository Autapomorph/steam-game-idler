/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'icon-light': '#ecececff',
        'icon-dark': '#2f2f2fff',
      },
      textColor: {
        'icon-light': '#000000ff',
        'icon-dark': '#ffffffff',
      },
      borderColor: {
        'border-light': '#d4d4d4ff',
        'border-dark': '#292929ff',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
};

export default config;
