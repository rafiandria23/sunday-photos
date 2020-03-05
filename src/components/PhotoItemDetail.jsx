import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  CardHeader,
  CardMedia,
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core";
import {
  Favorite as FavoriteIcon,
  GetApp as GetAppIcon,
  Comment as CommentIcon
} from "@material-ui/icons";

const useStyles = makeStyles({
  photoItemDetail: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "3vh"
  },
  photoDetailProperty: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  img: {
    width: "auto",
    height: "auto",
    maxWidth: "720px",
    objectFit: "contain",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    margin: 0
  },
});

export default function PhotoItemDetail(props) {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentPhoto = useSelector(state => state.photosReducer.currentPhoto);

  useEffect(() => {
    setIsLoaded(currentPhoto ? true : false);
  }, [currentPhoto]);

  return (
    <>
      {isLoaded && (
        <Paper elevation={5} className={classes.photoItemDetail}>
          <CardMedia
            className={classes.img}
            component="img"
            src={currentPhoto.largeImageURL}
          />
          <div>
            <div className={classes.photoDetailProperty}>
              <IconButton size="medium">
                <FavoriteIcon />
              </IconButton>
              <Typography variant="subtitle1">
                {currentPhoto.favorites} Likes
              </Typography>
            </div>

            <div className={classes.photoDetailProperty}>
              <IconButton size="medium">
                <GetAppIcon />
              </IconButton>
              <Typography variant="subtitle1">
                {currentPhoto.downloads} Downloads
              </Typography>
            </div>

            <div className={classes.photoDetailProperty}>
              <IconButton size="medium">
                <CommentIcon />
              </IconButton>
              <Typography variant="subtitle1">
                {currentPhoto.comments} Comments
              </Typography>
            </div>
            <CardHeader
              className={classes.root}
              avatar={
                <Avatar
                  aria-label={currentPhoto.user}
                  src={currentPhoto.userImageURL}
                  className={classes.avatar}
                />
              }
              title={currentPhoto.user}
            />
          </div>
        </Paper>
      )}
    </>
  );
}
