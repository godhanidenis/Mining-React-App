import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { Helmet } from "react-helmet";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { pageTitle } from '../../styles';
import { pageTitleMobile } from '../../styles';
import ShareIcon from '../../assets/img/share.png';

import ShareDialog from '../../components/ShareDialog';

import LeftMenu from '../../layouts/Main/LeftMenu';
import Overview from './Overview';
import Chart from './Chart';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '../../assets/img/info-circle.png';

import {
  getProfitability,
} from '../../store/actions/profitabilityCalculator';

import { CSVLink } from 'react-csv';

const useStyles = makeStyles({
  content: {
    backgroundColor: '#262626',
    flex: 1,
    margin: 'auto',
    maxWidth: '1025px',
    padding: '2rem',
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
    marginLeft: '8px',
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
  pageTitleMobile:{
    fontSize: 38,
    fontWeight: 700,
    color: '#ffffff'
  }
});
let timeout = null;
let timeOutTime = 0;
let queryString = '';

const ProfitabilityCalculator = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width: 959px)');
  const isScreenMiddle = useMediaQuery('(min-width: 768px) and (max-width: 1370px)');
  const csvLink = useRef()

  const [state, setState] = useState({
    isShareDialogOpen: false,
    tab: 'share',
    months: 12,
    linkToShare: '',
    download: 1,
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
    queryString: ''
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

  useEffect(() => {
    if(props.profitabilityData.month) {
      setState((prevState) => ({
        ...prevState,
        months: props.profitabilityData.month[props.profitabilityData.month.length - 1],
      }))
    }
  }, [props.profitabilityData]);

  const addShareableLink = (linkToShare) => {
    setState((prevState) => ({
      ...prevState,
      linkToShare,
    }));
  }

  const getProfitabilityQuery = () => {
    let params = [{ key: 'btcPrice', paramKey: 'btc_price', required: false },
                  { key: 'networkDifficulty', paramKey: 'network_difficulty', required: false },
                  { key: 'hashrate', paramKey: 'hashrate', required: true },
                  { key: 'consumption', paramKey: 'consumption', required: true },
                  { key: 'electricity', paramKey: 'electricity', required: true },
                  { key: 'blockReward', paramKey: 'block_reward', required: true },
                  { key: 'poolFee', paramKey: 'pool_fee', required: true },
                  { key: 'txFees', paramKey: 'tx_fees', required: false },
                  { key: 'timePeriod', paramKey: 'time_period', required: true },
                  { key: 'otherFees', paramKey: 'other_fees', required: false },
                  { key: 'diffIncrement', paramKey: 'diff_increment', required: false },
                  { key: 'capex', paramKey: 'capex', required: false },
                  { key: 'startingAssets', paramKey: 'starting_assets', required: false },
                  { key: 'assetChange', paramKey: 'asset_change', required: false },
                  { key: 'priceIncrement', paramKey: 'price_increment', required: false },
                  { key: 'initialHardware', paramKey: 'initial_hardware', required: false },
                  { key: 'monthlyOpex', paramKey: 'monthly_opex', required: false },
                  { key: 'hardwareChange', paramKey: 'hardware_change', required: false },
                  { key: 'initialInfra', paramKey: 'initial_infra', required: false },
                  { key: 'infraChange', paramKey: 'initial_change', required: false },
                  { key: 'hodlRatio', paramKey: 'hodl_ratio', required: false },
                  { key: 'discountRate', paramKey: 'discount_rate', required: false },
                  { key: 'download', paramKey: 'download', required: false}];
    let makeCall = true;

    params.forEach((param, index) => {
      //check for required fields
      if (param.required) {
        if (state[param.key] === 0 || state[param.key] === '') {
          makeCall = false;
        }
      }

      if (index === 0) {
        queryString += `${param.paramKey}=${state[param.key]}`;
      } else {
        queryString += `&${param.paramKey}=${state[param.key]}`;
      }
    });

    // csvLink.current.link.click()
    setState((prevState) => ({
      ...prevState,
      queryString: queryString,
    }));
  }

  const apiCallHandler = () => {
    getProfitabilityQuery();
  }

  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      apiCallHandler();
      timeOutTime = 0;
    }, timeOutTime);
  }, []);
  
  return (
    <Box width="100%">
      <Helmet>
        <meta name="description" content="Calculate your mining profitability and use advanced inputs to estimate your operation’s cash flow."/>
        <meta property="og:site_name" content="Braiins | Mining Insights"/>
        <meta property="og:url" content="https://insights.braiins.com/profitability-calculator"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Mining Insights | Profitability Calculator"/>
        <meta property="og:description" content="Calculate your mining profitability and use advanced inputs to estimate your operation’s cash flow."/>
        <meta property="og:image" content={window.location.origin + '/bitcoin_mining_insights.png'}/>
        <title>Profitability Calculator | Braiins.com</title>
      </Helmet>
      <div className={classes.contentWrap}>
        <Box display={{ xs: 'none', md: 'flex' }}>
          <LeftMenu addShareableLink={addShareableLink} data={state}/>
        </Box>
        <div className={matches? classes.contentMobile: classes.content} style={{ maxWidth: isScreenMiddle? '64%': '1025px'}}>
          <div className={matches ? classes.pageTitleMobile: classes.pageTitle}>
            Profitability Calculator
            <Tooltip title="This calculator will show you your net profit from mining based on your hash rate, efficiency, electricity price, and other operational expences. To include capital expenditure (e.g. costs to buy hardware), use the advanced inputs">
              <img className={classes.infoIcon} src={InfoIcon}/>
            </Tooltip>

            <Box display={{ xs: 'block', md: 'none' }}>
              <LeftMenu addShareableLink={addShareableLink} data={state}/>
            </Box>
          </div>
          {/* <div className={classes.description}>
            <p>This calculator will show you your net profit from mining based on your hash rate, efficiency, electricity price, and other operational expences. To include capital expenditure (e.g. costs to buy hardware), use the <strong><u>advanced inputs</u></strong></p>
          </div> */}
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="30px" marginBottom="14px">
            <div className={classes.subtitle}>
              <span>STATS FOR {state.months} months</span>
            </div>
            <Box display="flex" alignItems="center">
              <div className={`${classes.link} ${classes.userGuide}`}>
                <a id="csv_link" target="_blank" ref={csvLink} href={process.env.REACT_APP_API_URL+'/api/v0.1/calculator?'+state.queryString}><span className={classes.text}>Download CSV</span></a>
              </div>
              <div className={`${classes.link} ${classes.userGuide}`}>
                <a className={classes.text} href="https://braiins.com/blog/profitability-calculator-user-guide" target="__blank">User Guide</a>
              </div>
              <div className={classes.link} onClick={handleClickShareIcon}>
                <span className={classes.text}>Share</span>
                <img className={classes.icon} src={ShareIcon}/>
              </div>
            </Box>
          </Box>
          <Overview/>
          <Chart/>
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
  profitabilityData: store.rootReducer.profitabilityCalculator.profitabilityData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProfitability
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfitabilityCalculator);
