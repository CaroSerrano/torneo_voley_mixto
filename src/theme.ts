import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#00313e',
    },
    primary: {
      light: '#3c7d91',
      main: '#134755',
      dark: '#00313e',
      contrastText: 'white',
    },
    secondary: {
      light: '#c04437',
      main: '#831506',
      contrastText: 'white',
    },
  },
});

export default theme;
