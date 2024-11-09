/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-100": "#FFE1E0",
        "primary-300": "#FFA6A3",
        "primary-500": "#FF6B66",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFC132",
        "maroon": "#A83332",
        "gold" : "#F8BD00",
        "gray": "#636363",
        "light-green" : "#DBFA29",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: {
        abstractwaves: "url('./assets/AbstractWaves.png')",
        sparkles: "url('./assets/Sparkles.png')",
        circles: "url('./assets/Circles.png')",
        citutext: "url('./assets/CITU.png')",
        event: "url('./assets/EVENT.png')",
        tracker: "url('./assets/TRACKER.png')",
      },
    },
    screens: {
      xs: "320px",
      sm: "768px",
      md: "1060px",

      
      small: "768px",
      medium: "1060px",
      large: "1200px",
      xl: "1440px",
      xxl: "1600px",
      xxxl: "1920px",


    },
  },
  plugins: [],
};
