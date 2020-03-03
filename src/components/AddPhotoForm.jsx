import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center'
    }
  }
}));

export default function AddPhotoForm(props) {
  const [user, setUser] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const favorites = 0;
  const downloads = 0;
  const { addPhoto } = props;

  const handleUsernameChange = e => {
    setUser(e.target.value);
  };

  const handleUserImageURLChange = e => {
    setUserImageURL(e.target.value);
  };

  const handlePhotoURLChange = e => {
    setLargeImageURL(e.target.value);
  };

  const handlePhotoTagsChange = e => {
    setTags(e.target.value);
  };

  const handleAddPhoto = e => {
    e.preventDefault();
    const addPhotoData = {
      user,
      userImageURL,
      largeImageURL,
      tags,
      favorites,
      downloads
    };
    addPhoto(addPhotoData);
  };

  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleAddPhoto}>
      <Typography variant='h5'>Add Photo Form</Typography>
      <TextField
        label='Username'
        variant='outlined'
        onChange={handleUsernameChange}
        value={user}
      />
      <TextField
        label='Profile Photo URL'
        variant='outlined'
        onChange={handleUserImageURLChange}
        value={userImageURL}
      />
      <TextField
        label='Photo URL'
        variant='outlined'
        onChange={handlePhotoURLChange}
        value={largeImageURL}
      />
      <TextField
        label='Tags'
        variant='outlined'
        onChange={handlePhotoTagsChange}
        value={tags}
      />
      <Button type='submit' variant='contained' color='primary'>
        Add Photo
      </Button>
    </form>
  );
}
