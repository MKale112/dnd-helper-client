import { extendTheme } from '@chakra-ui/react';

export const dndTheme = extendTheme({
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    primary: '#37C5CE',
    lightPrimary: '#3ED5C4',
    darkPrimary: '#008F98',
    secondary: '#C34A36',
    lightSecondary: '#D99586',
    darkSecondary: '#882100',
    special: '#360568',
    lightSpecial: '#683998',
    warning: '#f1c232',
    danger: '#CC021A',
  },
  fontSize: {
    small: '0.5rem',
    mediumSmall: '1rem',
    medium: '1.25rem',
    mediumLarge: '1.5rem',
    large: '2.5rem',
    subtitle: '3rem',
    subtitleLarge: '3.5rem',
    title: '4rem',
  },
  devices: {
    mobile: '750px',
    tablet: '1000px',
    desktop: '1280px',
    extraWide: '1920px',
  },
  spacing: {
    extraSmall: '0.3rem',
    small: '0.75rem',
    medium: '1rem',
    mediumLarge: '1.5rem',
    large: '2rem',
    veryLarge: '3rem',
    superLarge: '6rem',
    extraLarge: '12rem',
    uberLarge: '15rem',
    ultraLarge: '18rem',
  },
  components: {
    Button: {
      variants: {
        'danger-btn': {
          bg: 'danger',
          color: 'white',
          _hover: {
            bg: 'darkSecondary',
          },
        },
        'forward-btn': {
          bg: 'primary',
          color: 'white',
          _hover: {
            bg: 'lightPrimary',
          },
        },
      },
    },
  },
});
