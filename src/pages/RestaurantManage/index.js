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
import { ownerGetRestaurantsRequest } from '../../utils/requests'
import { UseUser } from '../../components/UserContext'
import { MenuCardChange } from '../../components/MenuCard'

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
  const [value, setValue] = React.useState(0);
  const [restaurant, setRestaurant] = React.useState({});
  const [address, setAddress] = React.useState({});
  const [menu, setMenu] = React.useState([]);
  const { user } = UseUser();

  React.useEffect(() => {
    ownerGetRestaurantsRequest(user.id, setRestaurant, setAddress, setMenu);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<div>
    <CssBaseline />
    <MyAppBar />
    <Box sx={{ bgcolor: '#fff'}}>
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
          <RestaurantInfoChange  info={restaurant} addr={address} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Grid container direction="column" spacing={2}>
          {menu.map((menuitem) => (
            <MenuCardChange item={menuitem} key={menuitem.id} />
          ))}
        </Grid>
        </TabPanel>
    </Box>
  </div>);
}