import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ContentCut from '@mui/icons-material/ContentCut';
// import ContentCopy from '@mui/icons-material/ContentCopy';
// import ContentPaste from '@mui/icons-material/ContentPaste';
// import Cloud from '@mui/icons-material/Cloud';

export default function IconMenu() {
  return (
    <Paper sx={{maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          {/* <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon> */}
          <ListItemText>Chinese food</ListItemText>
        </MenuItem>
        <MenuItem>
          {/* <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon> */}
          <ListItemText>English food</ListItemText>
        </MenuItem>
        <MenuItem>
          {/* <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon> */}
          <ListItemText>Italian food</ListItemText>
        </MenuItem>
        <MenuItem>
          {/* <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon> */}
          <ListItemText>American food</ListItemText>
        </MenuItem>
        <MenuItem>
          {/* <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon> */}
          <ListItemText>Indian food</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
