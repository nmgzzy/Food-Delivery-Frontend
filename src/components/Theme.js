import { createTheme } from '@mui/material/styles';
import * as Colors from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: Colors.orange[200],
    },
    secondary: {
      main: Colors.blue[200],
    },
    button: {
      main: Colors.blue[800],
    },
    icon: {
      main: Colors.orange[900],
    },
    background: {
      paper: Colors.orange[50],
      white: '#fff',
    },
    text: {
      primary: '#000',
      secondary: Colors.orange[800],
      link: Colors.orange[500],
    },
    line: {
      primary: Colors.orange[900],
      secondary: Colors.orange[800],
    }
    
  },
});