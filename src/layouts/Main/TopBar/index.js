import React, { useState }from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { siteList } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: '#000',
    display: 'flex',
    height: 36,
    padding: '0 20px',
  },
  menuItem: {
    minHeight: 'auto',
    padding: 0,
    color:'white',
  },
  menuPaper: {
    backgroundColor: '#000000',
    top: '34px !important',
  },
  navItem: {
    cursor: 'pointer',
    marginRight: 40,

  },
  navItemOthers: {
    padding: '6px',
    width: '100%',
  },
}));

const Template = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    anchorEl: null,
  });

  const handleOpenMenu = (event) => {
    setState({ 
      ...state, 
      anchorEl: event.currentTarget
    });
  };

  const handleCloseMenu = () => {
    setState({ 
      ...state, 
      anchorEl: null
    });
  };

  return (
    <div>
      <Box className={classes.root} display={{ xs: 'none !important', sm: 'flex !important', md: 'flex' }}>
        {
          siteList.map((site) => (
            <a href={site.link}>
              <span className={classes.navItem}>{site.title}</span>
            </a>
          ))
        }
      </Box>

      {/*****For mobile view*****/}
      <Box className={classes.root} display={{ xs: 'flex !important', sm: 'none !important', md: 'none !important' }}>
        {
          siteList.map((site, index) => (
            index <= 1 && (
              <a href={site.link}>
                <span className={classes.navItem}>{site.title}</span>
              </a>
            )
          ))
        }
        <a href="#" aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu}>
          <span className={classes.navItem} style={{ marginRight: '20px' }}>
            Others
            <ArrowDropDownIcon/>
          </span>
        </a>
        <Menu
          id="simple-menu"
          anchorEl={state.anchorEl}
          keepMounted
          open={Boolean(state.anchorEl)}
          onClose={handleCloseMenu}
          classes={{
            paper: classes.menuPaper
          }}
        >
          {
            siteList.map((site, index) => (
              index > 1 && (
                <MenuItem className={classes.menuItem}>
                  <a href={site.link} className={classes.navItemOthers} onClick={handleCloseMenu}>
                    {site.title}
                  </a>
                </MenuItem>
              )
            ))
          }
        </Menu>
      </Box>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);
