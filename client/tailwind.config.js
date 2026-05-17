/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#001c1d",
        "on-primary": "#ffffff",
        "primary-container": "#e0f2f2",
        "on-primary-container": "#001c1d",
        "secondary": "#ffc55b",
        "on-secondary": "#001c1d",
        "secondary-container": "#fff4e0",
        "on-secondary-container": "#7d5800",
        "surface": "#ffffff",
        "on-surface": "#191c1e",
        "surface-variant": "#f3f4f6",
        "on-surface-variant": "#404848",
        "background": "#ffffff",
        "on-background": "#191c1e",
        "outline": "#717978",
        "outline-variant": "#c0c8c8",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "surface-container": "#f9fafb",
        "surface-container-low": "#f9fafb",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e1e2e4",
        "surface-container-high": "#f3f4f6",
        "surface-dim": "#d9dadc",
        "surface-bright": "#ffffff",
        "inverse-surface": "#191c1e",
        "inverse-on-surface": "#f0f1f3",
        "inverse-primary": "#a3cfcf",
        "surface-tint": "#001c1d",
      },
      fontFamily: {
        "notoSerif": ["Noto Serif", "serif"],
        "manrope": ["Manrope", "sans-serif"],
        "headline": ["Noto Serif"],
        "body": ["Manrope"],
        "label": ["Manrope"]
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
    },
  },
  plugins: [],
}
