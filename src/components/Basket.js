import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';

export default function Basket(props) {
  return <Paper elevation={3} sx={{
    p: 2,
    margin: '10px',
    flexGrow: 1,
    backgroundColor: '#fff',
  }}>
    <Typography variant='h4' p={'10px'}>Basket</Typography>
    <List>
      {props.basket.list.map((item) => (
        <ListItem key={item.id}>
          <Avatar
            alt="menu item"
            src={item.photo}
            sx={{ width: 32, height: 32 }}
          />
          <ListItemText sx={{ ml: '10px' }}>
            {item.name}
          </ListItemText>
          <IconButton size='small' onClick={() => props.dispatch({ type: 'sub', id: item.id })}>
            <Icon fontSize='small'>remove_circle</Icon>
          </IconButton>
          <Typography variant="body1" width={"60px"} align={'center'}>
            {item.num}
          </Typography>
          <IconButton size='small' onClick={() => props.dispatch({ type: 'add', id: item.id })}>
            <Icon fontSize='small'>add_circle</Icon>
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Button variant="contained" onClick={() => { props.setOpenPay(true); }}>submit order</Button>
  </Paper >
}