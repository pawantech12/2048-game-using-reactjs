/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        move: {
          "0%": { transform: "translate(0, 0)" },
          "100%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y))",
          },
        },
        merge: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        appear: "appear 0.3s ease-in-out",
        move: "move 0.5s ease-in-out",
        merge: "merge 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
