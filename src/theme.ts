import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#134755',
    },
    text: {
      primary: '#f2f2f2',
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
          color: 'white',
        },
        notchedOutline: {
          borderColor: '#d4d8da',
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          // flechita del Select
          '& .MuiSelect-icon': {
            color: 'white',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-focused': {
            color: 'white',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#00313e',
          '&:hover': {
            backgroundColor: '#134755',
          },
          '&.Mui-selected': {
            backgroundColor: '#134755 !important',
          },
        },
      },
    },
  },
});

export default theme;
