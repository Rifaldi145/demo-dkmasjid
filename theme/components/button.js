export const buttonStyles = {
  components: {
    Button: {
      variants: {
        "no-hover": {
          _hover: {
            boxShadow: "none",
          },
        },
        "transparent-with-icon": {
          size: 'md',
          bg: "transparent",
          fontSize: { sm: '12px', lg: '14px' },
          borderRadius: "inherit",
          cursor: "pointer",
          _hover: "none",
          _active: {
            bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            boxShadow: "none",
          },
        },
        "normal": {
          height: 'auto',
          width: 'auto',
          fontSize: { sm: '12px', md: '18px', lg: '14px' },
          lineHeight: 1,
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 2.5,
          paddingBottom: 2.5,
          margin: 0,
          bg: 'purple2.soft',
          color: "white",
          _hover: { bg: "purple2.dark", color: 'white' },
          borderRadius: "5px"
        },
      },
      baseStyle: {
        borderRadius: "5px",
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
