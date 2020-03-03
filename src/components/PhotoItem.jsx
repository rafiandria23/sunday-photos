import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from '@material-ui/core';
import { Favorite, MoreVert, GetApp, LocalOffer } from '@material-ui/icons';

const styles = theme => ({
  root: {
    maxWidth: 345,
    margin: '5vh'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
});

class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: this.props.photoData
    };
  }

  render() {
    const { classes } = this.props;
    const photoData = this.state.photoData;
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar src={photoData.userImageURL} aria-label='recipe' />}
          action={
            <IconButton aria-label='settings'>
              <MoreVert />
            </IconButton>
          }
          title={photoData.user}
          // subheader='September 14, 2016'
        />
        <CardMedia
          className={classes.media}
          image={photoData.largeImageURL}
          title={photoData.user}
        />
        <CardContent>
          {/* <Typography variant='body2' color='textSecondary' component='p'>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography> */}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='Favorites'>
            <Favorite />
            <Typography variant='body2' color='textSecondary' component='p'>
              {photoData.favorites}
            </Typography>
          </IconButton>
          <IconButton aria-label='Downloads'>
            <GetApp />
            <Typography variant='body2' color='textSecondary' component='p'>
              {photoData.downloads}
            </Typography>
          </IconButton>
          <IconButton aria-label='Tags'>
            <LocalOffer />
            <Typography variant='body2' color='textSecondary' component='p'>
              {photoData.tags
                .split(', ')
                .map(tag => `${tag[0].toUpperCase()}${tag.slice(1)}`)
                .join(', ')}
            </Typography>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

PhotoItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotoItem);
