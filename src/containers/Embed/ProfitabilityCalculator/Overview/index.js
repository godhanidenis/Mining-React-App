import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames'

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '../../../../assets/img/info-circle.png';
import lang from '../../../../lang';

const useStyles = makeStyles(theme => ({
  container: {
    width: 'calc(100% + 3px)',
    marginLeft: -1.5,
  },
  gridItem: {
    backgroundColor: '#161616',
    padding: '28px 32px 20px 32px',
    margin: '0px 1.5px 3px'
  },
  gridItemMobile: {
    // marginRight: 3,
  },
  itemName: {
    color: '#8d8d8d',
    marginBottom: 4,
  },
  itemPrefix: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 12,
  },
  itemValue: {
    color: '#ffffff',
    fontSize: 40,
  },
}));

const Overview = (props) => {
  const classes = useStyles(props);
  const matches = useMediaQuery('(max-width:768px)');
  const [state, setState] = useState({
    avgCost: 0,
    avgBreakEven: 0,
    totalBtc: 0,
    cumulativeProfit: 0,
    maxHeight: 'auto',
    pathname: window.location.pathname,
    capexBreakEven: 0,
    irr: 0,
    maxHeight: 'auto'
  });

  let language = window.location.pathname.split('/')[2]
  if (language === 'profitability-calculator'){
    language = 'en'
  }

  useEffect(() => {
    if(props.profitabilityData.totalBtc) {
      setState((prevState) => ({
        ...prevState,
        avgCost: props.profitabilityData.avgCost,
        avgBreakEven: props.profitabilityData.avgBreakEven,
        totalBtc: props.profitabilityData.totalBtc[props.profitabilityData.totalBtc.length - 1],
        cumulativeProfit: props.profitabilityData.cumulativeProfit[props.profitabilityData.cumulativeProfit.length - 1],
        irr: props.profitabilityData.irr,
        capexBreakEven: props.profitabilityData.capexBreakeven,
      }))
    }
  }, [props.profitabilityData]);

  let gridElements = document.getElementsByClassName('gItem');
  if (gridElements && gridElements.length > 0) {
    let maxHeight = 0;
    for (let i = 0; i < gridElements.length; i++) {
      if (gridElements[i].clientHeight > maxHeight) {
        maxHeight = gridElements[i].clientHeight
      }
    }

    if (maxHeight !== state.maxHeight) {
      setState((prevState) => ({
        ...prevState,
        maxHeight,
      }))
    }
  }

  const renderOverviewItem = (name, value, unit, tooltip) => {
    return (
      <Grid item md={4} sm={6} xs={12}>
        <div className={matches? `gItem ${classes.gridItem} ${classes.gridItemMobile}`: `gItem ${classes.gridItem}`} style={{height: state.maxHeight}}>
          <div className={classes.itemName}>
            {lang[language][name]}
            {
              tooltip && (
                <Tooltip title={lang[language][tooltip]}>
                  <img className={classes.infoIcon} src={InfoIcon}/>
                </Tooltip>
              )
            }
          </div>
          <Box display="flex" alignItems="flex-end">
            <div className={classes.itemValue}>{value}</div>
            <div className={classes.itemPrefix}>{unit}</div>
          </Box>
        </div>
      </Grid>
    );
  };

  return (
    <Grid container spacing={0.5} className={classes.container}>
      {renderOverviewItem('Avg. Cost of Production', state.avgCost, 'USD', 'The average cost to mine 1 BTC for your mining operation')}
      {renderOverviewItem('Electricity Break Even', state.avgBreakEven, 'USD', 'The average break-even electricity price for your mining operation')}
      {renderOverviewItem('CAPEX Break Even', state.capexBreakEven, 'MONTHS', 'The month when your cumulative profit equals or surpasses your initial CAPEX investment. Will not display a number if CAPEX = 0 or if the Break Even point is not reached during the given time period.')}
      {renderOverviewItem('End Profit/Loss', state.cumulativeProfit, 'USD', '')}
      {renderOverviewItem('Total BTC Mined', state.totalBtc, 'BTC', '')}
      {renderOverviewItem('IRR', state.irr, '%', 'Internal Rate of Return, a metric used to estimate the profitability of potential investments. Will display NaN if CAPEX = 0.')}
    </Grid>
  );
}

const mapStateToProps = store => ({
  profitabilityData: store.rootReducer.profitabilityCalculator.profitabilityData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
