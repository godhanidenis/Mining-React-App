import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import MIPrimaryButton from '../MIButtons/MIPrimaryButton';
import MIInput from '../MIInput';

import FacebookIcon from '../../assets/img/facebook.svg';
import TelegramIcon from '../../assets/img/telegram.svg';
import WhatsappIcon from '../../assets/img/whatsapp.svg';
import TwitterIcon from '../../assets/img/twitter.svg';

import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  TwitterShareButton
} from "react-share";

let qs = require('qs');

const useStyles = makeStyles(theme => ({
  checkbox: {
    color: '#fff !important',
    margin: '-2px 8px 0 0',
    padding: 0,
  },
  copyLink: {
    display: 'block',
    height: '100%',
    padding: '9px 18px',
    width: '100%',
  },
  greyText: {
    color: '#8D8D8D',
    fontSize: 12,
  },
  socialBtn: {
    height: '100%',
    width: '100%'
  },
  socialIcon: {
    height: 32,
    width: 32,
  },
  socialItem: {
    alignItems: 'center',
    backgroundColor: '#393939',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 120,
    width: '100%',
  },
  tabWrap: {
    padding: '30px 18px'
  }
}));

const ShareTab = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    checked: false,
    copyLinkText: 'Copy Link',
    pathname: '',
    shareableLink: '',
    initialStateChanged: false,
    linkToShare: window.location
  });
  const { checked, copyLinkText } = state;

  const location = useLocation();
  if (state.pathname !== location.pathname) {
    setState((prevState) => ({
      ...prevState,
      pathname: location.pathname
    }));
  }

  const handleChangeCheckbox = (e) => {
    const checked = e.target.checked;

    setState((prevState) => ({
      ...prevState,
      checked,
    }));
  };

  const handleClickCopyLink = () => {
    setState((prevState) => ({
      ...prevState,
      copyLinkText: 'Copied'
    }));

    //change text again
    setTimeout( function(){
      setState((prevState) => ({
        ...prevState,
        copyLinkText: 'Copy Link'
      }));
    }, 2000);
  }

  useEffect(() => {
    if (state.pathname === '/cost-to-mine' || state.pathname === '/profitability-calculator') {
      let params = qs.parse(state.shareableLink);
      let queryString = '';
      let i = 0;
      
      for (let key in params) {
        if (state.checked) {
          if (key !== 'btc_price' && key !== 'network_difficulty') {
            if (queryString === '') {
              queryString += `${key}=${params[key]}`;
            } else {
              queryString += `&${key}=${params[key]}`;
            }
          }
        } else {
          if (queryString === '') {
            queryString += `${key}=${params[key]}`;
          } else {
            queryString += `&${key}=${params[key]}`;
          }
        }

        //set state
        setState((prevState) => ({
          ...prevState,
          linkToShare: window.location + '?' + queryString
        }));
      };
    }

  }, [state.checked]);

  if(props.shareableLink && !state.initialStateChanged){
    setState((prevState) => ({
      ...prevState,
      shareableLink: props.shareableLink,
      initialStateChanged: true
    }));
  }

  return (
    <div className={classes.tabWrap}>
      {
        ( state.pathname === '/cost-to-mine' || state.pathname === '/profitability-calculator' ) && (
          <Box display="flex" alignItems="flex-start">
            <Checkbox
              checked={checked}
              onChange={handleChangeCheckbox}
              className={classes.checkbox}
            />
            <div>
              <div>Include always live data for difficulty and BTC price</div>
              <div className={classes.greyText}>Otherwise we’ll include currently filled values</div>
            </div>
          </Box>
        )
      }

      <div className="mt-4">URL</div>
      <Box display="flex" justifyContent="space-between">
        <MIInput 
          width={300}
          height={40}
          margin="0 8px 0 0"
          value={state.linkToShare}
        />
        <MIPrimaryButton height={40} paddingLeft='0px' paddingRight='0px'>
          <CopyToClipboard text={state.linkToShare}>
            <span className={classes.copyLink} onClick={handleClickCopyLink}> { copyLinkText } </span>
          </CopyToClipboard>
        </MIPrimaryButton>
      </Box>
      <Grid container className="mt-3" spacing={1}>
        <Grid item xs={3}>
          <div className={classes.socialItem}>
            <FacebookShareButton url={state.linkToShare} className={classes.socialBtn}>
              <img className={classes.socialIcon} src={FacebookIcon}/>
              <div className="mt-2">Share on</div>
              <div>Facebook</div>
            </FacebookShareButton>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.socialItem}>
            <TelegramShareButton url={state.linkToShare} className={classes.socialBtn}>
              <img className={classes.socialIcon} src={TelegramIcon}/>
              <div className="mt-2">Share on</div>
              <div>Telegram</div>
            </TelegramShareButton>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.socialItem}>
            <WhatsappShareButton url={state.linkToShare} className={classes.socialBtn}>
              <img className={classes.socialIcon} src={WhatsappIcon}/>
              <div className="mt-2">Share on</div>
              <div>Whatsapp</div>
            </WhatsappShareButton>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.socialItem}>
            <TwitterShareButton url={state.linkToShare} className={classes.socialBtn}>
              <img className={classes.socialIcon} src={TwitterIcon}/>
              <div className="mt-2">Share on</div>
              <div>Twitter</div>
            </TwitterShareButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareTab);
