import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});

export const colors: string[] = [
  "#00ff99",
  "#ff6666",
  "#00ccff",
  "#fff35c",
  "#9933ff",
  "#6157ff",
];

export default extendTheme({
  breakpoints: breakpoints,
  styles: {
    global: {
      body: {
        backgroundColor: "blackAlpha.900",
        color: "whiteAlpha",
      },
    },
  },
  sizes: {
    container: {
      xl: "1200px",
    },
  },
  fonts: {
    size: "16px",
  },
  components: {
    Link: {
      baseStyle: ({
        colorScheme = "linear(150deg, #f5d1b1 41%, #fcd3ad 50%, #f5a09d 70%)",
      }) => ({
        _hover: {
          textDecoration: "none",
          bgGradient: colorScheme,
          bgClip: "text",
        },
      }),
      variants: {
        lightmode: ({ colorScheme = "whiteAlpha" }) => ({
          color: `${colorScheme}.500`,
          _hover: {
            color: `${colorScheme}.600`,
          },
        }),
      },
      defaultProps: {
        variant: "color",
      },
    },
    Button: {
      sizes: {
        lg: {
          fontSize: "md",
        },
      },
      variants: {
        ghost: ({ colorScheme = "whiteAlpha" }) => ({
          backgroundColor: `${colorScheme}.50`,
          ":hover, :focus": {
            backgroundColor: `${colorScheme}.100`,
          },
        }),
        gradient: ({
          fromGradient = "linear-gradient(150deg, #f5d1b1 41%, #fcd3ad 50%, #f5a09d 70%)",
        }) => {
          return {
            background: "blackAlpha.400",
            border: "1px solid",
            borderColor: "whiteAlpha.800",
            _hover: {
              background: fromGradient,
            },
          };
        },
      },
    },
    Input: {
      parts: ["field"],
      variants: {
        filled: {
          field: {
            borderRadius: "sm",
            color: "blackAlpha.800",
          },
        },
        outline: {
          field: {
            borderColor: "gray.300",
          },
        },
      },
    },
  },
});
