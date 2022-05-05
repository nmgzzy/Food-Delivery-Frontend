import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import UploadPhoto from './UploadPhoto';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
// "address": {
//   "id": 127,
//   "type": "RESTAURANT",
//   "customerId": null,
//   "restaurantId": 162,
//   "firstAddress": "104-106 Portswood Rd",
//   "secondAddress": "",
//   "firstName": null,
//   "lastName": "",
//   "phone": null,
//   "city": "Southampton",
//   "country": "UK",
//   "postcode": "SO172FW",
//   "latitude": 50.9232765,
//   "longitude": -1.3948494
// },
export default function RestaurantInfo(props) {
  const address = props.addr.firstAddress + ', ' + ((props.addr.secondAddress === "") ? "" : (props.addr.secondAddress + ', ')) + props.addr.city + ', ' + props.addr.postcode;
  return <Paper
    sx={{
      p: 2,
      margin: 'auto',
      flexGrow: 1,
      backgroundColor: '#fff',
    }}
  >
    <Grid container spacing={2}>
      <Grid item>
        <Box sx={{ height: 250 }}>
          <Img alt="complex" src={props.info.avatar} />
        </Box>
      </Grid>
      <Grid item xs container direction="column">
        <Grid item>
          <Typography variant='h3' p={'10px'}>
            {props.info.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1' p={'5px'}>
            {props.info.description}
          </Typography> </Grid>
        <Grid item>
          <Typography variant='h5' p={'5px'}>
            {props.info.phone}
          </Typography> </Grid>
        <Grid item>
          <Typography variant='h5' p={'5px'}>
            {address}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h5' p={'5px'}>
            <Rating name="read-only" value={parseFloat(props.info.mark)} precision={0.1} readOnly />
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Box sx={{ width: 300, height: 200 }}>
          {/* <Gmap/> */}
          map
        </Box>
        <Typography variant='h5' p={'8px'}>time</Typography>

      </Grid>
    </Grid>
  </Paper>
}

export function RestaurantInfoChange(props) {

  const handleSubmit = (event) => {
    event.preventDefault();

  }

  return <Paper
    sx={{
      p: 2,
      margin: 'auto',
      flexGrow: 1,
      backgroundColor: '#fff',
    }}
  >
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item>
            <Typography variant='body1'>
              restaurant photo:
            </Typography>
            <UploadPhoto
              url={'restaurant/updateRestaurantAvatar?restaurantId=' + props.info.id}
              defaultImage={props.info.avatar}
              sx={{ maxWidth: 600, m: '10px' }}
              alt='Avatar'
            />
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              certification file:
            </Typography>
            <UploadPhoto
              url={'restaurant/updateRestaurantCertification?restaurantId=' + props.info.id}
              defaultImage={props.info.certificationFile}
              sx={{ maxWidth: 600, m: '10px' }}
              alt='Certification'
            />
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item>
            <TextField fullWidth id="name" label="name" variant="outlined" defaultValue={props.info.name} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="description" label="description" variant="outlined" defaultValue={props.info.description} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="phone" label="phone" variant="outlined" defaultValue={props.info.phone} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="firstAddress" label="firstAddress" variant="outlined" defaultValue={props.addr.firstAddress} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="secondAddress" label="secondAddress" variant="outlined" defaultValue={props.addr.secondAddress} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="city" label="city" variant="outlined" defaultValue={props.addr.city} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="country" label="country" variant="outlined" defaultValue={props.addr.country} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="postcode" label="postcode" variant="outlined" defaultValue={props.addr.postcode} />
          </Grid>
          <Grid item>
            <Rating name="read-only" value={parseFloat(props.info.mark)} precision={0.1} readOnly />
          </Grid>
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained">submit change</Button>
    </Box>
  </Paper>
}