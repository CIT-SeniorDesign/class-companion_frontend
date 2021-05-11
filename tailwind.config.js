module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {


      "sm": '320px',
      // => @media (min-width: 640px) { ... }

      'md': '375px',
      // => @media (min-width: 768px) { ... }

      'lg': '768px',
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
        logo: '40px',
        section_header: '24px',
        nav: '18px',
        class_companion: `30px`
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
