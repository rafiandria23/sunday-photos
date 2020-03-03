import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Fab, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add, Remove } from '@material-ui/icons';
import Header from './components/Header';
// import logo from './logo.svg';
// import './App.css';
import PhotoList from './components/PhotoList';
import AddPhotoForm from './components/AddPhotoForm';

const styles = theme => ({
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
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      searchQuery: '',
      showAddPhotoForm: false
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://pixabay.com/api/?key=15451477-5b6f0ff8bb3e146f960b22a5f&editors_choice=true&order=latest'
      )
      .then(({ data }) => {
        this.setState({
          photos: data.hits
        });
        console.log(data.hits);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value
    });
  };

  handleAddPhotoForm = () => {
    this.setState({ showAddPhotoForm: !this.state.showAddPhotoForm });
  };

  addPhoto = addPhotoData => {
    const { photos } = this.state;
    addPhotoData.id = photos[photos.length - 1].id + 1;
    this.setState({
      photos: [...photos, addPhotoData]
    });
    this.handleAddPhotoForm();
  };

  render() {
    const { photos, searchQuery } = this.state;
    const { classes } = this.props;
    return (
      <div id='app'>
        <Header
          searchQuery={this.state.searchQuery}
          handleSearch={this.handleSearch}
        />
        {this.state.photos && (
          <>
            <PhotoList photos={photos} searchQuery={searchQuery} />
            {!this.state.showAddPhotoForm && (
              <Fab
                className={classes.customFab}
                onClick={this.handleAddPhotoForm}
                color='primary'
                aria-label='add'
              >
                <Add />
              </Fab>
            )}
            {this.state.showAddPhotoForm && (
              <Fab
                className={classes.customFab}
                onClick={this.handleAddPhotoForm}
                color='primary'
                aria-label='add'
              >
                <Remove onClick={this.handleAddPhotoForm} />
              </Fab>
            )}
            {this.state.showAddPhotoForm && (
              <Paper elevation={5} className={classes.addPhotoForm}>
                <AddPhotoForm addPhoto={this.addPhoto} />
              </Paper>
            )}
          </>
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
