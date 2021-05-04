import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { Helmet } from "react-helmet";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { pageTitle, pageTitleAlign } from '../../../styles';
import ShareIcon from '../../../assets/img/share.png';

import ShareDialog from '../../../components/ShareDialog';

import LeftMenu from '../../../layouts/Main/LeftMenu';
import Overview from './Overview';
import Chart from './Chart';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '../../../assets/img/info-circle.png';
import lang from '../../../lang';

const useStyles = makeStyles({
  content: {
    backgroundColor: '#262626',
    flex: 1,
    margin: 'auto',
    maxWidth: '1025px',
    padding: '2rem',
    direction: window.location.pathname.split('/')[2] === 'fa'? 'rtl': 'ltr'
  },
  contentMobile: {
    backgroundColor: '#262626',
    flex: 1,
    margin: 'auto',
    maxWidth: '100% !important',
    padding: '1rem',
    direction: window.location.pathname.split('/')[2] === 'fa'? 'rtl': 'ltr'
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
  pageTitleAlign: pageTitleAlign
});

const ProfitabilityCalculator = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width: 959px)');
  const isScreenMiddle = useMediaQuery('(min-width: 768px) and (max-width: 1370px)');

  let language = window.location.pathname.split('/')[2]
  if (language === 'profitability-calculator'){
    language = 'en'
  }

  const [state, setState] = useState({
    isShareDialogOpen: false,
    tab: 'share',
    months: 12,
    linkToShare: '',
    pathname: window.location.pathname
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
        <div className={matches? classes.contentMobile: classes.content}>
          <div className={classes.pageTitle}>
            <span className={state.pathname === '/embed/fa/profitability-calculator'? classes.pageTitleAlign: classes.pageTitle}>{lang[language]['Profitability Calculator']}</span>
              <Tooltip title={lang[language]['This calculator will show you your net profit from mining based on your hash rate, efficiency, electricity price, and other operational expences. To include capital expenditure (e.g. costs to buy hardware), use the advanced inputs']}>
                <img className={classes.infoIcon} src={InfoIcon}/>
              </Tooltip>
            <LeftMenu data={state} addShareableLink={addShareableLink}/>
          </div>
          {/* <div className={classes.description}>
            <p>This calculator will show you your net profit from mining based on your hash rate, efficiency, electricity price, and other operational expences. To include capital expenditure (e.g. costs to buy hardware), use the <strong><u>advanced inputs</u></strong></p>
          </div> */}
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="30px" marginBottom="14px">
            <div className={classes.subtitle}>
              <span>{lang[language]['STATS FOR']} {state.months} {lang[language]['months']}</span>
            </div>
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

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfitabilityCalculator);
