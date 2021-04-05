module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        hind: "Hind",
        montserrat: "Montserrat",
        roboto: "Roboto"
      },
      fontSize: {
        logo: '38px',
        section_header: '26px'
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
