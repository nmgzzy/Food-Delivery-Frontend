import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Button from '@mui/material/Button';
import { UseUser } from './UserContext'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function MyAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { user, logout } = UseUser();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.location.href = '/search?keyword=' + data.get('search');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        handleMenuClose();
        if (user.id === 0) {
          window.location.href = '/login';
        }
        else {
          if (user.roleId === "ROLE_CUSTOMER") {
            window.location.href = '/profile';
          }
          else if (user.roleId === "ROLE_RESTAURANT_OWNER") {
            window.location.href = '/restaurantmanage';
          }
          else if (user.roleId === "ROLE_ADMIN") {
            window.location.href = '/adminmanage';
          }
        }
      }}>Profile</MenuItem>
      <MenuItem onClick={() => {
        handleMenuClose();
        if (user.id === 0) {
          window.location.href = '/login';
        }
        else {
          if (user.roleId === "ROLE_CUSTOMER") {
            window.location.href = '/order';
          }
          else if (user.roleId === "ROLE_RESTAURANT_OWNER") {
            window.location.href = '/restaurantmanage';
          }
          else if (user.roleId === "ROLE_ADMIN") {
            window.location.href = '/adminmanage';
          }
        }
      }}>My order</MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); logout(); }}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{
          display: "flex",
          justifyContent: 'space-between',
        }}>
          <Button
            href='/'
            size="large"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2 }}>
            <DeliveryDiningIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Food Delivery
            </Typography>
          </Button>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search restaurant or food name"
              inputProps={{ 'aria-label': 'search' }}
            />
            <Button variant='contained'>Search</Button>
          </Search> */}
          <Box
            component="form"
            noValidate
            sx={{
              maxWidth: '400px'
            }}
            onSubmit={handleSubmit}
          >
            <Stack
              direction="row"
              spacing={2}
              display="flex"
              sx={{
                height: "40px",
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <SearchIcon />
              <TextField id="search" name="search" label="search" variant="outlined" size='small' fullWidth/>
              <Button type="submit" variant="contained">find</Button>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={1} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="Remy Sharp" src={user.avatar} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
