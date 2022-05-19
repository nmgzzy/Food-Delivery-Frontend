import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { readMessageRequest } from '../utils/requests';

export default function NoteDialog(props) {
  const { open, setOpen, notes, setUpdateNote } = props;

  return (
    <Dialog open={open} onClose={() => { setOpen(false) }} fullWidth>
      <DialogTitle>Notifications</DialogTitle>
      <List>
        {notes.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={()=>{
                readMessageRequest(item.id, setUpdateNote);
              }}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.fromName} secondary={item.content} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
