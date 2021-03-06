import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { getCategoriesRequest, SearchRequest } from '../../utils/requests'
import MyAppBar from '../../components/MyAppBar';
import queryString from 'query-string';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';

const drawerWidth = 220;
const cardNumber = 12;

export default function Search() {
  const [categories, setCategories] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState({
    current: 1,
    orders: [],
    pages: 1,
    records: [],
    size: 12,
    total: 0,
  });
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    getCategoriesRequest(setCategories);

    const qs = queryString.parse(window.location.search)
    var tmp = {
      categoryId: "",
      keyword: "",
      pageCurrent: page,
      pageSize: cardNumber
    }
    if (qs.categoryId) {
      tmp.categoryId = qs.categoryId;
    }
    if (qs.keyword) {
      tmp.keyword = qs.keyword;
    }
    SearchRequest(tmp, setRestaurants);
  }, [page]);

  const handleRestaurantClick = (id) => {
    window.location.href = "/restaurant?restaurantId="+id;
  }

  const handleCategoryClick = (id) => {
    window.location.href = "/search?categoryId=" + id;
  }

  return <div>
    <MyAppBar />
    <CssBaseline />
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
      <Drawer
        variant="permanent"
        sx={{
          maxWidth: drawerWidth,
          flex: 1,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            position: "inherit",
          },
        }}
      >
        <List component="nav">
          <React.Fragment>
            {categories.map((item) => (
              <ListItemButton key={item.id} onClick={(event) => {
                event.preventDefault();
                handleCategoryClick(item.id);
              }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </React.Fragment>
        </List>
      </Drawer>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={2}>
          {restaurants.records.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardActionArea onClick={(event) => {
                  event.preventDefault();
                  handleRestaurantClick(card.id);
                }}>
                  <CardMedia
                    component="img"
                    image={card.avatar}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Rating name="read-only" value={card.mark} precision={0.1} readOnly />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination count={restaurants.pages} shape="rounded" size='large' page={restaurants.current} onChange={(event, value) => {
          setPage(value);
        }} sx={{ mt: "30px" }} />
      </Container>
    </Box>
  </div>
}