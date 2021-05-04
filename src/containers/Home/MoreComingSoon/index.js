import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { makeStyles } from '@material-ui/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import MIPrimaryButton from '../../../components/MIButtons/MIPrimaryButton';
import MIInput from '../../../components/MIInput';
import { homeSectionHead, homeSectionTitle } from '../../../styles';

const useStyles = makeStyles(theme => ({
  itemDescription: {
    color: '#ffffff',
    marginBottom: 30,
    marginTop: 20,
  },
  itemName: {
    fontSize: 24,
    color: '#ffffff',
  },
  link: {
    color: '#8b7cff',
    '&:hover': {
      color: '#a69dff',
    }
  },
  miningToolItem: {
    backgroundColor: '#161616',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: '20px 24px',
  },
  sectionHead: {
    marginTop: '1rem',
  },
  sectionTitle: homeSectionTitle,
  thankYou: {
    backgroundColor: '#dddddd',
    color: 'white',
    height: 48,
  },
}));

const OtherMiningTools = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    email: '',
    status: '',
  });

  // https://braiins.us19.list-manage.com/subscribe/post?u=883656ed40bf94838c8c1fb94&amp;amp;id=1b0920b3cb
  
  const handleClickSubscribe = () => {
    setState((prevState) => ({
      ...prevState,
      status: 'sending',
    }));

    // axios.post(`https://braiins.us19.list-manage.com/subscribe/post-json?u=883656ed40bf94838c8c1fb94&amp;id=1b0920b3cb&c=jQuery3410855926375624189_1604012193054&Email=${state.email}&EMAIL=${state.email}&b_883656ed40bf94838c8c1fb94_1b0920b3cb=&_=1604012193055`).then(() => {
    axios.post(`https://braiins.us19.list-manage.com/subscribe/post?u=883656ed40bf94838c8c1fb94&amp;amp;id=1b0920b3cb&Email=${state.email}&EMAIL=${state.email}&b_883656ed40bf94838c8c1fb94_1b0920b3cb=&_=1604012193055`).then(() => {
      setState((prevState) => ({
        ...prevState,
        status: 'sent',
      }));
    });
  };

  const handleChangeInput = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <div className={classes.section}>
      <div className={classes.sectionHead}>
        {/* <div className={classes.sectionTitle}>Other Mining Tools</div> */}
      </div>
      <div className={classes.miningToolItem}>
        <div>
          <span className={classes.itemName}>More coming soon...</span>
          <p className={classes.itemDescription}>
            New stats dashboard and calculators are on the way. Subscribe to get notified when we release an update.
          </p>
          {
            state.status === 'sent' ? (
              <div className={classes.thankYou}>
                Thank you for subscribing!
              </div>
            ) : (
              <div className="d-flex align-items-center w-100">
                {/* <MIInput
                  width="100%"
                  name="timePeriod"
                  height={48}
                  placeholder="Your Email"
                  // value={state.timePeriod}
                  // onKeyDown={handleOnKeyDown}
                  onChange={(e) => handleChangeInput('email', e.target.value)}
                  inputOnChange={handleChangeInput}
                /> */}
                {/* <MIPrimaryButton height={48} margin="0 0 0 0.5rem" onClick={handleClickSubscribe}>{state.status === 'sending' ? 'Please wait...' : 'Subscribe'}</MIPrimaryButton> */}
                <MIPrimaryButton height={48} width="100%">
                  <a href="https://braiins.com/mailing/mining-insights" target="_blank" style={{ color: 'white', width: '100%', display: 'block' }}>Subscribe</a>
                </MIPrimaryButton>
              </div>
            )
          }
          
        </div>
        <p className={classes.itemDescription}>
            <small>By subscribing you are agreeing to our <a href="https://braiins.com/legal/privacy-policy" target="_blank" className={classes.link}>Privacy Policy</a></small>
        </p>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherMiningTools);
