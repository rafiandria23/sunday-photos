import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Header, PhotoList } from "./components";
import { fetchPhotos } from "./actions/photoActions";
import { setSearchQuery } from "./actions/searchActions";
import { PhotoDetailPage, FavoritePhotosPage } from "./views";

const useStyles = makeStyles(theme => ({
  loadingSpinner: {
    marginTop: "20vh",
    display: "flex",
    justifyContent: "center"
  }
}));

export default function App(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoadingReducer.isLoading);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const handleSearch = e => {
    e.preventDefault();
    dispatch(setSearchQuery(e.target.value));
  };

  const classes = useStyles();

  return (
    <div id="app">
      <Header data-testid="header" handleSearch={handleSearch} />
      <Switch>
        {isLoading && (
          <div className={classes.loadingSpinner}>
            <CircularProgress />
          </div>
        )}
        <Route path="/photos/favorites">
          <FavoritePhotosPage />
        </Route>
        <Route path="/photos/:photoID">
          <PhotoDetailPage />
        </Route>
        <Route path="/photos">
          <PhotoList />
        </Route>
        <Route exact path="/">
          <Redirect to="/photos" />
        </Route>
      </Switch>
    </div>
  );
}
