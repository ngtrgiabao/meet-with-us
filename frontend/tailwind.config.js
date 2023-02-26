/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
                "auto-fit-100": "repeat(auto-fit, minmax(100px, 1fr))",
            },
        },
    },
    plugins: [],
};
