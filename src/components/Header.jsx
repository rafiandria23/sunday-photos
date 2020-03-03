import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from '@material-ui/core';
import { withStyles, fade } from '@material-ui/core/styles';
import { Menu, Search } from '@material-ui/icons';

const styles = theme => ({
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
});

class Header extends Component {
  render() {
    const { classes } = this.props;
    const handleSearch = this.props.handleSearch;
    const searchQuery = this.props.searchQuery;
    return (
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
            >
              <Menu />
            </IconButton>
            <Typography className={classes.title} variant='h6' noWrap>
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
                inputProps={ { 'aria-label': 'search' } }
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propsTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
