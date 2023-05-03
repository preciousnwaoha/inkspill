import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

theme = createTheme(theme, {
  typography: {
    color: "#121212",
    fontWeight: 700,
    h1: {
      color: "#121212",
      [theme.breakpoints.down('xl')]: {
        fontSize: "4.78125rem",
        lineHeight: "4.875rem",
        fontWeight: 700,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "2.8125rem",
        lineHeight: "3.0625rem",
      },
    },
    h2: {
      color: "#121212",
      [theme.breakpoints.down('xl')]: {
        fontSize: "2.8125rem",
        lineHeight: "3.0625rem",
        fontWeight: 700,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "2.25rem",
        lineHeight: "2.5rem",
      },
    },
    h3: {
      color: "#121212",
      fontWeight: 700,
      [theme.breakpoints.down('xl')]: {
        fontSize: "1.875rem",
        lineHeight: "2.125rem",
        fontWeight: 700,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "1.875rem",
        lineHeight: "2.125rem",
      },
    },
    h4: {
      color: "#121212",
      fontWeight: 700,
      [theme.breakpoints.down('xl')]: {
        fontSize: "2.8125rem",
        lineHeight: "3.0625rem",
        fontWeight: 700,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "2.25rem",
        lineHeight: "2.5rem",
      },
    },
    h5: {
      color: "#121212",
      fontWeight: 700,
    },
    h: {
      color: "#121212",
      fontWeight: 700,
    },

    // body1: {
    //   color: "#8b8b8b"
    // }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
            borderRadius: "5px",
            textTransform: "inherit",
            fontSize: "1rem",
            

        },
        default: {
          background: "#121212",
          color: "white"
        },
        text: {
          color: "#121212",
          borderRadius: "8px",
        },
        contained: {
            background: "#121212",
            // [theme.breakpoints.down('sm')]: {
            //     fontSize: "1rem",
            // },
            "&:hover": {
              background: "#121212",
              opacity: 0.95,
            }
        },
        outlined: {
            border: `2px solid #121212`,
            color: "#121212",
  
            "&:hover": {
              
            }
        }
  
      },
    },
  }
});

export default theme;