import { createTheme } from '@mui/material/styles';
import * as Colors from '@mui/material/colors';

export const theme = createTheme({
	palette: {
		primary: {
			main: Colors.orange[200],
		},
		background: {
			paper: Colors.orange[50],
		},
    text: {
      primary: '#000',
      secondary: Colors.orange[800],
    },
	},
});