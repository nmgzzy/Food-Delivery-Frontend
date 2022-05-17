import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import UploadPhoto from './UploadPhoto';
import { addMenuRequest, updateMenuRequest } from '../utils/requests'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function MenuCard(props) {
  const { item, dispatch, defaultImg } = props;
  const [num, setNum] = React.useState(0);
  return <Paper
    sx={{
      p: 2,
      width: '100%',
      backgroundColor: '#fffdf0',
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {/* <Box sx={{ width: 128, height: 128 }}> */}
        <Img alt="complex" src={item.photo ? item.photo : defaultImg} />
        {/* </Box> */}
      </Grid>
      <Grid item xs={8} container direction="column">
        <Grid item container spacing={1}>
          <Grid item xs={10}>
            <Typography gutterBottom variant="subtitle1" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {item.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {item.id}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" component="div">
              £{item.price}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={1} justifyContent="space-between" alignItems="flex-end">
          <Grid item xs={2}>
            <IconButton onClick={() => { if (num > 0) { setNum(num - 1) } }}><Icon fontSize='small'>remove_circle</Icon></IconButton>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" width={"70px"} align={'center'}> {num} </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => { setNum(num + 1) }}><Icon fontSize='small'>add_circle</Icon></IconButton>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ marginInline: '5px', height: '35px' }}
              onClick={() => { dispatch({ type: 'append', id: item.id, name: props.item.name, photo: props.item.photo, num: num }) }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
}

export function MenuCardChange(props) {
  const { item, button, addCallback, setOpen, restaurantId } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (restaurantId >= 0) {
      const data = new FormData(event.currentTarget);
      var menuItem = {
        description: data.get("description"),
        id: item.id,
        name: data.get('name'),
        price: data.get('price'),
        restaurantId: restaurantId,
        status: item.status,
        photo: item.photo
      };
      if (addCallback) {
        addMenuRequest(menuItem, () => {
          addCallback[1](addCallback[0] + 1);
          setOpen({ open: true, msg: "Update Menu ok", type: "success" });
        });
      }
      else {
        updateMenuRequest(menuItem);
      }
    }
    else {
      setOpen({ open: true, msg: "Create Restaurant Before Add Menu", type: "error" });
    }

  };

  return <Grid item>
    <Paper
      sx={{
        p: 2,
        margin: '10px',
        width: '100%',
        flexGrow: 1,
      }}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={8} container direction="column" spacing={2}>
            step1:
            <Typography variant="body2" color="text.secondary">
              ID: {item.id}
            </Typography>
            <Grid item xs>
              <TextField fullWidth id="name" name='name' label="name" variant="outlined" defaultValue={item.name} sx={{ backgroundColor: "#fff" }} />
            </Grid>
            <Grid item xs>
              <TextField fullWidth id="description" name='description' label="description" variant="outlined" defaultValue={item.description} sx={{ backgroundColor: "#fff" }} />
            </Grid>
            <Grid item xs>
              <TextField fullWidth id="price" name='price' label="price" variant="outlined" defaultValue={item.price} sx={{ backgroundColor: "#fff" }} />
            </Grid>
            <Grid item xs>
              <Button
                type='submit'
                variant="contained"
                sx={{ marginInline: '5px', height: '35px' }}
              >
                {button}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            step2:
            <UploadPhoto
              url={'menu/updateMenuPhoto?menuId=' + item.id}
              defaultImage={item.photo}
              sx={{ maxWidth: 300, m: '10px' }}
              alt='menu item'
              setOpen={setOpen}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  </Grid >
}