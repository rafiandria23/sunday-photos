import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Fab, Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Remove } from '@material-ui/icons';
import Header from './components/Header';
// import logo from './logo.svg';
// import './App.css';
import PhotoList from './components/PhotoList';
import AddPhotoForm from './components/AddPhotoForm';

const useStyles = makeStyles(theme => ({
  customFab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  addPhotoForm: {
    margin: 0,
    padding: 20,
    top: 'auto',
    right: 20,
    bottom: 100,
    left: 'auto',
    position: 'fixed'
  },
  loadingSpinner: {
    marginTop: '20vh',
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function App(props) {
  const [photos, setPhotos] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        'https://pixabay.com/api/?key=15451477-5b6f0ff8bb3e146f960b22a5f&editors_choice=true&order=latest'
      )
      .then(({ data }) => {
        setIsLoading(false);
        setPhotos(data.hits);
        console.log(data.hits);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err.response);
      });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleAddPhotoForm = () => {
    setShowAddPhotoForm(!showAddPhotoForm);
  };

  const addPhoto = addPhotoData => {
    addPhotoData.id = photos[photos.length - 1].id + 1;
    setPhotos([...photos, addPhotoData]);
    handleAddPhotoForm();
  };

  const classes = useStyles();

  return (
    <div id='app'>
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />
      {isLoading && (
        <div className={classes.loadingSpinner}>
          <CircularProgress />
        </div>
      )}
      {/*!isLoading &&*/ photos && (
        <>
          <PhotoList photos={photos} searchQuery={searchQuery} />
          {!showAddPhotoForm && (
            <Fab
              className={classes.customFab}
              onClick={handleAddPhotoForm}
              color='primary'
              aria-label='add'
            >
              <Add />
            </Fab>
          )}
          {showAddPhotoForm && (
            <Fab
              className={classes.customFab}
              onClick={handleAddPhotoForm}
              color='primary'
              aria-label='add'
            >
              <Remove onClick={handleAddPhotoForm} />
            </Fab>
          )}
          {showAddPhotoForm && (
            <Paper elevation={5} className={classes.addPhotoForm}>
              <AddPhotoForm addPhoto={addPhoto} />
            </Paper>
          )}
        </>
      )}
    </div>
  );
}
