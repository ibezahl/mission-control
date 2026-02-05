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
        cyber: {
          bg: "#F6F4F0",
          dark: "#FFFFFF",
          border: "#D7D1C7",
          accent: "#3E4E68",
          secondary: "#5E6A64",
          text: "#2E2A26",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundColor: {
        "cyber-dark": "#FFFFFF",
      },
      textColor: {
        cyber: "#3E4E68",
      },
      borderColor: {
        cyber: "#D7D1C7",
      },
    },
  },
  plugins: [],
};
export default config;
