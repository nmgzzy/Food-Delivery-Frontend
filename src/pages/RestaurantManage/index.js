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
import { getRestaurantRequest, ownerGetRestaurantsRequest } from '../../utils/requests'
import { UseUser } from '../../components/UserContext'
import { MenuCardChange } from '../../components/MenuCard'
import { Typography } from '@mui/material';

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
  const theme    = useTheme();
  const { user } = UseUser();
  const [ value, setValue]            = React.useState(0);
  const [ restaurant, setRestaurant ] = React.useState({});
  const [ address, setAddress ]       = React.useState({});
  const [ menu, setMenu ]             = React.useState([]);
  const [ count, setCount ]           = React.useState(0);
  const [ newItem, setNewItem ]     = React.useState({
    description: "",
    id: 0,
    name: "",
    photo: "",
    price: 0,
    restaurantId: restaurant.id,
    status: "NORMAL"
  });

  const didMountRef = React.useRef(false);


  React.useEffect(() => {
    ownerGetRestaurantsRequest(user.id, setRestaurant, setAddress, setMenu);
  }, [user]);

  React.useEffect(() => {
    if (didMountRef.current) {
      getRestaurantRequest("?restaurantId="+restaurant.id, setRestaurant, setAddress, setMenu);
    }
    else {
      didMountRef.current = true;
    }
  }, [count, restaurant]);

  React.useEffect(() => {
    var maxId = 0
    for (var i = 0; i < menu.length; i++){
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
        orders
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <RestaurantInfoChange info={restaurant} addr={address} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Grid container direction="column" spacing={2}>
          {menu.map((menuitem) => (
            <MenuCardChange item={menuitem} key={menuitem.id} button='update' />
          ))}
          <Grid item>
            <Typography variant='h5'>Add New Item:</Typography>
          </Grid>
          <MenuCardChange item={newItem} key={newItem.id} button='add' setCount={setCount}/>
        </Grid>
      </TabPanel>
    </Box>
  </div>);
}