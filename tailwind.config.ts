import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:         'rgb(var(--color-bg) / <alpha-value>)',
        surface:    'rgb(var(--color-surface) / <alpha-value>)',
        surface2:   'rgb(var(--color-surface2) / <alpha-value>)',
        border:     'rgb(var(--color-border) / <alpha-value>)',
        accent:     'rgb(var(--color-accent) / <alpha-value>)',
        'accent-dim': 'rgb(var(--color-accent) / 0.12)',
        copy:       'rgb(var(--color-text) / <alpha-value>)',
        muted:      'rgb(var(--color-muted) / <alpha-value>)',
        label:      'rgb(var(--color-label) / <alpha-value>)',
        brand: {
          green: 'rgb(var(--color-green) / <alpha-value>)',
          blue:  'rgb(var(--color-blue) / <alpha-value>)',
          red:   'rgb(var(--color-accent) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
