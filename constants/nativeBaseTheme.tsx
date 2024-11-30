import { ColorMode, extendTheme } from "native-base";

// Extend NativeBase Theme with PhetsarathOT as the default font
export const nativeBaseTheme = (colorMode: ColorMode) => extendTheme({
     config: {
          initialColorMode: colorMode,
          useSystemColorMode: false, // Do not track system settings
     },
     colors: {
          primary: {
               50: '#f9e8d9', // Lightest shade
               100: '#f2cba8', // Light shade
               500: '#ab5f14', // Base (primary) color
               700: '#7f460f', // Dark shade
          },
          light: {
               background: '#ffffff',
               text: '#000000',
          },
          dark: {
               background: '#121212',
               text: '#ffffff',
          },
     },
     // Map fonts for PhetsarathOT across all components
     fontConfig: {
          PhetsarathOT: {
               400: {
                    normal: 'PhetsarathOT', // Lightweight font usage
               },
               700: {
                    normal: 'PhetsarathOT', // Bolder font usage
               },
          },
     },
     fonts: {
          heading: 'PhetsarathOT', // Heading text
          body: 'PhetsarathOT', // Body/Paragraph text
          mono: 'PhetsarathOT', // Monospace text
     },
     components: {
          Text: {
               baseStyle: (props: any) => ({
                    fontFamily: 'PhetsarathOT',
                    color: props.colorMode === 'dark' ? 'dark.text' : 'light.text',
                    fontSize: 16,
                    lineHeight: 24,
               }),
               sizes: {
                    title: { fontSize: 32, fontWeight: 'bold' },
                    subtitle: { fontSize: 20, fontWeight: 'bold' },
                    default: { fontSize: 16, lineHeight: 24 },
                    link: { fontSize: 16, lineHeight: 30, color: '#0a7ea4' },
               },
          },
          Heading: {
               baseStyle: (props: any) => ({
                    ...props,
                    fontFamily: 'PhetsarathOT',
                    color: props.colorMode === 'dark' ? 'dark.text' : 'light.text',
               }),
          },
          Button: {
               baseStyle: (props: any) => ({
                    ...props,
                    _light: {
                         fontFamily: 'PhetsarathOT',
                         color: 'light.text', // Light mode text color
                    },
                    _dark: {
                         fontFamily: 'PhetsarathOT',
                         color: 'dark.text', // Dark mode text color
                    },
               }),
          },
     },
});

export const bgColor = (colorMode: ColorMode) => colorMode === 'dark' ? 'background.dark' : 'background.light';
