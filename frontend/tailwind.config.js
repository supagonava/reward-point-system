/** @type {import('tailwindcss').Config} */
export default {
    content: ["./components/**/*.{vue,js}", "./layouts/**/*.{vue,js}", "./pages/**/*.{vue,js}", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#d92040",
                secondary: "#212121",
                lola: "#ddced1",
                "careys-pink": "#cd959d",
            },
        },
    },
    plugins: [],
};
