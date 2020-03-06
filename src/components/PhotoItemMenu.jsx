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

  const addToFavoritePhotos = () => {
    dispatch(addPhotoFavorites(photoId));
    // closeMenu();
  };

  const removeFromFavoritePhotos = () => {
    dispatch(removePhotoFavorites(photoId));
    // closeMenu();
  };

  const decideFavorite = () => {
    if (favoritePhotos.includes(photoId)) {
      return (
        <MenuItem data-testid='remove-favorite-button' onClick={removeFromFavoritePhotos} onClose={closeMenu}>
          Remove from Favorites
        </MenuItem>
      );
    } else {
      return (
        <MenuItem data-testid='add-favorite-button' onClick={addToFavoritePhotos} onClose={closeMenu}>
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
      <MenuItem data-testid='view-detail-button' component={Link} to={`/photos/${photoId}`} onClose={closeMenu}>
        View Details
      </MenuItem>
      {decideFavorite()}
    </Menu>
  );
}

export default PhotoItemMenu;
