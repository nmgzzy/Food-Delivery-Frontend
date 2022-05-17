import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from '../../components/MyAppBar';
import Grid from '@mui/material/Grid';
import RestaurantInfo from '../../components/RestaurantInfo'
import MenuCard from '../../components/MenuCard'
import Basket from '../../components/Basket'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getRestaurantRequest, customerAddOrderRequest, getCustomerAddressesRequest } from '../../utils/requests';
import { UseUser } from '../../components/UserContext';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const initialBasket = { list: [] };//id:0, num:0 

function reducer(state, action) {
  let index;
  switch (action.type) {
    case 'add':
      index = state.list.findIndex((value) => (value.id === action.id));
      state.list[index].num += 1;
      return { list: state.list };
    case 'sub':
      index = state.list.findIndex((value) => (value.id === action.id));
      if (state.list[index].num > 1) {
        state.list[index].num -= 1;
        return { list: state.list };
      }
      return { list: state.list.filter((value, index1) => (index1 !== index)) };
    case 'append':
      for (let i = 0; i < state.list.length; i++) {
        if (action.id === state.list[i].id) {
          state.list[i].num = action.num;
          return { list: state.list };
        }
      }
      if (action.num > 0) {
        state.list.push({ id: action.id, name: action.name, photo: action.photo, num: action.num });
      }
      return { list: state.list };
    case 'clear':
      return initialBasket;
    default:
      throw new Error();
  }
}

export function PayDialog(props) {
  const { openPay, setOpenPay, basket, dispatch, restaurantId, addr, userId } = props;
  const [addrValue, setAddrValue] = React.useState('');

  const handleCloseNo = () => {
    setOpenPay(false);
  };

  const handleClosePlace = () => {
    customerAddOrderRequest(basket.list, userId, addrValue, restaurantId, false);
    dispatch({ type: 'clear' });
    setOpenPay(false);
    // window.location.href = '/order';
    window.location.href = '/feedback?PlaceSuccess_PleasePay';
  };

  const handleCloseYes = () => {
    customerAddOrderRequest(basket.list, userId, addrValue, restaurantId, true);
    dispatch({ type: 'clear' });
    setOpenPay(false);
    // window.location.href = '/order';
    window.location.href = '/feedback?Place&PaySuccess';
  };

  const handleRadioChange = (event) => {
    setAddrValue(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={openPay}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to place the order pay this bill?
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel id="radio-buttons-group">Choose Address</FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-group"
              name="radio-buttons-group"
              value={addrValue}
              onChange={handleRadioChange}
            >
              {addr.map((item) => (
                <FormControlLabel
                  value={item.id}
                  control={<Radio />}
                  key={item.id}
                  label={item.firstName + ', ' + item.firstAddress + ', ' + item.postcode + ', ' + item.phone}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleCloseNo}>Cancel</Button>
          <Button variant='contained' disabled={addrValue===''} onClick={handleClosePlace}>Place and Don't Pay</Button>
          <Button variant='contained' disabled={addrValue===''} onClick={handleCloseYes} autoFocus>Place and Pay</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function Restaurant() {
  const [restaurant, setRestaurant] = React.useState({});
  const [address, setAddress] = React.useState({});
  const [menu, setMenu] = React.useState([]);
  const [basket, dispatch] = React.useReducer(reducer, initialBasket);
  const [openPay, setOpenPay] = React.useState(false);
  const { user } = UseUser();
  const [userAddr, setUserAddr] = React.useState([]);

  React.useEffect(() => {
    getRestaurantRequest(window.location.search, setRestaurant, setAddress, setMenu);
    getCustomerAddressesRequest(user.id, setUserAddr);
  }, [user.id]);

  return <div>
    <CssBaseline />
    <MyAppBar />
    <RestaurantInfo info={restaurant} addr={address} />
    <Box m='10px'>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8} container spacing={2}>
          {menu.map((menuitem) => (
            <Grid item xs={12} md={6} key={menuitem.id}>
              <MenuCard item={menuitem} dispatch={dispatch} defaultImg={restaurant.avatar}/>
            </Grid >
          ))}
        </Grid>
        <Grid item xs={12} lg={4} >
          <Basket basket={basket} dispatch={dispatch} menu={menu} restaurantId={restaurant.id} setOpenPay={setOpenPay} />
        </Grid>
      </Grid>
    </Box>
    <PayDialog
      openPay={openPay}
      setOpenPay={setOpenPay}
      basket={basket}
      dispatch={dispatch}
      restaurantId={restaurant.id}
      addr={userAddr}
      userId={user.id}
    />
  </div>;
}




