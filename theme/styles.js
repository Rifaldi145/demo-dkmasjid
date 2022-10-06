import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  textStyles: {
    judul: {
      fontFamily: 'Inter',
      fontSize: { sm: '16px', lg: '26px' },
      fontWeight: 400,
      lineHeight: 1.2,
      color: '#000000'
    },
    sub_judul: {
      fontFamily: 'Inter',
      fontSize: { sm: '16px', lg: '22px' },
      fontWeight: 400,
      lineHeight: 1.2,
      color: '#000000'
    },
    sub_sub_judul: {
      fontFamily: 'Inter',
      fontSize: { sm: '16px', lg: '18px' },
      fontWeight: 400,
      lineHeight: 1.2,
      color: '#000000'
    },
    isi: {
      fontFamily: 'Inter',
      fontSize: { sm: '14px', lg: '16px' },
      fontWeight: 'normal',
      lineHeight: 1.2,
      color: '#4F4F4F'
    },
    isi_isi: {
      fontFamily: 'Inter',
      fontSize: { sm: '12px', md: '18px', lg: '14px' },
      fontWeight: 'normal',
      lineHeight: 1.2,
      color: '#4F4F4F'
    },
    isi_12: {
      fontFamily: 'Inter',
      fontSize: { sm: '10px', lg: '12px' },
      fontWeight: 'normal',
      lineHeight: 1.2,
      color: '#4F4F4F'
    },
  },
  colors: {
    gray: {
      700: "#1f2733",
    },
    purple2: {
      main: "#7F7FD7",
      soft: "#7F7FD7",
      dark: "#482E94",
      50: "#7F7FD7",
      100: "#7F7FD7",
      200: "#7F7FD7",
      300: "#7F7FD7",
      400: "#7F7FD7",
      500: "#7F7FD7",
      600: "#7F7FD7",
      700: "#7F7FD7",
      800: "#7F7FD7",
      900: "#7F7FD7"
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.100", "gray.800")(props),
        fontFamily: 'Inter'
      },
      html: {
        fontFamily: 'Inter'
      },
      h1: {
        fontSize: { sm: '6.4vw', md: '6.8vw', 'lg': '5.25vw' },
        fontWeight: 'bold',
        lineHeight: 1.2,
        padding: 0,
        margin: 0,
      },
      h2: {
        fontSize: { sm: '4.4vw', md: '4.8vw', 'lg': '4.25vw' },
        fontWeight: 'bold',
        lineHeight: 1.2,
        padding: 0,
        margin: 0,
      },
      h3: {
        fontSize: { sm: '3.4vw', md: '3.8vw', 'lg': '3.25vw' },
        fontWeight: 'bold',
        lineHeight: 1.2,
        padding: 0,
        margin: 0,
      },
      h4: {
        fontSize: { sm: 'xs', lg: 'sm' },
        fontWeight: 'bold',
        lineHeight: 'normal'
      },
      p: {
        fontSize: { sm: '2.4vw', md: '2.8vw', 'lg': '2.25vw' },
        fontWeight: 'normal',
        lineHeight: 1.2,
        padding: 0,
        margin: 0,
      },
      button: {
        fontFamily: 'Inter',
      },
    }),
  },
};
