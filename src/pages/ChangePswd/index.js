import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../components/Copyright';
import { changePasswordRequest } from '../../utils/requests';
import { UseUser } from '../../components/UserContext'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MyAppBar from '../../components/MyAppBar';
import md5 from 'js-md5';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ChangePswd() {
  const { user } = UseUser();
  const [open, setOpen] = React.useState({ open: false, msg: "", type: "success" });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ open: false, msg: open.msg, type: open.type });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var old = data.get('oldpassword');
    var a = data.get('newpassword1');
    var b = data.get('newpassword2');
    if (user.id !== -1 && a === b) {
      changePasswordRequest(user.id, md5(old), md5(a));
    }
  };

  return (
    <div>
      <MyAppBar />
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
            Change Password
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
              name="oldpassword"
              label="old password"
              type="password"
              id="oldpassword"
              autoComplete="current-oldpassword"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newpassword1"
              label="new password"
              type="password"
              id="newpassword1"
              autoComplete="current-newpassword1"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newpassword2"
              label="repeat new password"
              type="password"
              id="newpassword2"
              autoComplete="current-newpassword2"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar open={open.open} onClose={handleClose} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert children={open.msg} onClose={handleClose} severity={open.type} sx={{ width: '100%' }} />
        </Snackbar>
      </Container>
    </div>
  );
}
