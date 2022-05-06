import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { IconButton } from '@mui/material';
// import Icon from '@mui/material/Icon';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
// import {  } from '../utils/requests'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Paper from '@mui/material/Paper';

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
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title="title"/>
      <CardContent>
        正文
      </CardContent>
      <CardActions disableSpacing>
        <Button variant='contained'>取消</Button>
        <Button variant='contained'>其他操作</Button>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          展开内容
        </CardContent>
      </Collapse>
    </Card>
  );
}


export function OrderCard(props) {
  const { order } = props;

  // beginTime: null
  // customerAddressId: 57
  // customerId: 25
  // deliveredTime: null
  // deliveryManName: null
  // deliveryManPhone: null
  // estimatedDeliveryTime: null
  // id: 23
  // restaurantAddressId: 58
  // restaurantId: 197
  // status: "PENDING_PAYMENT"
  // totalPrice: 3
  return <Item>
    <RecipeReviewCard></RecipeReviewCard>
  </Item>
}