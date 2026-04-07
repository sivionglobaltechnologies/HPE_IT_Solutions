/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                hpe: {
                    navy: '#0a0e1a',
                    'navy-light': '#12182b',
                    cyan: '#00e5ff',
                    'cyan-dark': '#008fa3',
                    orange: '#ff6d00',
                    'orange-dark': '#cc5600',
                },
                'navy-900': '#011b26',
                'navy-950': '#0a0e1a',
                'brand-orange': '#ff8d00',
                'brand-cyan': '#00b0d4',
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'orbitron': ['Outfit', 'sans-serif'],
                'rajdhani': ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(0,229,255,0.4))' },
                    '50%': { filter: 'drop-shadow(0 0 25px rgba(0,229,255,0.8))' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}

