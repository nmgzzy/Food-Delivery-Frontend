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
import { updateRestaurantInfoRequest, addRestaurantRequest } from '../utils/requests'
import Gmap from '../components/Gmap';

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
  const {info, addr} = props;
  const address = addr.firstAddress + ', ' + ((addr.secondAddress === "") ? "" : (addr.secondAddress + ', ')) + addr.city + ', ' + addr.postcode;
  return <Paper
    sx={{
      p: 2,
      margin: 'auto',
      flexGrow: 1,
      backgroundColor: '#fff',
    }}
  >
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4}>
        <Img alt="complex" src={info.avatar} />
      </Grid>
      <Grid item xs={12} md={5} container direction="column">
        <Grid item>
          <Typography variant='h3' p={'10px'}>
            {info.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1' p={'5px'}>
            {info.description}
          </Typography> </Grid>
        <Grid item>
          <Typography variant='h6' p={'5px'}>
            {info.phone}
          </Typography> </Grid>
        <Grid item>
          <Typography variant='h6' p={'5px'}>
            {address}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1' p={'8px'}>Average cooking time: {info.averageCookingTime} min</Typography>
        </Grid>
        <Grid item>
          <Rating name="read-only" value={parseFloat(info.mark)} precision={0.1} readOnly />
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Gmap lat={addr.latitude} lng={addr.longitude} style={{ height: '35vh', width: '100%' }} who='rest'/>
      </Grid>
    </Grid>
  </Paper>
}

export function RestaurantInfoChange(props) {
  const { restaurant, addr, type, userid, setUpdateRest, setOpen } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var addInfo = {
      averageCookingTime: parseInt(data.get('averageCookingTime')),
      categoryId: data.get('categoryId'),
      description: data.get('description'),
      name: data.get('name'),
      ownerId: userid,
      phone: data.get('phone')
    };
    var updateInfo = {
      addressId: addr.id,
      averageCookingTime: parseInt(data.get('averageCookingTime')),
      categoryId: data.get('categoryId'),
      description: data.get('description'),
      id: restaurant.id,
      name: data.get('name'),
      ownerId: userid,
      phone: data.get('phone'),
      status: "OPEN"
    };
    var updateAddr = {
      city: data.get('city'),
      country: data.get('country'),
      firstAddress: data.get('firstAddress'),
      id: addr.id,
      postcode: data.get('postcode'),
      restaurantId: restaurant.id,
      secondAddress: data.get('secondAddress'),
      type: "RESTAURANT"
    };
    var addAddr = {
      city: data.get('city'),
      country: data.get('country'),
      firstAddress: data.get('firstAddress'),
      postcode: data.get('postcode'),
      restaurantId: -1,
      secondAddress: data.get('secondAddress'),
      type: "RESTAURANT"
    };
    if (type === 'UPDATE') {
      updateRestaurantInfoRequest(updateInfo, updateAddr, setOpen);
    }
    else if (type === 'ADD'){
      addRestaurantRequest(addInfo, addAddr, setOpen, setUpdateRest);
    }
  }

  return <Paper
    sx={{
      p: 2,
      margin: 'auto',
      flexGrow: 1,
    }}
  >
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7} container direction="column" spacing={2}>
          {type === 'ADD' ? 'step1:' : ''}
          <Grid item>
            <TextField fullWidth id="name" name='name' label="name" variant="outlined" defaultValue={restaurant.name} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="description" name='description' label="description" variant="outlined" defaultValue={restaurant.description} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="averageCookingTime" name='averageCookingTime' label="averageCookingTime" variant="outlined" defaultValue={restaurant.averageCookingTime} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="categoryId" name='categoryId' label="categoryId" variant="outlined" defaultValue={restaurant.categoryId} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="phone" name='phone' label="phone" variant="outlined" defaultValue={restaurant.phone} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="firstAddress" name='firstAddress' label="firstAddress" variant="outlined" defaultValue={addr.firstAddress} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="secondAddress" name='secondAddress' label="secondAddress" variant="outlined" defaultValue={addr.secondAddress} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="city" name='city' label="city" variant="outlined" defaultValue={addr.city} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="country" name='country' label="country" variant="outlined" defaultValue={addr.country} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <TextField fullWidth id="postcode" name='postcode' label="postcode" variant="outlined" defaultValue={addr.postcode} sx={{backgroundColor:"#fff"}} />
          </Grid>
          <Grid item>
            <Button fullWidth type="submit" variant="contained">{type === 'UPDATE' ? 'submit change':'add restaurant infomation'}</Button>
          </Grid>
          <Grid item>
            <Button fullWidth variant="contained" onClick={()=>{
              window.location.href = '/changepswd';
            }}>change password</Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5} container direction="column" spacing={2}>
          {type === 'ADD' ? 'step2:' : ''}
          <Grid item>
            <Typography variant='body1'>
              restaurant photo:
            </Typography>
            <UploadPhoto
              url={'restaurant/updateRestaurantAvatar?restaurantId=' + restaurant.id}
              defaultImage={restaurant.avatar}
              sx={{ maxWidth: 600, m: '10px' }}
              alt='Avatar'
              setOpen={setOpen}
            />
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              certification file:
            </Typography>
            <UploadPhoto
              url={'restaurant/updateRestaurantCertification?restaurantId=' + restaurant.id}
              defaultImage={restaurant.certificationFile}
              sx={{ maxWidth: 600, m: '10px' }}
              alt='Certification'
              setOpen={setOpen}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Paper>
}