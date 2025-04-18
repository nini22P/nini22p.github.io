module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            pre: {
              color: '#ccc',
              backgroundColor: '#2d2d2d',
              fontSize: '1rem',
            },
            code: {
              color: '#ccc',
              backgroundColor: '#2d2d2d',
              borderRadius: theme('borderRadius.md'),
              paddingTop: theme('padding[1]'),
              paddingRight: theme('padding[1.5]'),
              paddingBottom: theme('padding[1]'),
              paddingLeft: theme('padding[1.5]'),
            },
            'code::before': null,
            'code::after': null,
          },
        },
      }),
    },
  },
}