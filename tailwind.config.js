/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "320px", // => @media (min-width: 320px) { Movil }
      md: "768px", // => @media (min-width: 768px) { Tablet }
      lg: "1024px", // => @media (min-width: 1024px) { Pant-Pequeña }
      xl: "1280px", // => @media (min-width: 1280px) { Pant-Mediana }
      "2xl": "1536px", // => @media (min-width: 1536px) { Pant-Grande }
    },
    colors: {
      black: "#191A1F", // Color Principal
      white: "#b0abab", // Color texto
      whiteOpacity: "#b0abab7f", // Color texto
      red: "#FD3C3D", //Color contraste
      redOpacity: "#fd3c3da8", //Color contraste
      grey: "#F5F7F914", // Color Card
      lime: "#65a30d", // Color check OK
    },
  },
  plugins: [],
};
