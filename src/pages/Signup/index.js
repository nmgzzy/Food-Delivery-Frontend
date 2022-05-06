import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../components/Copyright';
import queryString from 'query-string';
import { signupRequest } from '../../utils/requests';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MyAppBar from '../../components/MyAppBar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const roles = { 'ROLE_CUSTOMER': "Customer", 'ROLE_RESTAURANT_OWNER': "Restaurant owner", 'ROLE_DELIVERY_MAN': "Delivery man" };
  const [role, setRole] = useState('ROLE_CUSTOMER');
  const [open, setOpen] = React.useState({open:false, msg:"", type:"success"});

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({open:false, msg:open.msg, type:open.type});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signupRequest(data, role, setOpen);
  }

  useEffect(() => {
    const {r} = queryString.parse(window.location.search)
    if (r === 'ROLE_CUSTOMER') {
      setRole('ROLE_CUSTOMER')
    }
    else if (r === 'ROLE_RESTAURANT_OWNER') {
      setRole('ROLE_RESTAURANT_OWNER')
    }
    else if (r === 'ROLE_DELIVERY_MAN'){
      setRole('ROLE_DELIVERY_MAN')
    }
  }, [role]);

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
            {roles[role]} Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Repeat Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup?r=ROLE_CUSTOMER" variant="body1" color="text.secondary">
                    Customer Sign up.
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup?r=ROLE_RESTAURANT_OWNER" variant="body1" color="text.secondary">
                    Are you a restaurant owner? Sign up here!
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup?r=ROLE_DELIVERY_MAN" variant="body1" color="text.secondary">
                    Are you a delivery man? Sign up here!
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body1" color="text.secondary">
                    Already have an account? Login in here.
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Snackbar open={open.open} onClose={handleClose} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert children={open.msg} onClose={handleClose} severity={open.type} sx={{ width: '100%' }}/>
        </Snackbar>
      </Container>
    </div>
  );
}