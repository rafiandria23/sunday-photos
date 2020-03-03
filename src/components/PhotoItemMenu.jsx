import React, { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';

function PhotoItemMenu(props) {
  // const [menus, setMenus] = useState(props.menus);
  const [viewDetailsStatus, setViewDetailsStatus] = useState(false);
  const anchorEl = props.anchorEl;
  const handleClose = props.closeMenu;
  const photoData = props.photoData;

  const viewDetails = e => {
    e.preventDefault();
    setViewDetailsStatus(viewDetailsStatus => !viewDetailsStatus);
    console.log('Successfully viewed!');
  };

  return (
    <Menu
      id='photo-item-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={viewDetails}>View Details</MenuItem>
    </Menu>
  );
}

export default PhotoItemMenu;
