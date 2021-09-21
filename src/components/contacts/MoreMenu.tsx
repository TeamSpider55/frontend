import React, { useState, useRef } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  contactId: string;
  deleteContact(id: string): void;
}

const MoreMenu = ({ contactId, deleteContact }: Props) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={isOpen}
        // this raises a warning when , because Material UI uses a
        // deprecated method. Does not seem to affect usage.
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={
          {
            sx: { width: 200, maxWidth: '100%' },
          } as any
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={Box} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => deleteContact(contactId)}
          />
        </MenuItem>

        <MenuItem component={Box} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoreMenu;
