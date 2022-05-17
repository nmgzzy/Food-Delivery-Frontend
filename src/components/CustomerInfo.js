import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UploadPhoto from './UploadPhoto';
import { updateUserInfoRequest } from '../utils/requests'

export default function CustomerInfo(props) {
  const { userInfo, setOpen, setUpdate } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      email: form.get('email'),
      id: userInfo.id,
      nickName: form.get('nickName'),
      roleId: userInfo.roleId,
      username: form.get('username')
    }
    updateUserInfoRequest(data, setUpdate);
  }
  React.useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  return <Paper
    sx={{
      p: 2,
      margin: 3,
      flexGrow: 1,
    }}
  >
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <UploadPhoto
            url={'user/updateAvatar?userId=' + userInfo.id}
            defaultImage={userInfo.avatar}
            sx={{ maxWidth: 250, m: '10px' }}
            alt='Avatar'
            setOpen={setOpen}
          />
        </Grid>
        <Grid item xs={12} sm={7} container direction={'column'} spacing={2} m={1}>
          <Grid item>
            <TextField fullWidth id="email" name='email' label="email" variant="outlined" defaultValue={userInfo.email} sx={{ backgroundColor: "#fff" }} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="username" name='username' label="username" variant="outlined" defaultValue={userInfo.username} sx={{ backgroundColor: "#fff" }} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="nickName" name='nickName' label="nick name" variant="outlined" defaultValue={userInfo.nickName} sx={{ backgroundColor: "#fff" }} />
          </Grid>
          <Grid item>
            <Button variant='contained' type='submit' sx={{ m: 2 }}>update info</Button>
            <Button variant='contained' onClick={() => {
              window.location.href = '/changepswd';
            }} sx={{ m: 2 }}>change password</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Paper>
}