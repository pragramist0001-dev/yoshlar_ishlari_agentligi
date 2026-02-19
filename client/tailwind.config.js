/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1E3A8A",
                "primary-light": "#2563EB",
                secondary: "#64748B",
                accent: "#EAB308",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
            },
        },
    },
    plugins: [],
}
