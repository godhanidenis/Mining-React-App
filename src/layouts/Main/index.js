import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import TopBar from './TopBar';
import Header from './Header';
import LeftMenu from './LeftMenu';
import Footer from './Footer';
import SimplifiedFooter from './SimplifiedFooter';

import { isEmbed } from '../../constants';

const useStyles = makeStyles({
  box: {
    backgroundColor: '#262626',
    // height: 'calc(100vh - 36px - 48px - 88px)',
  },
  content: {
    backgroundColor: '#262626',
    flex: 1,
    margin: 'auto',
    padding: '2rem',
  }
});

function MainLayout(props) {
  const classes = useStyles();
  const location = useLocation();
  return (
    <Box height={isEmbed(location.pathname) ? 'initial' : '100vh'}>
      { 
        isEmbed(location.pathname) ?
          <div>
            <Box className={classes.box} display="flex" margin="auto">
              { props.children }
            </Box>
            {/* <Footer/> */}
            <SimplifiedFooter/>
          </div>
        :
          <Box display="flex" flexDirection="column" height="100%">
            <TopBar/>
            <Header/>
            <Box className={classes.box} display="flex" margin="auto" width="100%" flex="0 0 auto" minHeight="calc(100% - 36px - 48px - 87px)">
              { 
                ( location.pathname === '/cost-to-mine' || location.pathname === '/profitability-calculator' )? 
                  props.children
                : 
                  <Box display="flex" margin="auto">
                    {
                      ( location.pathname === '/cost-to-mine' || location.pathname === '/profitability-calculator' ) && <LeftMenu/>
                    }
                    <div className={classes.content}>
                      {props.children}
                    </div>
                  </Box>
              }
            </Box>
            {/* <Footer/> */}
            <SimplifiedFooter/>
          </Box>
      }
    </Box>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
