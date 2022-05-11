import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { restaurantSetDeliveryManRequest, cancelOrderRequest } from '../utils/requests';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const info = [
  'status',
  'beginTime',
  'customerName',
  'customerPhone',
  'customerAddress',
  'estimatedDeliveryTime',
  'deliveredTime',
  'deliveryManName',
  'deliveryManPhone',
]
const show = [
  'status:',
  'begin time:',
  'customerName',
  'customerPhone',
  'customerAddress',
  'estimated delivery time:',
  'delivered time:',
  'deliveryman name:',
  'deliveryman phone:',
]

function DenseTable(props) {
  const { data, total } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.quantity * row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow
            key={'tp'}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Total Price:
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function BasicSelect(props) {
  const { list, orderid, update } = props;
  const [name, setName] = React.useState('');

  const handleChange = (event) => {
    let i = event.target.value;
    setName(i);
    restaurantSetDeliveryManRequest(orderid, list[i].name, list[i].phone, update[1]);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="deliveryman"> set delivery man</InputLabel>
        <Select
          labelId="deliveryman"
          id="deliveryman"
          value={name}
          label="deliveryman"
          onChange={handleChange}
        >
          {list.map((item, index) => (
            <MenuItem value={index} key={index}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export function OrderCard(props) {
  const { order, deliveryman, update, msg } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const myorder = {
    'status': order.status,
    'beginTime': order.beginTime,
    'customerName': order.customerAddress.firstName + order.customerAddress.lastName,
    'customerPhone': order.customerAddress.phone,
    'customerAddress': order.customerAddress.firstAddress + ', ' + order.customerAddress.postcode + ', ' + order.customerAddress.city,
    'deliveredTime': order.deliveredTime,
    'deliveryManName': order.deliveryManName,
    'deliveryManPhone': order.deliveryManPhone,
    'estimatedDeliveryTime': order.estimatedDeliveryTime,
  }

  return (<Item>
    <Card sx={{ width: '100%' }}>
      <CardHeader title={"Order " + order.id} />
      <CardContent>
        <Grid container spacing={3}>
          {info.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} container spacing={1}>
              <Grid item xs={5}>
                <Typography variant='body2' align='left'>{show[index]}</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant='body1' align='left'>{myorder[item]}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <BasicSelect list={deliveryman} orderid={order.id} update={update} />
        <Button
          variant='contained'
          sx={{ ml: 3, mr: 1 }}
          onClick={() => {
            cancelOrderRequest(order.id, msg, update[1]);
          }}>
          cancel
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          details
          <ExpandMoreIcon sx={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <DenseTable data={order.orderItems} total={order.totalPrice} />
        </CardContent>
      </Collapse>
    </Card>
  </Item>
  );
}









