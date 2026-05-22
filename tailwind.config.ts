import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--zai-color-bg-primary)',
        foreground: 'var(--zai-color-text-primary)',
        card: {
          DEFAULT: 'var(--zai-color-bg-card)',
          foreground: 'var(--zai-color-text-primary)'
        },
        popover: {
          DEFAULT: 'var(--zai-color-bg-elevated)',
          foreground: 'var(--zai-color-text-primary)'
        },
        primary: {
          DEFAULT: 'var(--zai-color-accent)',
          foreground: 'var(--zai-color-text-inverse)'
        },
        secondary: {
          DEFAULT: 'var(--zai-color-bg-secondary)',
          foreground: 'var(--zai-color-text-secondary)'
        },
        muted: {
          DEFAULT: 'var(--zai-color-bg-secondary)',
          foreground: 'var(--zai-color-text-muted)'
        },
        accent: {
          DEFAULT: 'var(--zai-color-accent-muted)',
          foreground: 'var(--zai-color-text-primary)'
        },
        destructive: {
          DEFAULT: 'var(--zai-color-status-offline)',
        },
        border: 'var(--zai-color-border-default)',
        input: 'var(--zai-color-border-default)',
        ring: 'var(--zai-color-border-focus)',
      },
      borderRadius: {
        lg: 'var(--zai-radius-lg)',
        md: 'var(--zai-radius-md)',
        sm: 'var(--zai-radius-sm)'
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'monospace'],
      },
      spacing: {
        'zai-1': 'var(--zai-space-1)',
        'zai-2': 'var(--zai-space-2)',
        'zai-3': 'var(--zai-space-3)',
        'zai-4': 'var(--zai-space-4)',
        'zai-5': 'var(--zai-space-5)',
        'zai-6': 'var(--zai-space-6)',
        'zai-8': 'var(--zai-space-8)',
        'zai-10': 'var(--zai-space-10)',
        'zai-12': 'var(--zai-space-12)',
        'zai-16': 'var(--zai-space-16)',
        'fib-1': 'var(--fib-1)',
        'fib-2': 'var(--fib-2)',
        'fib-3': 'var(--fib-3)',
        'fib-5': 'var(--fib-5)',
        'fib-8': 'var(--fib-8)',
        'fib-13': 'var(--fib-13)',
        'fib-21': 'var(--fib-21)',
      },
    }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
