/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        Bookstheme: {
          primary: '#133913',
          secondary: '#00802b',
          accent: "#334d4d",
          neutral: "#e0ebeb",
          'base-100': "#FFFFFF"
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
