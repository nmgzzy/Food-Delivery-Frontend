import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import MyAppBar from '../../components/MyAppBar';
import { OrderCardForCustomer } from '../../components/OrderCard';
import { UseUser } from '../../components/UserContext';
import { customerGetOrdersRequest } from '../../utils/requests'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Order() {
  const { user } = UseUser();
  const [orders, setOrders] = React.useState({ records: [], current: 1, pages: 1 });
  const [orderPage, setOrderPage] = React.useState(1);
  const [open, setOpen] = React.useState({ open: false, msg: "", type: "success" });
  const [update, setUpdate] = React.useState(true);
  const [status, setStatue] = React.useState({'PENDING_PAYMENT':true, 'PENDING_DELIVERY':true, 'DELIVERING':true, 'DELIVERED':false, 'CANCELLED':false});
  
  React.useEffect(() => {
    if (update) {
      setUpdate(false);
      var orderStatus = [];
      for(let key in status){
        if (status[key]===true) {
          orderStatus.push(key);
        }
      }
      const data = {
        customerId: user.id,
        orderStatus: orderStatus,
        pageCurrent: orderPage,
      };
      customerGetOrdersRequest(data, setOrders);
    }
  }, [user.id, orderPage, status, update]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ open: false, msg: open.msg, type: open.type });
  };

  const handleChange = (event) => {
    let a = status;
    a[event.target.id] = event.target.checked;
    setStatue(a);
    setUpdate(true);
  };

  return (
    <div>
      <CssBaseline />
      <MyAppBar />
      <Box sx={{m:2}} display='flex' flexWrap='wrap' justifyContent='center'>
        <FormControlLabel control={<Checkbox id='PENDING_PAYMENT' onChange={handleChange} defaultChecked/>} label="PENDING_PAYMENT" />
        <FormControlLabel control={<Checkbox id='PENDING_DELIVERY' onChange={handleChange} defaultChecked/>} label="PENDING_DELIVERY" />
        <FormControlLabel control={<Checkbox id='DELIVERING' onChange={handleChange} defaultChecked/>} label="DELIVERING" />
        <FormControlLabel control={<Checkbox id='DELIVERED' onChange={handleChange}/>} label="DELIVERED" />
        <FormControlLabel control={<Checkbox id='CANCELLED' onChange={handleChange}/>} label="CANCELLED" />
      </Box>
      <Stack spacing={2}>
        {orders.records.map((item) => (
          <OrderCardForCustomer order={item} key={item.id} update={setUpdate} setOpen={setOpen} />
        ))}
      </Stack>
      <Pagination count={orders.pages} shape="rounded" size='large' page={orders.current} onChange={(event, value) => {
          setUpdate(true);
          setOrderPage(value);
        }} sx={{ mt: "30px" }} />
      <Snackbar open={open.open} onClose={handleClose} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert children={open.msg} onClose={handleClose} severity={open.type} sx={{ width: '100%' }} />
      </Snackbar>
    </div>
  );
}