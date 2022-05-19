import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from '../../components/MyAppBar';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { RestaurantInfoChange } from '../../components/RestaurantInfo'
import { getRestaurantRequest, ownerGetRestaurantsRequest, restaurantGetOrdersRequest, restaurantGetDeliveryMansRequest } from '../../utils/requests'
import { UseUser } from '../../components/UserContext'
import { MenuCardChange } from '../../components/MenuCard'
import { OrderCard } from '../../components/OrderCard'
import { Typography, Stack } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function RestaurantManage() {
  const theme = useTheme();
  const { user } = UseUser();
  const [value, setValue] = React.useState(0);
  const [restaurant, setRestaurant] = React.useState({ id: -1 });
  const [address, setAddress] = React.useState({});
  const [menu, setMenu] = React.useState([]);
  const [updateRest, setUpdateRest] = React.useState(false);
  const [open, setOpen] = React.useState({ open: false, msg: "", type: "success" });
  const [order, setOrder] = React.useState({ records: [], current: 1, pages: 1 });
  const [orderPage, setOrderPage] = React.useState(1);
  const [deliveryman, setDeliveryman] = React.useState([]);
  const [update, setUpdate] = React.useState(true);

  const [newItem, setNewItem] = React.useState({
    description: "",
    id: 0,
    name: "",
    photo: "",
    price: 0,
    restaurantId: restaurant.id,
    status: "NORMAL"
  });
  const didMountRef = React.useRef(false);
  const type = React.useRef('ADD');

  React.useEffect(() => {
    const timer = setInterval(() => {
      setUpdate(true);
    }, 60000)
    return () => {
      clearInterval(timer)
    }
  }, []);

  React.useEffect(() => {
    if (user.id !== -1) {
      ownerGetRestaurantsRequest(user.id, setRestaurant, setAddress, setMenu);
      restaurantGetDeliveryMansRequest(setDeliveryman);
    }
  }, [user]);

  React.useEffect(() => {
    if (update && restaurant.id !== -1) {
      setUpdate(false);
      restaurantGetOrdersRequest({
        restaurantId: restaurant.id,
        orderStatus: ['PENDING_DELIVERY', 'DELIVERING'],
        pageCurrent: orderPage,
      }, setOrder, setOrderPage);
    }
  }, [restaurant, update, orderPage]);

  React.useEffect(() => {
    if (restaurant.id >= 0) {
      type.current = 'UPDATE';
    }
    else {
      type.current = 'ADD';
    }
  }, [restaurant]);

  React.useEffect(() => {
    if (didMountRef.current) {
      if (updateRest) {
        setUpdateRest(false);
        getRestaurantRequest("?restaurantId=" + restaurant.id, setRestaurant, setAddress, setMenu);
      }
    }
    else {
      didMountRef.current = true;
    }
  }, [updateRest, restaurant.id]);

  React.useEffect(() => {
    var maxId = 0
    for (var i = 0; i < menu.length; i++) {
      if (menu[i].id > maxId) {
        maxId = menu[i].id;
      }
      maxId++;
    }
    var item = {
      description: "",
      id: 0,
      name: "",
      photo: "",
      price: 0,
      restaurantId: restaurant.id,
      status: "NORMAL"
    };
    item.id = maxId;
    setNewItem(item);
  }, [menu, restaurant]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ open: false, msg: open.msg, type: open.type });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<div>
    <CssBaseline />
    <MyAppBar />
    <Box sx={{ bgcolor: '#fff' }}>
      <AppBar position="static" color='secondary'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="orders" {...a11yProps(0)} />
          <Tab label="change profile" {...a11yProps(1)} />
          <Tab label="change menu" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Stack spacing={2}>
          {order.records.map((item) => (
            <OrderCard order={item} key={item.id} deliveryman={deliveryman} update={[update, setUpdate]} msg={setOpen}/>
          ))}
        </Stack>
        <Pagination count={order.pages} shape="rounded" size='large' page={order.current} onChange={(event, value) => {
          setUpdate(true);
          setOrderPage(value);
        }} sx={{ mt: "30px" }} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <RestaurantInfoChange restaurant={restaurant} addr={address} type={type.current} userid={user.id} setUpdateRest={setUpdateRest} setOpen={setOpen} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Grid container direction="column" spacing={2}>
          {menu.map((menuitem) => (
            <MenuCardChange item={menuitem} key={menuitem.id} button={'Update'} setUpdateRest={setUpdateRest} setOpen={setOpen} restaurant={restaurant} />
          ))}
          <Grid item>
            <Typography variant='h5'>Add New Item:</Typography>
          </Grid>
          <MenuCardChange item={newItem} key={newItem.id} button={'Add'} setUpdateRest={setUpdateRest} setOpen={setOpen} restaurant={restaurant} />
        </Grid>
      </TabPanel>
    </Box>
    <Snackbar open={open.open} onClose={handleClose} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert children={open.msg} onClose={handleClose} severity={open.type} sx={{ width: '100%' }} />
    </Snackbar>
  </div>);
}