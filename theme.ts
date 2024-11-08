import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          marginBlock: 20,
        },
      },
      defaultProps: {
        disableGutters: true,
        maxWidth: 'md',
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: {
          textAlign: 'center',
        },
      },
    },
  },
});
