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
          bg: "#0a0a0a",
          dark: "#1a1a1a",
          border: "#00ff00",
          accent: "#ff00ff",
          secondary: "#00ffff",
          text: "#ffffff",
        },
      },
      fontFamily: {
        mono: ["Courier New", "monospace"],
      },
      backgroundColor: {
        "cyber-dark": "#0a0a0a",
      },
      textColor: {
        cyber: "#00ff00",
      },
      borderColor: {
        cyber: "#00ff00",
      },
    },
  },
  plugins: [],
};
export default config;
