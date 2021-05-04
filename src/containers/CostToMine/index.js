import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from "react-helmet";
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation } from 'react-router-dom';

import { pageTitle } from '../../styles';

import ShareIcon from '../../assets/img/share.png';

import ShareDialog from '../../components/ShareDialog';

import LeftMenu from '../../layouts/Main/LeftMenu';
import Overview from './Overview';
import Chart from './Chart';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '../../assets/img/info-circle.png';

import {
  getCostToMine, setCostToMinePerams
} from '../../store/actions/costToMine';
import history from '../../history';
let hardwareData = require('../../hardware.json');

let timeout = null;
let timeOutTime = 0;

let qs = require('qs');

const useStyles = makeStyles({
  content: {
    backgroundColor: '#262626',
    flex: 1,
    margin: 'auto',
    maxWidth: '1025px',
    padding: '1.5rem',
  },
  contentMobile: {
    backgroundColor: '#262626',
    flex: 1,
    margin: 'auto',
    maxWidth: '100% !important',
    padding: '1rem',
  },
  contentWrap: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  description: {
    color: '#ffffff',
    marginTop: 26,
  },
  icon: {
    marginLeft: 10,
  },
  infoIcon: {
    marginBottom: '27px',
    marginLeft: '5px',
  },
  link: {
    cursor: 'pointer',
  },
  pageTitle: pageTitle,
  subtitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 600,
  },
  text: {
    color: '#8B7CFF !important',
  },
  userGuide: {
    marginRight: '15px'
  },
  subTitle: {
    color: 'rgb(107, 80, 255)'
  }
});

