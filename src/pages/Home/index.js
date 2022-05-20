import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Copyright from '../../components/Copyright';
import { getCategoriesRequest } from '../../utils/requests'
import MyAppBar from '../../components/MyAppBar';
import { CardActionArea } from '@mui/material';

export default function Home() {
  const [categories, setCategories] = React.useState([]);

  const handleAddrSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/search";
  }

  const handleCategoryClick = (id) => {
    window.location.href = "/search?categoryId=" + id;
  }

  React.useEffect(() => {
    getCategoriesRequest(setCategories);
  }, []);

  return (
    <div>
      <CssBaseline />
      <MyAppBar />
      <main>
        <Box
          sx={{
            //backgroundImage: 'url("https://oss.fd.shimonzhan.com/home/testcover.jpg") no-repeat left top',
            //backgroundColor: '#000000',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Food Delivery
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Find Your Favourite Food
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleAddrSubmit}
            >
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <TextField id="Postcode" label="Postcode" variant="outlined" />
                <Button type="submit" variant="contained">find</Button>
              </Stack>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={2}>
            {categories.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                  <CardActionArea onClick={(event) => {
                    event.preventDefault();
                    handleCategoryClick(card.id);
                  }}>
                    <CardMedia
                      component="img"
                      image={card.photo}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
    </div>
  );
}