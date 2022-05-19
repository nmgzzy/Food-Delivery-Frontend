import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { chatRequest } from '../utils/requests';
import { Button, TextField } from '@mui/material';

export default function MsgDialog(props) {
  const { open, setOpen, msgs, id } = props;

  const handleSubmit = (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    chatRequest(id, data.get('to'), data.get('content'));
  }

  return (
    <Dialog open={open} onClose={() => { setOpen(false) }} fullWidth>
      <DialogTitle>Messages</DialogTitle>
      <List>
        {msgs.map((item) => (
          <ListItem
            key={item.id}
            // secondaryAction={
            //   <IconButton edge="end" aria-label="delete">
            //     <DeleteIcon />
            //   </IconButton>
            // }
          >
            <ListItemAvatar>
              <Avatar>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.from+': '+item.fromName} secondary={item.content} />
          </ListItem>
        ))}
      </List>
      <Paper component={'form'} onSubmit={handleSubmit} noValidate sx={{ m: 1, p: 1 }}>
        <TextField id='to' name='to' label='to Id' size='small' sx={{bgcolor:'#fff', mb: 1}} fullWidth></TextField>
        <TextField id='content' name='content' label='content' size='small' multiline rows={4} sx={{bgcolor:'#fff', mb:1}} fullWidth></TextField>
        <Button variant='contained' size='small' type='submit' fullWidth sx={{p:1}}>send</Button>
      </Paper>
    </Dialog>
  );
}
