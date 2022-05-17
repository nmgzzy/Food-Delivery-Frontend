import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from '../../components/MyAppBar';
import Address from '../../components/Address';
import CustomerInfo from '../../components/CustomerInfo';
import { UseUser } from '../../components/UserContext';
import { getUserInfoRequest, getCustomerAddressesRequest } from '../../utils/requests';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Profile() {
  const { user } = UseUser();
  const [addresses, setAddresses] = React.useState([]);
  const [update, setUpdate] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState({});
  const [open, setOpen] = React.useState({ open: false, msg: "", type: "success" });
  
  React.useEffect(() => {
    if (update){
      setUpdate(false);
      getUserInfoRequest(user.id, setUserInfo);
      getCustomerAddressesRequest(user.id, setAddresses);
    }
  }, [user.id, update]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ open: false, msg: open.msg, type: open.type });
  };
  
  return <div>
    <CssBaseline />
    <MyAppBar />
    <CustomerInfo userInfo={userInfo} setOpen={setOpen} setUpdate={setUpdate}/>
    {addresses.map((address) => (
      <Address customerId={user.id} type='UPDATE' address={address} setUpdate={setUpdate} key={address.id}/>
    ))}
    <Address customerId={user.id} type='ADD' setUpdate={setUpdate} />
    <Snackbar open={open.open} onClose={handleClose} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert children={open.msg} onClose={handleClose} severity={open.type} sx={{ width: '100%' }} />
    </Snackbar>
  </div>;
}