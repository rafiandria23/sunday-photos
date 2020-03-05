import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getPhotoDetail } from '../actions/photoActions';
import { PhotoItemDetail } from '../components';

const useStyles = makeStyles({
  photoDetailPage: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: '15vh auto'
  }
});

export default function PhotoDetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { photoID } = useParams();

  useEffect(() => {
    dispatch(getPhotoDetail(photoID));
  }, [photoID, dispatch]);

  return (
    <Container className={classes.photoDetailPage}>
      <PhotoItemDetail />
    </Container>
  );
}
