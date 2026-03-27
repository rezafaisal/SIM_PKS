const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#ffffff",
        dark: {
          50: "#C1C2C5",
          100: "#A6A7AB",
          200: "#909296",
          300: "#5C5F66",
          400: "#373A40",
          500: "#2C2E33",
          600: "#25262B",
          700: "#1A1B1E",
          800: "#141517",
          900: "#101113",
        },
        gray: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#868E96",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
        red: {
          50: "#FFF5F5",
          100: "#FFE3E3",
          200: "#FFC9C9",
          300: "#FFA8A8",
          400: "#FF8787",
          500: "#FF6B6B",
          600: "#FA5252",
          700: "#F03E3E",
          800: "#E03131",
          900: "#C92A2A",
        },
        blue: {
          50: "#E7F5FF",
          100: "#D0EBFF",
          200: "#A5D8FF",
          300: "#74C0FC",
          400: "#4DABF7",
          500: "#339AF0",
          600: "#228BE6",
          700: "#1C7ED6",
          800: "#1971C2",
          900: "#1864AB",
        },
        green: {
          50: "#EBFBEE",
          100: "#D3F9D8",
          200: "#B2F2BB",
          300: "#8CE99A",
          400: "#69DB7C",
          500: "#51CF66",
          600: "#40C057",
          700: "#37B24D",
          800: "#2F9E44",
          900: "#2B8A3E",
        },
        orange: {
          50: "#FFF4E6",
          100: "#FFE8CC",
          200: "#FFD8A8",
          300: "#FFC078",
          400: "#FFA94D",
          500: "#FF922B",
          600: "#FD7E14",
          700: "#F76707",
          800: "#E8590C",
          900: "#D9480F",
        },
        yellow: {
          50: "#FFF9DB",
          100: "#FFF3BF",
          200: "#FFEC99",
          300: "#FFE066",
          400: "#FFD43B",
          500: "#FCC419",
          600: "#FAB005",
          700: "#F59F00",
          800: "#F08C00",
          900: "#E67700",
        },
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      boxShadow: {
        DEFAULT: "0 2px 6px 0 rgb(67 89 113 / 0.12)",
        sm: "0 0.125rem 0.375rem 0 rgb(161 172 184 / 0.12",
        md: "0 2px 6px 0 rgb(67 89 113 / 0.12)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        );
      });
    }),
  ],
};
