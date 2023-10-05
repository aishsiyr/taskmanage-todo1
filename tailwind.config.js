// tailwind.config.js
const montserrat = ["Montserrat", "sans"];
const jetbrainsMono = ["JetBrains Mono", "monospace"];

module.exports = {
  theme: {
      screens: {
        xl: { min: "1279px" },
        lg: { min: "1023px" },
        md: { min: "767px" },
        sm: { min: "639px" },
      },
    extend: {
      fontFamily: {
        sans: montserrat, // Replace sourceSansPro with Montserrat
        mono: jetbrainsMono, // Add JetBrains Mono font family
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
};
