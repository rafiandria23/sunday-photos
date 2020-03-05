import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Menu, MenuItem } from '@material-ui/core';
import {
  addPhotoFavorites,
  removePhotoFavorites
} from '../actions/photoActions';

function PhotoItemMenu(props) {
  const dispatch = useDispatch();
  const { anchorEl, closeMenu, photoId } = props;
  const favoritePhotos = useSelector(
    state => state.photosReducer.favoritePhotos
  );

  const addToFavoritePhotos = e => {
    dispatch(addPhotoFavorites(photoId));
    closeMenu(e);
  };

  const removeFromFavoritePhotos = e => {
    dispatch(removePhotoFavorites(photoId));
    closeMenu(e);
  };

  const decideFavorite = () => {
    if (favoritePhotos.includes(photoId)) {
      return (
        <MenuItem onClick={removeFromFavoritePhotos} onClose={closeMenu}>
          Remove from Favorites
        </MenuItem>
      );
    } else {
      return (
        <MenuItem onClick={addToFavoritePhotos} onClose={closeMenu}>
          Add to Favorites
        </MenuItem>
      );
    }
  };

  return (
    <Menu
      id='photo-item-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={closeMenu}
    >
      <MenuItem component={Link} to={`/photos/${photoId}`} onClose={closeMenu}>
        View Details
      </MenuItem>
      {decideFavorite()}
    </Menu>
  );
}

export default PhotoItemMenu;
