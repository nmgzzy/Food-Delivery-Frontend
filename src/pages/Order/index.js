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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Order() {
  const { user } = UseUser();
  const [orders, setOrders] = React.useState({ records: [], current: 1, pages: 1 });
  const [orderPage, setOrderPage] = React.useState(1);
  const [open, setOpen] = React.useState({ open: false, msg: "", type: "success" });
  const [update, setUpdate] = React.useState(true);
  
  React.useEffect(()=>{
    const data = {
      customerId: user.id,
      orderStatus: ['PENDING_PAYMENT', 'PENDING_DELIVERY', 'DELIVERING'],
      pageCurrent: orderPage,
    }
    customerGetOrdersRequest(data, setOrders);
  }, [user.id, orderPage]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ open: false, msg: open.msg, type: open.type });
  };

  return (
    <div>
      <CssBaseline />
      <MyAppBar />
      <Stack spacing={2}>
        {orders.records.map((item) => (
          <OrderCardForCustomer order={item} key={item.id} update={[update, setUpdate]} msg={setOpen} />
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