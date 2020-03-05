import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, CardMedia, IconButton, Typography } from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  GetApp as GetAppIcon,
  Comment as CommentIcon
} from '@material-ui/icons';

const useStyles = makeStyles({
  photoItemDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '3vh'
  },
  photoDetailProperty: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  img: {
    width: 'auto',
    height: 'auto',
    maxWidth: '720px',
    objectFit: 'contain',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px'
  }
});

export default function PhotoItemDetail(props) {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentPhoto = useSelector(state => state.photosReducer.currentPhoto);

  useEffect(() => {
    setIsLoaded(currentPhoto ? true : false);
  }, [currentPhoto]);

  return (
    <>
      {isLoaded && (
        <Paper elevation={5} className={classes.photoItemDetail}>
          <CardMedia
            className={classes.img}
            component='img'
            src={currentPhoto.largeImageURL}
          />
          <div>
            <div className={classes.photoDetailProperty}>
              <IconButton size='medium'>
                <FavoriteIcon fontSize='medium' />
              </IconButton>
              <Typography variant='p'>
                {currentPhoto.favorites} Likes
              </Typography>
            </div>

            <div className={classes.photoDetailProperty}>
              <IconButton size='medium'>
                <GetAppIcon fontSize='medium' />
              </IconButton>
              <Typography variant='p'>
                {currentPhoto.downloads} Downloads
              </Typography>
            </div>

            <div className={classes.photoDetailProperty}>
              <IconButton size='medium'>
                <CommentIcon fontSize='medium' />
              </IconButton>
              <Typography variant='p'>
                {currentPhoto.comments} Comments
              </Typography>
            </div>
          </div>
        </Paper>
      )}
    </>
  );
}
