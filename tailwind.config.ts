import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: '#3ad3b7',
        veryDarkBlue: '#091a31',
        veryLightGray: '#f0f0f0',
        lightGray: '#d9d9d9',
        mediumGray: '#e4e4e4',
        placeholderGray: '#a6acb6',
        cancelRed: '#e62719',
      },
      spacing: {
        "85P": '85%',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
