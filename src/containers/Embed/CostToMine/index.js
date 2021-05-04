import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from "react-helmet";
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';

import { pageTitle, pageTitleAlign } from '../../../styles';

import ShareIcon from '../../../assets/img/share.png';

import ShareDialog from '../../../components/ShareDialog';

import LeftMenu from '../../../layouts/Main/LeftMenu';
import Overview from './Overview';
import Chart from './Chart';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '../../../assets/img/info-circle.png';

import lang from '../../../lang';

let hardwareData = require('../../../hardware.json');

const useStyles = makeStyles({
  content: {
    backgroundColor: '#262626',
    flex: 1,
    margin: 'auto',
    maxWidth: '1025px',
    padding: '1.5rem',
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
    marginLeft: '5px',
  },
  link: {
    cursor: 'pointer',
  },
  pageTitle: pageTitle,
  pageTitleMobile: {
    fontSize: 38,
  },
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

const CostToMine = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width: 959px)');
  const isScreenMiddle = useMediaQuery('(min-width: 768px) and (max-width: 1370px)');
  const [state, setState] = useState({
    isShareDialogOpen: false,
    tab: 'share',
    linkToShare: '',
    hardwareName: '',
    pathname: window.location.pathname
  });

  let language = window.location.pathname.split('/')[2]
  if (language === 'cost-to-mine') {
    language = 'en'
  }

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
    setState((prevState) => ({
      ...prevState,
      linkToShare: props.linkToShare,
    }));
  }, [props.linkToShare]);

  const addShareableLink = (linkToShare) => {
    setState((prevState) => ({
      ...prevState,
      linkToShare,
    }));
  }

  // const setHardwareName = (hardwareName) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     hardwareName,
  //   }));
  // }

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
  
  return (
    <Box width="100%">
      <Helmet>
        <meta name="description" content="Calculate the cost of production for 1 Bitcoin with preset profiles of all popular SHA-256 ASICs."/>
        <meta property="og:site_name" content="Braiins | Mining Insights"/>
        <meta property="og:url" content="https://insights.braiins.com/cost-to-mine"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Mining Insights | Cost to Mine 1 BTC"/>
        <meta property="og:description" content="Calculate the cost of production for 1 Bitcoin with preset profiles of all popular SHA-256 ASICs."/>
        <meta property="og:image" content={window.location.origin + '/bitcoin_mining_insights.png'}/>
        <title>Cost to Mine 1 BTC | Braiins.com</title>
      </Helmet>
      <div className={classes.contentWrap}>
        <div className={matches? classes.contentMobile: classes.content}>
          <div className={classNames(classes.pageTitle, matches ? classes.pageTitleMobile : '')}>
            <span className={state.pathname === '/embed/fa/cost-to-mine' ? classes.pageTitleAlign: classes.pageTitle}>{lang[language]['Cost to Mine 1 Bitcoin']}</span>
            <Tooltip
              title={lang[language]['This calculator will show you the cost to mine 1 Bitcoin based on your hash rate, power consumption, and additional (optional) inputs. You can select any hardware model from the dropdown menu or choose “Custom” to input the hashrate and power consumption yourself.']}
              >
              <img className={classes.infoIcon} src={InfoIcon}/>
            </Tooltip>
            <LeftMenu 
              data={state}
              addShareableLink={addShareableLink} 
              setHardwareName={setHardwareName}
              onChangeInput={handleChangeLeftMenuInput}
              onChangeData={handleChangeLeftMenuData}
            />
          </div>
          {/* <div className={classes.description}>
            <p>This calculator will show you the cost to mine 1 Bitcoin based on your hash rate, power consumption, and additional (optional) inputs. You can select any hardware model from the dropdown menu or choose “Custom” to input the hashrate and power consumption yourself.</p>
          </div> */}
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="30px" marginBottom="14px">
            <div className={classes.subtitle}>
              <span>{lang[language]['STATS']}</span>
            </div>
          </Box>
          <Overview/>
          <Chart hardwareName={state.hardwareName}/>
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

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CostToMine);
