import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Fab, Paper } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { PhotoItem, AddPhotoForm } from '.';
import { addPhoto } from '../actions/photoActions';

const styles = theme => ({
  photoList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '20vh'
  },
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

class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPhotoForm: false
    };
  }

  handleRender = () => {
    const { photos, searchQuery } = this.props;
    if (searchQuery.length > 0) {
      const filteredPhotos = photos.filter(photo => {
        return (
          photo.tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.downloads
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
      return filteredPhotos.map(photo => {
        return <PhotoItem key={photo.id} photoData={photo} />;
      });
    } else {
      return photos.map(photo => {
        return <PhotoItem key={photo.id} photoData={photo} />;
      });
    }
  };

  handleAddPhotoForm = () => {
    const { showAddPhotoForm } = this.state;
    this.setState({
      showAddPhotoForm: !showAddPhotoForm
    });
  };

  addPhotoToState = addPhotoData => {
    const { photos, addPhoto } = this.props;
    addPhotoData.id = photos[photos.length - 1].id + 1;
    addPhoto(addPhotoData);
    this.handleAddPhotoForm();
  };

  render() {
    const { showAddPhotoForm } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.photoList}>{this.handleRender()}</div>
        {!showAddPhotoForm && (
          <Fab
            className={classes.customFab}
            onClick={this.handleAddPhotoForm}
            color='primary'
            aria-label='add'
          >
            <AddIcon />
          </Fab>
        )}
        {showAddPhotoForm && (
          <Fab
            className={classes.customFab}
            onClick={this.handleAddPhotoForm}
            color='primary'
            aria-label='add'
          >
            <RemoveIcon onClick={this.handleAddPhotoForm} />
          </Fab>
        )}
        {showAddPhotoForm && (
          <Paper elevation={5} className={classes.addPhotoForm}>
            <AddPhotoForm addPhoto={this.addPhotoToState} />
          </Paper>
        )}
      </>
    );
  }
}

PhotoList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    photos: state.photosReducer.photos,
    searchQuery: state.searchReducer.searchQuery
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPhoto: newPhotoData => dispatch(addPhoto(newPhotoData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PhotoList));
