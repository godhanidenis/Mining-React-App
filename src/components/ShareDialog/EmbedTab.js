import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import qs from 'qs';

import MIPrimaryButton from '../MIButtons/MIPrimaryButton';
import { embedLanguages } from '../../constants';

const useStyles = makeStyles(theme => ({
  copyCode: {
    display: 'block',
    height: '100%',
    padding: '9px 18px',
    width: '100%',
  },
  darkText: {
    color: '#8d8d8d',
    fontSize: 12,
  },
  lightText: {
    color: '#c6c6c6',
    fontSize: 12,
  },
  tab: {
    marginBottom: -2,
    minWidth: '48px',
    outline: 'none !important'
  },
  tabs: {
    borderBottom: '2px solid #565656',
  },
  textarea: {
    backgroundColor: '#393939',
    border: 'none',
    color: '#e0e0e0',
    height: 140,
    marginBottom: 16,
    marginTop: 8,
    padding: '11px 16px',
    width: '100%',
  },
}));

const getEmbedCode = (language, location) => {
  if (language === 'en') {
    language = '';
  }

  let embedSrc = window.location.origin + `/embed${language ? '/' + language : ''}` + location.pathname;
  let embedCode = `<iframe src="${embedSrc}" width="100%" scrolling="no" style="overflow: hidden;"></iframe>
                  <script type="text/javascript" src="${window.location.origin}/js/iframeResizer.min.js"></script>
                  <script type="text/javascript">
                    iFrameResize();
                  </script>`;

  return embedCode;                  
};

const EmbedTab = (props) => {
  const classes = useStyles(props);
  const location = useLocation();

  const [state, setState] = useState({
    checked: false,
    copyCodeText: 'Copy code',
    tab: 'en',
    embed_text: getEmbedCode('en', location),
    btcPrice: '',
    networkDifficulty: '',
    hashrate: (window.location.pathname === '/cost-to-mine' || window.location.pathname === '/embed/cost-to-mine') ? 13.5 : 6800,
    consumption: (window.location.pathname === '/cost-to-mine' || window.location.pathname === '/embed/cost-to-mine') ? 1160 : 336000,
    electricity: 0.03,
    blockReward: 6.25,
    poolFee: 2,
    txFees: 0,
    timePeriod: 12,
    otherFees: 0,
    diffIncrement: 0,
    capex: 0,
    startingAssets: 0,
    assetChange: 0,
    priceIncrement: 0,
    avgTxFeesBlock: 0,
    initialHardware: 0,
    monthlyOpex: 0,
    hardwareChange: 0,
    initialInfra: 0,
    infraChange: 0,
    hodlRatio: 0,
    discountRate: 0,
    linkToShare: window.location,
    shareableLink: '',
    initialStateChanged: false,
  });

  if (state.pathname !== location.pathname) {
    setState((prevState) => ({
      ...prevState,
      pathname: location.pathname
    }));
  }

  const handleClickCopyCode = () => {
    setState((prevState) => ({
      ...prevState,
      copyCodeText: 'Copied'
    }));

    //change button text again
    setTimeout( function(){
      setState((prevState) => ({
        ...prevState,
        copyCodeText: 'Copy code'
      }));
    }, 2000);
  }

  const handleChangeTab = (e, value) => {
    setState((prevState) => ({
      ...prevState,
      tab: value,
      embed_text: getEmbedCode(value, location),
    }));
  };

  useEffect(() => {
    if (state.pathname === '/cost-to-mine' || state.pathname === '/profitability-calculator') {
      let params = qs.parse(state.shareableLink);
      let queryString = '';
      let i = 0;
      
      for (let key in params) {
        if (key !== 'btc_price' && key !== 'network_difficulty') {
            if (queryString === '') {
              queryString += `${key}=${params[key]}`;
            } else {
              queryString += `&${key}=${params[key]}`;
            }
          }

        //set state
        setState((prevState) => ({
          ...prevState,
          linkToShare: window.location + '?' + queryString,
          copyCodeText: 'Copy code',
        }));
      };
    }
  }, [state.checked]);

  if (props.shareableLink && !state.initialStateChanged) {
    setState((prevState) => ({
      ...prevState,
      shareableLink: props.shareableLink,
      initialStateChanged: true
    }));
  }

  return (
    <div>
      <Tabs value={state.tab} onChange={handleChangeTab} className={classes.tabs}>
        {
          embedLanguages.map(lang => (
            <Tab
              value={lang.value}
              label={lang.label}
              className={classes.tab}
            />
          ))
        }
      </Tabs>
      <Box padding="20px 18px">
        <div className={classes.lightText}>Embed code</div>
        {/* <div className={classes.darkText}>Helper text goes here</div> */}
        <textarea 
          className={classes.textarea}
          value={state.embed_text}
        />
        <MIPrimaryButton height={40} paddingLeft='0px' paddingRight='0px'>
          <CopyToClipboard text={state.embed_text}>
            <span className={classes.copyCode} onClick={handleClickCopyCode}> { state.copyCodeText } </span>
          </CopyToClipboard>
        </MIPrimaryButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmbedTab);
