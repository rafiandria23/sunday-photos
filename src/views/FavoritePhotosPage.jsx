import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoItem from '../components/PhotoItem';

const useStyles = makeStyles({
  favoritePhotosPage: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20vh'
  }
});

export default function FavoritePhotosPages(props) {
  const classes = useStyles();
  const photos = useSelector(state => state.photosReducer.photos);
  const favoritePhotos = useSelector(
    state => state.photosReducer.favoritePhotos
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(favoritePhotos ? true : false);
  }, [isLoaded, favoritePhotos]);

  const showFavoritePhotos = () => {
    const result = [];
    favoritePhotos.forEach(photoId => {
      photos.forEach(photo => {
        if (photoId === photo.id) {
          result.push(<PhotoItem key={photo.id} photoData={photo} />);
        }
      });
    });
    return result;
  };

  return (
    <Container className={classes.favoritePhotosPage}>
      {isLoaded && showFavoritePhotos()}
    </Container>
  );
}
