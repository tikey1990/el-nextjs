/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      backgroundImage: () => ({
        "gradient-swipeable-cards":
          "radial-gradient(89.71% 130% at 50% -30%, rgba(192, 132, 252, 0.12) 0%, rgba(192, 132, 252, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)) !important",
        "gradient-white":
          "linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(255, 255, 255, 0) 100%);",
        "gradient-menu":
          "linear-gradient(90deg, rgba(0, 159, 231, 0.00) 0%, rgba(0, 159, 231, 0.08) 50%, rgba(0, 159, 231, 0.00) 100%)",
        "gradient-purple-mirror":
          "linear-gradient(93.97deg, #6875F5 0%, #9'3xl': '1600px',333EA 100%) !important",
        "wrapper-image": "url('/media/images/img-home-phone-mobile.png')",
        "gradient-bonus":
          "linear-gradient(90deg, #42389D 9.95%, #9333EA 50%, #EC7A36 89.12%)",
        "gradient-inst":
          "linear-gradient(45deg, #FFD600 8.39%, #FF0100 50%, #D800B9 91.61%)",
        "gradient-purple":
          "linear-gradient(93.97deg, #9333EA 0%, #6875F5 100%) !important",
        "gradient-telegram":
          "linear-gradient(180deg, #2AABEE 0%, #229ED9 99.26%)",
        "gradient-blue-hover":
          "linear-gradient(90deg, #7AD5FF 0%, #34B2EC 100%)",
        "gradient-twitter":
          "linear-gradient(180deg, #00ACEE 0%, #0193CC 99.26%)",
        "gradient-adv-white":
          "linear-gradient(180deg, #ffffff 0%, #d6eefa 100%)",
        "gradient-facebook":
          "linear-gradient(180deg, #3B5998 0%, #4567B0 100%)",
        "gradient-twitch":
          "linear-gradient(180deg, #8e2de2 0%, #6441a5 99.26%)",
        "gradient-blue-300": "linear-gradient(90deg, #8BDBFF 0%, #4DBCEE 100%)",
        "gradient-blue-400": "linear-gradient(90deg, #7AD5FF 0%, #34B2EC 100%)",
        "gradient-blue-500": "linear-gradient(90deg, #59CBFF 0%, #009FE7 100%)",
        "gradient-premium": "linear-gradient(93deg, #91CAFF 0%, #2562FF 100%)",
        "gradient-green": "linear-gradient(90deg, #58FF8B 0%, #00E75C 100%)",
        "gradient-gray": "linear-gradient(90deg, #E8EBF1 0%, #E8EBF1 5%)",
      }),
      boxShadow: {
        "button-purple": "0px 20px 25px -5px rgba(147, 51, 234, 0.4)",
        "before-adv-wrapper": "0 30px 60px rgba(13, 34, 79, 0.8);",
        "block-adv-wrapper": "0 30px 60px rgba(13, 34, 79, 0.8)",
        smallBlock: "0px 0px 12px 0px rgba(255, 255, 255, 0.30)",
        input: "0px 2px 6px 0px rgba(42, 45, 54, 0.06) inset",
        balanceHover: "0px 10px 20px rgba(0, 159, 231, 0.40)",
        window: "0px 60px 120px 0px rgba(13, 34, 79, 0.20)",
        content: "0px 30px 60px 0px rgba(13, 34, 79, 0.80)",
        button: "0px 20px 50px 0px rgba(0, 159, 231, 0.50)",
        serviceWarn: "0px 10px 20px rgba(0, 159, 231, 0.2)",
        select: "0px 10px 20px 0px rgba(13, 34, 79, 0.20)",
        block2: "0px 6px 12px 0px rgba(13, 34, 79, 0.06)",
        tooltip: "0px 4px 8px 0px rgba(13, 34, 79, 0.10)",
        block: "0px 8px 16px 0px rgba(13, 34, 79, 0.04)",
        balance: "0px 10px 20px rgba(0, 159, 231, 0.20)",
        "after-adv-wrapper": "0 30px 60px #0d224f",
      },
      colors: {
        // purple: {},
        gray: {
          700: "#FFFFFF07",
          300: "#A7B1BF",
          400: "#9BA5B6",
          600: "#373C3F",
          500: "#828FA4",
          200: "#E8EBF1",
        },
        // blue: {},
        primary: {
          300: "#59CBFF",
          400: "#33B2EC",
          500: "#009FE7",
          900: "#304A6E",
        },
        // zinc: {},
        green: {
          200: "#73F1EE",
          300: "#44EDE8",
          400: "#15E8E2",
        },
        // indigo: {},
        red: {
          400: "#FF5D5D",
          500: "#FF3535",
          600: "#FF0000",
        },
        yellow: {
          500: "#FFD600",
        },
        orange: {
          400: "#EA8C00",
        },
      },
      fontFamily: {
        "pn-extraboldit": ["ProximaNova-ExtraBoldIt", "sans-serif"],
        "pn-semiboldit": ["ProximaNova-SemiboldIt", "sans-serif"],
        "pn-regularit": ["ProximaNova-RegularIt", "sans-serif"],
        "pn-extrabold": ["ProximaNova-ExtraBold", "sans-serif"],
        "pn-semibold": ["ProximaNova-Semibold", "sans-serif"],
        "pn-regular": ["ProximaNova-Regular", "sans-serif"],
        "pn-boldit": ["ProximaNova-BoldIt", "sans-serif"],
        "pn-light": ["ProximaNova-Light", "sans-serif"],
        "pn-bold": ["ProximaNova-Bold", "sans-serif"],
      },
      keyframes: {
        view: {
          "100%": { opacity: 1 },
          "0%": { opacity: 0 },
        },
      },
      textShadow: {
        previewTitle: "0 2px 13px rgba(255, 255, 255, 0.32)",
      },
      borderRadius: {
        "4xl": "30px",
        "5xl": "35px",
      },
      transitionProperty: {
        bg: "background, background-color",
      },
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },
    },
    screens: {
      "2xl": "1535px",
      "3xl": "1600px",
      lg: "1024px",
      xl: "1279px",
      xxs: "300px",
      md: "767px",
      sm: "500px",
      xs: "380px",
      s: "426px",
    },
    container: {
      xl: "1200px",
    },
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    require("flowbite-react/tailwind").content(),
  ],
  plugins: [require("flowbite-react/tailwind").plugin()],
};
