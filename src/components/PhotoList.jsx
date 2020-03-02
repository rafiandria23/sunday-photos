import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoItem from './PhotoItem';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  photoList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
});

class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      photoDetails: false
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://pixabay.com/api/?key=15451477-5b6f0ff8bb3e146f960b22a5f&editors_choice=true'
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.photoList}>
        {
          this.state.photos
          &&
          this.state.photos.map(photo => {
            return <PhotoItem key={ photo.id } photoData={ photo } details={this.handlePhotoDetails} />;
          })
        }
      </div>
    );
  }
}

PhotoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhotoList);