const CostToMine = (props) => {

  const classes = useStyles();
  const matches = useMediaQuery('(max-width: 959px)');
  const isScreenMiddle = useMediaQuery('(min-width: 768px) and (max-width: 1370px)');
  const compare = useRef(null)

  const [state, setState] = useState({
    isShareDialogOpen: false,
    tab: 'share',
    linkToShare: '',
    hardwareName: (window.location.pathname === '/cost-to-mine' || window.location.pathname === '/embed/cost-to-mine') ? 'Braiins OS+ Autotuning / Antminer S9 Overclocking' : '',
    initialStateChanged: false,
    stateChangeType: '',
    btcPrice: '',
    networkDifficulty: '',
    hashrate: (window.location.pathname === '/cost-to-mine' || window.location.pathname === '/embed/cost-to-mine') ? 17 : 6800,
    consumption: (window.location.pathname === '/cost-to-mine' || window.location.pathname === '/embed/cost-to-mine') ? 1500 : 336000,
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
    pathname: window.location.pathname,
  });

  const handleClickShareIcon = () => {
    setState((prevState) => ({
      ...prevState,
      isShareDialogOpen: true,
    }));
  };

  const handleCloseShareDialog = () => {
    setState((prevState) => ({
      ...prevState,
      isShareDialogOpen: false,
    }));
  };

  const handleHardwareChange = () => {

    if (state.pathname === '/cost-to-mine') {
      let [hardwareName, hardwareModel] = state.hardwareName.split(' / ');

      if (hardwareModel.includes("Overclocking")) {
        hardwareModel = hardwareModel.split("Overclocking")
        hardwareModel = hardwareModel[0].concat("High Efficiency")
        document.getElementsByClassName("sub_title")[0].innerText  = "Compare with Braiins OS+ Overclocking"
        document.getElementsByClassName("main_title")[0].innerText = "STATS WITH BRAIINS OS+"
      } else if (hardwareModel.includes("High Efficiency")) {
        hardwareModel = hardwareModel.split("High Efficiency")
        hardwareModel = hardwareModel[0].concat("Overclocking")
        document.getElementsByClassName("sub_title")[0].innerText  = "Compare with Braiins OS+ High Efficiency"
        document.getElementsByClassName("main_title")[0].innerText = "STATS WITH BRAIINS OS+"
      }

      setState((prevState) => ({
        ...prevState,
        stateChangeType: 'inputChanged',
        hashrate: hardwareData[hardwareName][hardwareModel]["hashrate"],
        consumption: hardwareData[hardwareName][hardwareModel]["consumption"],
        hardwareName: hardwareName + " / " + hardwareModel,
        electricity: parseFloat(document.getElementsByName("electricity")[0].value),
        blockReward: parseFloat(document.getElementsByName("blockReward")[0].value),
        poolFee: parseInt(document.getElementsByName("poolFee")[0].value),
        txFees: parseInt(document.getElementsByName("txFees")[0].value),
        timePeriod: parseInt(document.getElementsByName("timePeriod")[0].value),
        otherFees: parseInt(document.getElementsByName("otherFees")[0].value),
        diffIncrement: parseInt(document.getElementsByName("diffIncrement")[0].value),
        avgTxFeesBlock: document.getElementsByName("avgTxFeesBlock").length > 0 ? parseInt(document.getElementsByName("avgTxFeesBlock")[0].value) : 0,
        monthlyOpex: 0,
        hardwareChange: 0,
        initialInfra: 0,
        infraChange: 0,
        hodlRatio: 0,
        discountRate: 0,
      }));
    }
  }

  const handleOnChange = (key, val) => {
    setState((prevState) => ({
      ...prevState,
      [key]: val,
    }))
    timeOutTime = 1000;
  }

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      linkToShare: props.linkToShare,
    }));
  }, [props.linkToShare]);


  useEffect(() => {

    if (state.isViaQueryStr) {

      let [hardwareName, hardwareModel] = state.hardwareName.split(' / ');
      if (hardwareModel.includes("Overclocking")) {
        document.getElementsByClassName("sub_title")[0].innerText  = "Compare with Braiins OS+ High Efficiency"
        document.getElementsByClassName("main_title")[0].innerText = "STATS WITH BRAIINS OS+"
      } else if (hardwareModel.includes("High Efficiency")) {
        document.getElementsByClassName("sub_title")[0].innerText  = "Compare with Braiins OS+ Overclocking"
        document.getElementsByClassName("main_title")[0].innerText = "STATS WITH BRAIINS OS+"
      } else{
        document.getElementsByClassName("sub_title")[0].innerText  = ""
        document.getElementsByClassName("main_title")[0].innerText = "STATS"
      }

    }
  }, [state.isViaQueryStr]);

  const apiCallHandler = () => {
    if (state.pathname === '/cost-to-mine' || state.pathname === '/embed/cost-to-mine') {
      getCostToMineQuery();
    }
  }

  const getCostToMineQuery = () => {
    let costToMineQuery = '';
    let costToMineParams = [
      { key: 'btcPrice', paramKey: 'btc_price', required: false },
      { key: 'networkDifficulty', paramKey: 'network_difficulty', required: false },
      { key: 'hashrate', paramKey: 'hashrate', required: true },
      { key: 'consumption', paramKey: 'consumption', required: true },
      { key: 'electricity', paramKey: 'electricity', required: true },
      { key: 'blockReward', paramKey: 'block_reward', required: true },
      { key: 'poolFee', paramKey: 'pool_fee', required: true },
      { key: 'otherFees', paramKey: 'other_fees', required: false },
      { key: 'diffIncrement', paramKey: 'diff_increment', required: false },
      { key: 'avgTxFeesBlock', paramKey: 'avg_tx_fees_block', required: false }
    ];
    let makeCall = true;

    costToMineParams.forEach((param, index) => {
      //check for required fields
      if (param.required) {
        if (state[param.key] === 0 || state[param.key] === '') {
          makeCall = false;
        }
      }

      if (index === 0) {
        costToMineQuery += `${param.paramKey}=${state[param.key]}`;
      } else {
        costToMineQuery += `&${param.paramKey}=${state[param.key]}`;
      }
    });

    if (!makeCall) {
      return false;
    }
    props.getCostToMine(costToMineQuery)
      .then(res => {
        //console.log('cost to mine', costToMineQuery)
      })
      .catch(err => {
        //console.log(err.msg);
      });
  }

  const addShareableLink = (linkToShare) => {
    setState((prevState) => ({
      ...prevState,
      linkToShare,
    }));
  }

  const setHardwareNameFromQuery = (hardwareName, hashrate, consumption) => {
    setState((prevState) => ({
      ...prevState,
      hardwareName,
      hashrate,
      consumption,
      isViaQueryStr: true
    }));
  }

  const setHardwareName = (hardwareName) => {
    const [manufacturer, model] = hardwareName.split(" / ");
    const hashrate = hardwareData[manufacturer][model]['hashrate'];
    const consumption = hardwareData[manufacturer][model]['consumption'];

    setState((prevState) => ({
      ...prevState,
      hardwareName,
      hashrate,
      consumption,
    }));
  }

  const handleChangeLeftMenuInput = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  const handleChangeLeftMenuData = (data) => {
    setState((prevState) => ({
      ...prevState,
      ...data,
    }));
  }

  const location = useLocation();
  if (state.pathname !== location.pathname) {
    //check for query string
    if (location.search !== "") {
      let params = location.search.split("?");
      params = qs.parse(params[1]);
      //check from url and change states
      setState((prevState) => ({
        ...prevState,
        btcPrice: params['btc_price'] || '',
        networkDifficulty: params['network_difficulty'] || '',
        hashrate: params['hashrate'] || ((state.pathname === '/cost-to-mine' || state.pathname === '/embed/cost-to-mine') ? 13.5 : 6800),
        consumption: params['consumption'] || ((state.pathname === '/cost-to-mine' || state.pathname === '/embed/cost-to-mine') ? 1160 : 336000),
        electricity: params['electricity'] || 0.03,
        blockReward: params['block_reward'] || 6.25,
        poolFee: params['pool_fee'] || 2,
        txFees: params['tx_fees'] || 0,
        timePeriod: params['time_period'] || 12,
        otherFees: params['other_fees'] || 0,
        diffIncrement: params['diff_increment'] || 0,
        capex: params['capex'] || 0,
        startingAssets: params['starting_assets'] || 0,
        assetChange: params['asset_change'] || 0,
        priceIncrement: params['price_increment'] || 0,
        avgTxFeesBlock: params['avg_tx_fees_block'] || 0,
        hardwareName: params['hardwareName'] || 'Braiins OS+ Autotuning / Antminer S9 Overclocking',
        pathname: location.pathname,
        // initialStateChanged: true
        stateChangeType: 'inputChanged'
      }));

      //make the url short
      history.push(location.pathname);
    } else {
      setState((prevState) => ({
        ...prevState,
        pathname: location.pathname,
        stateChangeType: 'inputChanged'
      }));
    }
  }

  return (
    <Box width="100%">
      <Helmet>
        <meta name="description" content="Calculate the cost of production for 1 Bitcoin with preset profiles of all popular SHA-256 ASICs." />
        <meta property="og:site_name" content="Braiins | Mining Insights" />
        <meta property="og:url" content="https://insights.braiins.com/cost-to-mine" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mining Insights | Cost to Mine 1 BTC" />
        <meta property="og:description" content="Calculate the cost of production for 1 Bitcoin with preset profiles of all popular SHA-256 ASICs." />
        <meta property="og:image" content={window.location.origin + '/bitcoin_mining_insights.png'} />
        <title>Cost to Mine 1 BTC | Braiins.com</title>
      </Helmet>
      <div className={classes.contentWrap}>
        <Box display={{ xs: 'none', md: 'flex' }}>
          <LeftMenu
            data={state}
            addShareableLink={addShareableLink}
            setHardwareName={setHardwareName}
            setHardwareNameFromQuery={setHardwareNameFromQuery}
            onChangeInput={handleChangeLeftMenuInput}
            onChangeData={handleChangeLeftMenuData}
          />
        </Box>
        <div className={matches ? classes.contentMobile : classes.content} style={{ maxWidth: isScreenMiddle ? '64%' : '1025px' }}>
          <div className={classes.pageTitle}>
            Cost to mine 1 Bitcoin
            <Tooltip title="This calculator will show you the cost to mine 1 Bitcoin based on your hash rate, power consumption, and additional (optional) inputs. You can select any hardware model from the dropdown menu or choose “Custom” to input the hashrate and power consumption yourself.">
              <img className={classes.infoIcon} src={InfoIcon} />
            </Tooltip>

            <Box display={{ xs: 'block', md: 'none' }}>
              <LeftMenu
                data={state}
                addShareableLink={addShareableLink}
                setHardwareName={setHardwareName}
                setHardwareNameFromQuery={setHardwareNameFromQuery}
                onChangeInput={handleChangeLeftMenuInput}
                onChangeData={handleChangeLeftMenuData}
              />
            </Box>
          </div>
          {/* <div className={classes.description}>
            <p>This calculator will show you the cost to mine 1 Bitcoin based on your hash rate, power consumption, and additional (optional) inputs. You can select any hardware model from the dropdown menu or choose “Custom” to input the hashrate and power consumption yourself.</p>
          </div> */}
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="30px" marginBottom="14px">
            <div className={classes.subtitle}>
              <span className='main_title'>STATS</span>
            </div>
            {!props.isFetching && (
              <Box display="flex" alignItems="center">
                <div className={classes.link} ref={compare} onClick={handleHardwareChange}>
                  <span className={classes.subTitle + ' sub_title'}>Compare with Braiins OS+ High Efficiency</span>
                </div>
              </Box>
            )}

            <Box display="flex" alignItems="center">
              <div className={`${classes.link} ${classes.userGuide}`}>
                <a className={classes.text} href="https://braiins.com/blog/cost-to-mine-bitcoin-user-guide" target="__blank">User Guide</a>
              </div>
              <div className={classes.link} onClick={handleClickShareIcon}>
                <span className={classes.text}>Share</span>
                <img className={classes.icon} src={ShareIcon} />
              </div>
            </Box>
          </Box>
          <Overview />
          <Chart hardwareName={state.hardwareName} />
          <ShareDialog
            open={state.isShareDialogOpen}
            tab={state.tab}
            shareableLink={state.linkToShare}
            onClose={handleCloseShareDialog}
          />
        </div>
      </div>
    </Box>
  );
}

const mapStateToProps = store => ({
  costToMineData: store.rootReducer.costToMine.costToMineData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCostToMine
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CostToMine);
