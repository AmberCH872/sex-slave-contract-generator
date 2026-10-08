/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          900: '#1a1a2e',
          800: '#16213e',
          700: '#0f3460',
          600: '#533483',
        },
        'gold': {
          400: '#ffd700',
          500: '#ffed4a',
          600: '#e6c200',
        }
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
        'sans': ['"Lato"', 'Arial', 'sans-serif'],
        'display': ['"Cinzel"', 'Impact', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'bdsmpattern': "repeating-linear-gradient(45deg, #1a1a2e 0, #1a1a2e 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #1a1a2e 0, #1a1a2e 1px, transparent 0, transparent 50%)",
      }
    },
  },
  plugins: [],
}
