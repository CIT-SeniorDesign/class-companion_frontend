module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "sm": '320px',
      // iPhone 5 breakpoint
      // => @media (min-width: 320px) { ... }

      'md': '375px',
      // iPhone 10 breakpoint
      // => @media (min-width: 375px) { ... }

      'lg': '768px',
      // iPad breakpoint
      // => @media (min-width: 768px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        hind: ["Hind", 'sans-serif'],
        montserrat: ["Montserrat", 'sans-serif'],
        roboto: ["Roboto", 'sans-serif']
      },
      fontSize: {
        logo: '40px',
        section_header: '24px',
        nav: '18px',
        class_companion: `30px`,
        all_in_one: `48px`
      },
      colors: {
        primary: '#D22030',
        secondary: '#6D7275',
        input_box: '#CCCCCC',
        notify_btn: '#EBEBE4',
        table_header: '#B9B9B9'
      },
      borderWidth: {
        1: '1px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
