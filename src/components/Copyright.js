import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
    return (
      <Typography variant="body2" color="#b0b0b0" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://fd.shimonzhan.com">
          COMP6251 ZZ. XZ. YZ.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }