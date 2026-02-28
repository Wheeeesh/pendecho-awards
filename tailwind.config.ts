import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        poly: {
          red:   "#D04530",   // primary — matches POLY-8 background
          dark:  "#1C0800",   // deep red-black
          mid:   "#B83D28",   // slightly darker red for contrast
          white: "#FFFFFF",
          screen:"#F2EDE6",   // off-white "screen" panel
          dim:   "rgba(255,255,255,0.55)",  // muted white text
          line:  "rgba(255,255,255,0.25)",  // divider lines
        },
      },
      fontFamily: {
        display: ["var(--font-barlow-condensed)", "sans-serif"],
        body:    ["var(--font-barlow)", "sans-serif"],
      },
      boxShadow: {
        "poly-btn": "0 0 0 2px #FFFFFF",
      },
    },
  },
  plugins: [],
};

export default config;
