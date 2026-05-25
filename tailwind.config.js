/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        primary: '#1a56db',
        'primary-dark': '#1e40af',
        'primary-light': '#EFF4FF',
        wfm: '#7c3aed',
        'wfm-light': '#f5f3ff',
        success: '#16a34a',
        warning: '#d97706',
        danger: '#dc2626',
        surface: '#f0f1f4',
      },
    },
  },
  plugins: [],
}
