/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./admin/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./admin/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./admin/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./admin/assets/**/*.{js,ts,jsx,tsx,mdx}",


    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: ["var(--font-dmSans)", ...fontFamily.sans],
      secondary: ["var(--font-barlow)", ...fontFamily.sans],
      accent: ["var(--font-alexandria)", ...fontFamily.sans],
    },
    extend: {
      colors: {
        primary: "#121315",
        secondary: "#666666",
        accent: "  #fbcc0c",
        accentdark: "#ca8a04",
        border: "  #d7d7d7",
      },
      boxShadow: {
        custom: " 0px 4px 54px 10px rgba(18, 19, 21, 0.06)",
      },
      backgroundImage: {
        hero: "url('/admin/assets/img/hero/bg.jpg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
