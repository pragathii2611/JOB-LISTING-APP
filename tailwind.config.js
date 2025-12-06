/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Matches the "Jobseeker" purple/blue branding
        primary: {
          DEFAULT: '#4F46E5', // Indigo-600
          hover: '#4338CA',   // Indigo-700
          light: '#EEF2FF',   // Indigo-50
        }
      }
    },
  },
  plugins: [],
}