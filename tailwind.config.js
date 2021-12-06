const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        lime: colors.lime,
        teal: colors.teal,
        emerald: colors.emerald,
        cyan: colors.cyan,
        sky: colors.sky,
        primary: {
          100: colors.gray[800],
          200: colors.gray[900],
        },
        secondary: colors.lime[300],
        tertiary: colors.indigo[300],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
