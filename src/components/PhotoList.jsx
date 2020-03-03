import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoItem from './PhotoItem';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  photoList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: '20vh'
  }
});

class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: this.props.photos
    };
  }

  handleRender = () => {
    const { photos } = this.state;
    const { searchQuery } = this.props;
    if (searchQuery.length > 0) {
      const filteredPhotos = this.state.photos.filter(photo => {
        return (
          photo.tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.user.toLowerCase().includes(searchQuery.toLowerCase())
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

  render() {
    const { classes } = this.props;
    return <div className={classes.photoList}>{this.handleRender()}</div>;
  }
}

PhotoList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotoList);
