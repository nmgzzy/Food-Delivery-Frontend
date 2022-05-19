import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UploadPhoto from './UploadPhoto';
import { updateUserInfoRequest } from '../utils/requests'
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

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

  return <Card
    sx={{
      p: 2,
      margin: 3,
      flexGrow: 1,
      textAlign: 'center'
    }}
  >
    <CardHeader title={"User Profile"} />
    <CardContent>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <UploadPhoto
              url={'user/updateAvatar?userId=' + userInfo.id}
              defaultImage={userInfo.avatar}
              sx={{ width:'100%', m: '10px' }}
              alt='Avatar'
              setOpen={setOpen}
            />
          </Grid>
          <Grid item xs={12} sm={8} container direction={'column'} spacing={2} m={1}>
            <Grid item>
              <Typography variant='h6' textAlign={'left'} ml={1}>id: {userInfo.id}</Typography>
            </Grid>
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
    </CardContent>
  </Card>
}