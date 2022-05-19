import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from '../../components/MyAppBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import { adminGetRestaurantsRequest, adminChangeRestaurantStatusRequest } from '../../utils/requests'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AdminCard(props) {
  const { item, setUpdate, setOpen } = props;

  // React.useEffect(()=>{

  // }, [])

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CardContent sx={{margin:'30px'}}>
            <Typography variant="h3">
              Name: {item.name}
            </Typography>
            <Typography variant="h5">
              Discription: {item.discription}
            </Typography>
            <Typography variant="h5">
              Phone: {item.phone}
            </Typography>
            <Typography variant="h5">
              Cook time: {item.averageCookingTime}
            </Typography>
            <Typography variant="h5">
              Category: {item.categoryName}
            </Typography>
            <Typography variant="h5">
              Address: {item.address.firstAddress+' '+ item.address.secondAddress+' '+item.address.city}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" sx={{mt:2, ml:2}}>
            Cover:
          </Typography>
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{p:2}}
            image={item.avatar}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" sx={{mt:2, ml:2}}>
            Certificate file:
          </Typography>
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{p:2}}
            image={item.certificationFile}
          />
        </Grid>
      </Grid>
      <CardActions>
        <Button variant='contained' sx={{m:1}} fullWidth onClick={()=>{
          adminChangeRestaurantStatusRequest(item.id, 'OPEN', ()=>{
            setOpen({ open: true, msg: 'Approve success', type: 'success' });
            setUpdate(true);
          });
        }}>approve</Button>
      </CardActions>
    </Card>
  );
}

export default function AdminManage() {
  const [restaurants, setRestaurants] = React.useState({ records: [], current: 1, pages: 1 });
  const [restaurantsPage, setRestaurantsPage] = React.useState(1);
  const [open, setOpen] = React.useState({ open: false, msg: "", type: "success" });
  const [update, setUpdate] = React.useState(true);

  React.useEffect(() => {
    if (update) {
      setUpdate(false);
      adminGetRestaurantsRequest(restaurantsPage, setRestaurants);
    }
  }, [restaurantsPage, update]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ open: false, msg: open.msg, type: open.type });
  };

  return <div>
    <CssBaseline />
    <MyAppBar />
    {restaurants.records.map((item) => (
      <AdminCard item={item} key={item.id} setUpdate={setUpdate} setOpen={setOpen}/>
    ))}
    <Pagination count={restaurants.pages} shape="rounded" size='large' page={restaurants.current} onChange={(event, value) => {
      setRestaurantsPage(value);
      setUpdate(true);
    }} sx={{ mt: "30px" }} />
    <Snackbar open={open.open} onClose={handleClose} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert children={open.msg} onClose={handleClose} severity={open.type} sx={{ width: '100%' }} />
    </Snackbar>
  </div>;
}