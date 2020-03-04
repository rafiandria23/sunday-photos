import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header, PhotoList } from './components';

const useStyles = makeStyles(theme => ({
  loadingSpinner: {
    marginTop: '20vh',
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function App(props) {
  const [photos, setPhotos] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const addPhotoParent = addPhotoData => {
    setPhotos([...photos, addPhotoData]);
  };

  const classes = useStyles();

  return (
    <div id='app'>
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />
      <Switch>
        {isLoading && (
          <div className={classes.loadingSpinner}>
            <CircularProgress />
          </div>
        )}
        <Route path='/photos'>
          {!isLoading && photos && (
            <PhotoList
              photos={photos}
              searchQuery={searchQuery}
              addPhotoParent={addPhotoParent}
            />
          )}
        </Route>
        <Route exact path='/'>
          <Redirect to='/photos' />
        </Route>
      </Switch>
    </div>
  );
}
