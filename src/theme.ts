import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#134755',
    },
    text: {
      primary: '#f2f2f2'
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
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: 'white', // texto del input
        },
        notchedOutline: {
          borderColor: '#d4d8da', // borde por defecto
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', // borde al hacer hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', // borde al enfocar
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white', // color del label por defecto
          '&.Mui-focused': {
            color: 'white', // color del label al enfocar
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'white', // helper text y mensaje de error
        },
      },
    },
  },
});

export default theme;
