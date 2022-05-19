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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import NoteDialog from './Notifications';
import MsgDialog from './MyMessage'
import { getMessagesRequest, getChatsRequest } from '../utils/requests';

export default function MyAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { user, logout } = UseUser();

  const [openNote, setOpenNote] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [updateNote, setUpdateNote] = React.useState(true);

  const [openMsg, setOpenMsg] = React.useState(false);
  const [msgs, setMsgs] = React.useState([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    if (updateNote === true) {
      setUpdateNote(false);
      getMessagesRequest(user.id, setNotes);
      getChatsRequest(user.id, setMsgs)
    }
  }, [user, updateNote])

  const handleProfileMenuOpen = (event) => {
    if (user.id === -1) {
      window.location.href = '/login';
    }
    else {
      setAnchorEl(event.currentTarget);
    }
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
  const MeneItemCustomer = (<div>
    <MenuItem onClick={() => {
      handleMenuClose();
      window.location.href = '/profile';
    }}>Profile</MenuItem>
    <MenuItem onClick={() => {
      handleMenuClose();
      window.location.href = '/order';
    }}>My order</MenuItem>
  </div>);

  const MeneItemOwner = (<MenuItem onClick={() => {
    handleMenuClose();
    window.location.href = '/restaurantmanage';
  }}>Restaurant Manage</MenuItem>);

  const MeneItemAdmin = (<MenuItem onClick={() => {
    handleMenuClose();
    window.location.href = '/adminmanage';
  }}>Admin Manage</MenuItem>);

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
      {
        user.roleId === "ROLE_CUSTOMER" ? MeneItemCustomer :
          user.roleId === "ROLE_RESTAURANT_OWNER" ? MeneItemOwner :
            user.roleId === "ROLE_ADMIN" ? MeneItemAdmin : ""
      }
      <MenuItem onClick={() => {
        handleMenuClose();
        if (user.id === -1) {
          window.location.href = '/login';
        }
        else {
          logout();
        }
      }}>{user.id === -1 ? "Log in" : "Log out"}</MenuItem>
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
      <MenuItem onClick={() => { setOpenMsg(true); }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={msgs.length} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={() => { setOpenNote(true); }}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={notes.length} color="error">
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
        <p>Me</p>
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
          <Box
            component="form"
            noValidate
            sx={{
              maxWidth: '600px'
            }}
            onSubmit={handleSubmit}
          >
            <TextField id="search" name="search" label="search" variant="outlined" size='small' fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>)
              }} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => { setOpenMsg(true); }}
            >
              <Badge badgeContent={msgs.length} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => { setOpenNote(true); }}
            >
              <Badge badgeContent={notes.length} color="error">
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
      <NoteDialog
        open={openNote}
        setOpen={setOpenNote}
        notes={notes}
        setUpdateNote={setUpdateNote}
      />
      <MsgDialog
        open={openMsg}
        setOpen={setOpenMsg}
        msgs={msgs}
        id={user.id}
      />
    </Box>
  );
}
