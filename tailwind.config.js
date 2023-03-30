/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '0px',
        md: '720px',
        lg: '1366px',
        xl: '1920px',
        '2xl': '2350px',
      },
      colors: {
        onNeutralBg: 'var(--onNeutralBg)',
        neutralChild: 'var(--neutralChild)',
        neutralBg: 'var(--neutralBg)',
        neutralFocus: 'var(--neutralFocus)',
        primaryChild: 'var(--primaryChild)',
        onPrimaryBg: 'var(--onPrimaryBg)',
        primaryBg: 'var(--primaryBg)',
        primaryFocus: 'var(--primaryFocus)',
        appBg: 'var(--appBg)',
      },
    },
  },
}
