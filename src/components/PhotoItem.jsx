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
import {
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
  GetApp as GetAppIcon,
  LocalOffer as LocalOfferIcon
} from '@material-ui/icons';
import PhotoItemMenu from './PhotoItemMenu';

const styles = theme => ({
  root: {
    maxWidth: 345,
    margin: '3vh'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  trafficDetail: {
    margin: 'auto 0.3vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  openMenu = e => {
    e.preventDefault();
    this.setState({
      anchorEl: e.currentTarget
    });
  };

  closeMenu = e => {
    e.preventDefault();
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { classes, photoData } = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar src={photoData.userImageURL} aria-label='recipe' />}
          action={
            <IconButton aria-label='settings' onClick={this.openMenu}>
              <MoreVertIcon />
              <PhotoItemMenu
                anchorEl={this.state.anchorEl}
                closeMenu={this.closeMenu}
                photoId={photoData.id}
              />
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
          <div className={classes.trafficDetail}>
            <IconButton aria-label='Favorites'>
              <FavoriteIcon />
            </IconButton>
            <Typography variant='body2' color='textSecondary' component='p'>
              {photoData.favorites}
            </Typography>
          </div>

          <div className={classes.trafficDetail}>
            <IconButton aria-label='Downloads'>
              <GetAppIcon />
            </IconButton>
            <Typography variant='body2' color='textSecondary' component='p'>
              {photoData.downloads}
            </Typography>
          </div>

          <div className={classes.trafficDetail}>
            <IconButton aria-label='Tags'>
              <LocalOfferIcon />
            </IconButton>
            <Typography variant='body2' color='textSecondary' component='p'>
              {photoData.tags
                .split(', ')
                .map(tag => `${tag[0].toUpperCase()}${tag.slice(1)}`)
                .join(', ')}
            </Typography>
          </div>
        </CardActions>
      </Card>
    );
  }
}

PhotoItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotoItem);
