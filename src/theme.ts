import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
    mono: '"SF Mono", "JetBrains Mono", "Fira Code", Menlo, Monaco, monospace',
  },
  colors: {
    hft: {
      50: '#e6fff0',
      100: '#b3ffd4',
      200: '#80ffb8',
      300: '#4dff9c',
      400: '#1aff80',
      500: '#00e066',
      600: '#00b352',
      700: '#00863d',
      800: '#005929',
      900: '#002c14',
    },
  },
})
