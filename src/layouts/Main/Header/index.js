import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { Link } from 'react-router-dom';

import Logo from '../../../assets/img/logo.png';

import { navMenuItems, socialLinks } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: '#161616',
    borderBottom: '1px solid #525252',
    display: 'flex',
    minHeight: 48,
    padding: '0 16px',
    justifyContent: 'space-between',
  },
  active: {
    borderBottom: '3px solid #6b50ff',
    color: '#A8A8A8'
  },
  drawerPaper: {
    backgroundColor: '#161616',
    padding: '0 16px',
    top: '84px',
  },
  logo: {
    width: 80
  },
  logoText: {
    color: '#E8E8E8',
    marginLeft: 6,
  },
  menuIcon: {
    fill: '#E8E8E8',
    marginRight: '20px'
  },
  navItem: {
    color:'white',
    display: 'inline-block',
    fontWeight: 'bold',
    height: '100%',
    marginRight: 0,
    padding: '12px 16px',
    textDecoration: 'none !important',
    '&:hover': {
      borderBottom: '3px solid #6b50ff',
    }
  },
  navItemDrawer: {
    display: 'inline-block',
    fontWeight: 'bold',
    marginRight: 0,
    padding: '12px 0 4px',
    textDecoration: 'none !important',
  },
  navMenu: {
    height: '100%',
    marginLeft: 25,
    
  },
  socialIcon: {
    marginRight: 13,
  },
}));

const Header = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    openMenu: false,
  });
  const location = useLocation();

  const handlerToggleMenu = (openMenu) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ 
      ...state, 
      openMenu,
    });
  };

  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center" height="100%">
        <Box display={{ xs:'block', sm:'none' }}>
          {
            state.openMenu?
              <CloseIcon className={classes.menuIcon} onClick={handlerToggleMenu(false)}/>
              :
              <MenuIcon className={classes.menuIcon} onClick={handlerToggleMenu(true)}/>
          }
        </Box>
        <Link to="/">
          <img className={classes.logo} src={Logo}/>
          <span className={classes.logoText}>Mining Insights</span>
        </Link>

        {/*****Desktop menu*****/}
        <Box className={classes.navMenu} display={{ xs:'none', sm:'block' }}>
          {
            navMenuItems.map(navItem => (
              (navItem.title === "NEWS") ?
                  <a href={navItem.link} className={(location.pathname === navItem.link)? `${classes.navItem} ${classes.active}` : `${classes.navItem}`}>
                    { navItem.title }
                  </a>
                :
                  <Link to={navItem.link} className={(location.pathname === navItem.link)? `${classes.navItem} ${classes.active}` : `${classes.navItem}`}>
                    { navItem.title }
                  </Link>
            ))
          }
        </Box>
        
        {/*****Mobile menu*****/}
        <Box>
          <Drawer
            anchor="left" 
            open={state.openMenu} 
            onClose={handlerToggleMenu(false)}
            classes={{
              paper: classes.drawerPaper,
            }}
            BackdropProps={{ style: { top: '84px'} }}
            ModalProps={{ style: { top: '84px'} }}
          >
            {
              navMenuItems.map(navItem => (
                (navItem.title === "NEWS") ?
                    <a href={navItem.link} className={(location.pathname === navItem.link)? `${classes.navItemDrawer} ${classes.active}` : `${classes.navItemDrawer}`}
                      onClick={handlerToggleMenu(false)}
                    >
                      { navItem.title }
                    </a>
                  :
                    <Link to={navItem.link} className={(location.pathname === navItem.link)? `${classes.navItemDrawer} ${classes.active}` : `${classes.navItemDrawer}`}
                      onClick={handlerToggleMenu(false)}
                    >
                      { navItem.title }
                    </Link>
              ))
            }
          </Drawer>
        </Box>
      </Box>
      {/* <Box display="flex">
        {
          socialLinks.map(social => (
            <a href={social.link} target="_blank" class="header_social-link w-inline-block">
              {social.icon}
            </a>
          ))
        }
      </Box> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
