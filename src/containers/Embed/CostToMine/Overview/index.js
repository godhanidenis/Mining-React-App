import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

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
    hardwareEfficiency: 0,
    margin: 0,
    breakEven: 0,
    productionCost: 0,
    btcMinedDaily: 0,
    dailyProfit: 0,
    maxHeight: 'auto',
    pathname: window.location.pathname
  });

  useEffect(() => {
    if(props.costToMineData.hardwareEfficiency) {
      setState((prevState) => ({
        ...prevState,
        hardwareEfficiency: props.costToMineData.hardwareEfficiency,
        margin: Math.round(props.costToMineData.margin),
        breakEven: props.costToMineData.breakEven,
        productionCost: Math.round(props.costToMineData.cost),
        btcMinedDaily: props.costToMineData.btcMinedDaily,
        dailyProfit: props.costToMineData.dailyProfit,
      }))
    }
  }, [props.costToMineData]);

  let language = window.location.pathname.split('/')[2]
  if (language === 'cost-to-mine') {
    language = 'en'
  }

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

  const renderOverviewItem = (name, value, unit) => {
    return (
      <Grid item md={4} sm={6} xs={12}>
        <div className={matches? `gItem ${classes.gridItem} ${classes.gridItemMobile}`: `gItem ${classes.gridItem}`} style={{height: state.maxHeight}}>
          <div className={classes.itemName}>{lang[language][name]}</div>
          <Box display="flex" alignItems="flex-end">
            <div className={classes.itemValue}>{value}</div>
            <div className={classes.itemPrefix}>{unit}</div>
          </Box>
        </div>
      </Grid>
    );
  }

  return (
    <Grid container spacing={0.5} className={classes.container}>
      {renderOverviewItem('Hardware Efficiency', state.hardwareEfficiency, 'W/TH')}
      {renderOverviewItem('Margin', state.margin, 'USD')}
      {renderOverviewItem('Break-Even Electricity Price', state.breakEven, 'USD')}
      {renderOverviewItem('Cost of Production for 1 BTC', state.productionCost, 'USD')}
      {renderOverviewItem('BTC Mined per Day', state.btcMinedDaily, 'BTC')}
      {renderOverviewItem('Profit per Day (USD)', state.dailyProfit, 'USD')}
    </Grid>
  );
}

const mapStateToProps = store => ({
  costToMineData: store.rootReducer.costToMine.costToMineData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
