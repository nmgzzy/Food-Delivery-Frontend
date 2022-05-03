import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from '../../components/MyAppBar';
import Grid from '@mui/material/Grid';
import RestaurantInfo from '../../components/RestaurantInfo'
import MenuCard from '../../components/MenuCard'
import Basket from '../../components/Basket'
import { getRestaurantRequest } from '../../utils/requests';

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
      if (action.num > 0) {
        state.list.push({ id: action.id, name: action.name, photo: action.photo, num: action.num });
      }
      return { list: state.list };
    default:
      throw new Error();
  }
}

const initialBasket = { list: [] };//id:0, num:0 

export default function Restaurant() {
  const [restaurant, setRestaurant] = React.useState({});
  const [address, setAddress] = React.useState({});
  const [menu, setMenu] = React.useState([]);
  const [basket, dispatch] = React.useReducer(reducer, initialBasket);

  React.useEffect(() => {
    getRestaurantRequest(setRestaurant, setAddress, setMenu);
  }, [])

  return <div>
    <CssBaseline />
    <MyAppBar />
    <RestaurantInfo info={restaurant} addr={address} />
    <Grid container spacing={2}>
      <Grid item xs={9} container>
        {menu.map((menuitem) => (
          <MenuCard item={menuitem} dispatch={dispatch} key={menuitem.id} />
        ))}
      </Grid>
      <Grid item xs={3}>
        <Basket basket={basket} dispatch={dispatch} menu={menu} restaurantId={restaurant.id}/>
      </Grid>
    </Grid>


  </div>;
}

