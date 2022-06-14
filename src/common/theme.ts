import { createTheme } from '@suid/material/styles'

export const theme: any = {
  colors: {
    error: '#f44336',
    fieldBorder: '#ccc',
  },
}

export const muiTheme = createTheme({
  palette: {
    error: {
      main: theme.colors.error,
    },
  },
})
