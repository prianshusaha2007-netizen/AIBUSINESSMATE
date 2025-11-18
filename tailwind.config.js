/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B1120',
        primary: {
          DEFAULT: '#10B981', // Emerald 500
          hover: '#059669', // Emerald 600
        },
        card: '#1E293B', // Slate 800
        'card-foreground': '#CBD5E1', // Slate 300
        foreground: '#F8FAFC', // Slate 50
        muted: '#94A3B8', // Slate 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
