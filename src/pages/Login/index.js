import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../components/Copyright';
import { loginRequest, sendForgetPasswordMailRequest } from '../../utils/requests';
import { UseUser } from '../../components/UserContext'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MyAppBar from '../../components/MyAppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ForgetDialog(props) {
  const { openDialog, setOpenDialog } = props;
  const email = React.useRef('');

  const handleCloseNo = () => {
    setOpenDialog(false);
  };

  const handleCloseYes = () => {
    sendForgetPasswordMailRequest(email.current);
    setOpenDialog(false);
  };
  
  const handelChange = (event) => {
    email.current = event.target.value;
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Input you Email:
        </DialogTitle>
        <DialogContent>
          <TextField id="email" label="email" variant="outlined" onChange={handelChange}/>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleCloseNo}>Cancel</Button>
          <Button variant='contained' onClick={handleCloseYes} autoFocus>Send Me Email</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function Login() {
  const { login } = UseUser();
  const [open, setOpen] = React.useState({open:false, msg:"", type:"success"});
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({open:false, msg:open.msg, type:open.type});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginRequest(data, login, setOpen);
  };

  return (
    <div>
      <MyAppBar/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link onClick={()=>{setOpenDialog(true);}} variant="body1" color="text.secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body1" color="text.secondary">
                  Don't have an account? Sign Up Here.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar open={open.open} onClose={handleClose} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert children={open.msg} onClose={handleClose} severity={open.type} sx={{ width: '100%' }}/>
        </Snackbar>
      </Container>
      <ForgetDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
}
