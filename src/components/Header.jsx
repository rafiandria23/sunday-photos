import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Menu, Search } from '@material-ui/icons';
import LeftDrawer from './LeftDrawer';
import { setSearchQuery } from '../actions/searchActions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [leftDrawerStatus, setLeftDrawerStatus] = useState(false);
  const searchQuery = useSelector(state => state.searchReducer.searchQuery);

  const handleDrawer = () => {
    setLeftDrawerStatus(!leftDrawerStatus);
  };

  const handleSearch = e => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography data-testid='header-title' className={classes.title} variant='h6' noWrap>
            Sunday Photos
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder='Search by tags...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
      <LeftDrawer
        leftDrawerStatus={leftDrawerStatus}
        handleDrawer={handleDrawer}
      />
    </div>
  );
}
