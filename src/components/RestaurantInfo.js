import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Gmap from './Gmap';
import Rating from '@mui/material/Rating';

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
  const address = props.addr.firstAddress + ', ' + ((props.addr.secondAddress==="") ? "" : (props.addr.secondAddress + ', ')) + props.addr.city + ', ' + props.addr.postcode;
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