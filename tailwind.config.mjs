/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1f3b61",
                "secondary": "#FFB703",
                "background-light": "#f6f7f8",
                "background-dark": "#14181e",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"]
            },
            borderRadius: {
                "lg": "0.5rem",
                "xl": "0.75rem"
            }
        },
    },
    plugins: [
        require('@tailwindcss/container-queries'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
