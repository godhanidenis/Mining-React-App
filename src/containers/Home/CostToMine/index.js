import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

import CaptionSelector from '../../../components/CaptionSelector';
import MIFormControl from '../../../components/MIFormControl';
import MIBlurInput from '../../../components/MIBlurInput';
import MITable from '../../../components/MITable';

import { costToMineTableColumns } from '../../../constants';
import { homeSectionHead, homeSectionTitle } from '../../../styles';

import {
  getCostToMine,
} from '../../../store/actions/costToMine';
import history from '../../../history';
let hardwareData = require('../../../hardware.json');
let qs = require('qs');

const loadingPattern = '---------'

const costToMineRows = [
  {
    hardwareModel: 'Antminer S9',
    electricityPrice: loadingPattern,
    dpStockFirmware: loadingPattern,
    dpBrainOS: loadingPattern,
    dailyBtcMined: loadingPattern,
    profitability: 0,
  },
  {
    hardwareModel: 'Antminer S17',
    electricityPrice: loadingPattern,
    dpStockFirmware: loadingPattern,
    dpBrainOS: loadingPattern,
    dailyBtcMined: loadingPattern,
    profitability: 0,
  },
  {
    hardwareModel: 'Antminer S19',
    electricityPrice: loadingPattern,
    dpStockFirmware: loadingPattern,
    dpBrainOS: loadingPattern,
    dailyBtcMined: loadingPattern,
    profitability: 0,
  },
  {
    hardwareModel: 'Whatsminer M20S',
    electricityPrice: loadingPattern,
    dpStockFirmware: loadingPattern,
    dpBrainOS: loadingPattern,
    dailyBtcMined: loadingPattern,
    profitability: 0,
  },
  {
    hardwareModel: 'Whatsminer M30S',
    electricityPrice: loadingPattern,
    dpStockFirmware: loadingPattern,
    dpBrainOS: loadingPattern,
    dailyBtcMined: loadingPattern,
    profitability: 0,
  }
];

const costToMineBTCDifficulties = []

let timeout = null;
let timeOutTime = 0;

const useStyles = makeStyles(theme => ({
  sectionHead: homeSectionHead,
  sectionTitle: {...homeSectionTitle, fontSize: '24px'},
  braiinsOS: {
    color: '#6B50FF',
  },
}));

const CostToMine = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    btcPrice: '',
    networkDifficulty: '',
    hashrate: 17,
    consumption: 1500,
    electricity: 0.05,
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
    pathname: '',
    configHardware: costToMineRows
  });

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
        hashrate: params['hashrate'] || 17,
        consumption: params['consumption'] || 1500,
        electricity: params['electricity'] || 0.05,
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
        pathname: location.pathname,
        // initialStateChanged: true
      }));

      //make the url short
      history.push(location.pathname);
    } else {
      setState((prevState) => ({
        ...prevState,
        pathname: location.pathname,
      }));
    }
  }

  // Get profitability based on the Daily Profit (Stock Firmware)
  const getProfitability = (dailyProfit) => {
    switch (true) {
      case dailyProfit <= -5.0: return { 'text': '-₿₿₿', 'value': 1 };
      case dailyProfit >  -5.0  && dailyProfit <= 0.0:  return { 'text': '-₿', 'value': 2 };
      case dailyProfit >  0.0   && dailyProfit <= 5.0:  return { 'text': '₿', 'value': 3 };
      case dailyProfit >  5.0   && dailyProfit <= 10.0: return { 'text': '₿₿₿', 'value': 4 };
      case dailyProfit >  10.0  && dailyProfit <= 20.0: return { 'text': '₿₿₿₿₿', 'value': 5 };
      case dailyProfit >  20.0: return { 'text': '₿₿₿₿₿₿₿', 'value': 6 };
    }
  }

  const getCostToMineQuery = ({ val, btcPrice , networkDifficulty , otherHardware } = {}) => {

    // Get va;ue of consumption for hardware model
    let hardwareName = costToMineRows[val]['hardwareModel'].split(' ')[0]
    if (hardwareName === 'Antminer') {
      hardwareName = 'Bitmain ' + '(' + hardwareName + ')'
    }
    else if (hardwareName === 'Whatsminer') {
      hardwareName = 'MicroBT ' + '(' + hardwareName + ')'
    }

    let hardware_model = ''
    if (typeof costToMineRows[val]['hardwareModel'].split(' ')[2] !== 'undefined') {
      hardware_model = costToMineRows[val]['hardwareModel'].split(' ')[2]
    }

    let hardware = costToMineRows[val]['hardwareModel'].split(' ')[1] + hardware_model
    let consumption = hardwareData[hardwareName][hardware]['consumption']
    let hashrate    = hardwareData[hardwareName][hardware]["hashrate"]
    let costToMineQuery = '';

    let costToMineQueryForBraiins = '';
    let consumptionForBraiinsExist = otherHardware ? hardwareData[otherHardware][costToMineRows[val]['hardwareModel'] + " Overclocking"] : undefined
    
    let costToMineParams = [{ key: 'btcPrice', paramKey: 'btc_price', required: false },
    { key: 'networkDifficulty', paramKey: 'network_difficulty', required: false },
    { key: 'hashrate', paramKey: 'hashrate', required: true },
    { key: 'consumption', paramKey: 'consumption', required: true },
    { key: 'electricity', paramKey: 'electricity', required: true },
    { key: 'blockReward', paramKey: 'block_reward', required: true },
    { key: 'poolFee', paramKey: 'pool_fee', required: true },
    { key: 'otherFees', paramKey: 'other_fees', required: false },
    { key: 'diffIncrement', paramKey: 'diff_increment', required: false },
    { key: 'avgTxFeesBlock', paramKey: 'avg_tx_fees_block', required: false },
    { key: 'hardwareName', paramKey: 'hardwareName', required: false }
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
        costToMineQuery += `${param.paramKey}=${ btcPrice ? btcPrice : state[param.key]}`;
        if(consumptionForBraiinsExist){
          costToMineQueryForBraiins += `${param.paramKey}=${ btcPrice ? btcPrice : state[param.key]}`;
        }
      } else {
        //  Check param key if consumption key is there set consumption value
        if (param.paramKey === 'consumption') {
          costToMineQuery += `&${param.paramKey}=${consumption}`;
          if (consumptionForBraiinsExist) {
            costToMineQueryForBraiins += `&${param.paramKey}=${consumptionForBraiinsExist['consumption']}`;
          }
        }else if (param.paramKey === 'hashrate') {
          costToMineQuery += `&${param.paramKey}=${hashrate}`;
          if (consumptionForBraiinsExist) {
            costToMineQueryForBraiins += `&${param.paramKey}=${consumptionForBraiinsExist['hashrate']}`;
          }
        }else if (param.paramKey === 'hardwareName'){
          costToMineQuery += `&${param.paramKey}=${hardwareName + " / " + hardware}`;
          if (consumptionForBraiinsExist) {
            costToMineQueryForBraiins += `&${param.paramKey}=${otherHardware + " / " + costToMineRows[val]['hardwareModel'] + " Overclocking"}`;
          }
        }else if(param.key === 'networkDifficulty'){
          costToMineQuery += `&${param.paramKey}=${ networkDifficulty ? networkDifficulty : state[param.key]}`;
          if (consumptionForBraiinsExist) {
            costToMineQueryForBraiins += `&${param.paramKey}=${ networkDifficulty ? networkDifficulty : state[param.key]}`;
          }
        }
        else {
          costToMineQuery += `&${param.paramKey}=${state[param.key]}`
          if (consumptionForBraiinsExist) {
            costToMineQueryForBraiins += `&${param.paramKey}=${state[param.key]}`
          }
        }
      }
    });
    return { costToMineQuery, costToMineQueryForBraiins, makeCall }
  }

  const getCostToMineQueryForTable = (val) => {

    let { costToMineQuery, costToMineQueryForBraiins, makeCall } = getCostToMineQuery( { val, otherHardware:"Braiins OS+ Autotuning" } );

    if (!makeCall) {
      return false;
    }

    props.getCostToMine(costToMineQuery)
      .then(res => {
        costToMineBTCDifficulties[val] = { btcPrice: res.price, networkDifficulty: res.difficulty }
        costToMineRows[val]['dailyBtcMined'] = res['btcMinedDaily'] + ' BTC'
        costToMineRows[val]['electricityPrice'] = '$' + res['breakEven'] + '/kWh'
        costToMineRows[val]['dpStockFirmware'] = '$' + res['dailyProfit'] + ' USD'
        costToMineRows[val]['profitability'] = getProfitability(res['dailyProfit'])

        let newCostToMineRow = []
        if (costToMineQueryForBraiins != '') {
          props.getCostToMine(costToMineQueryForBraiins)
            .then(resBraiins => {
              costToMineRows[val]['dpBrainOS'] = '$' + resBraiins['dailyProfit'] + ' USD'
              newCostToMineRow = state.configHardware
              newCostToMineRow[val] = costToMineRows[val]
              setState((prevState) => ({
                ...prevState,
                configHardware: newCostToMineRow
              }))
            })
            .catch(err => {
              //console.log(err.msg);
            })
        } else {
          costToMineRows[val]['dpBrainOS'] = 'Coming Soon™'
          newCostToMineRow = state.configHardware
          newCostToMineRow[val] = costToMineRows[val]
          newCostToMineRow = state.configHardware
          setState((prevState) => ({
            ...prevState,
            configHardware: newCostToMineRow
          }))
        }
      })
      .catch(err => {
        //console.log(err.msg);
      });
  }

  const apiCallHandler = (index) => {
    getCostToMineQueryForTable(index);
  }

  // call api to show values in Cost to Mine 1 BTC popular hardware
  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      for (let index in costToMineRows) {
        apiCallHandler(index);
      }
      timeOutTime = 0;
    }, timeOutTime);
  }, [state.electricity]);

  const handleBlur = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      electricity: value
    }));
  }

  const handleOnChange = (key, value) => {
    // setState((prevState) => ({
    //   ...prevState,
    //   electricity: value
    // }));
  }
  
  const resolveCell = (row, column) => {

    if (column.name === 'profitability') {
      return <CaptionSelector value={row[column.name]} />;
    }
    if (column.name === 'hardwareModel') {
      let index = costToMineRows.findIndex((costToMineRow) => costToMineRow.hardwareModel == row[column.name])

      let { costToMineQuery } = getCostToMineQuery( { 
                                                    val               : index, 
                                                    btcPrice          : costToMineBTCDifficulties[index] 
                                                                        ? costToMineBTCDifficulties[index].btcPrice : '', 
                                                    networkDifficulty : costToMineBTCDifficulties[index] 
                                                                        ? costToMineBTCDifficulties[index].networkDifficulty : '' });
      return <a href={"/cost-to-mine?" + costToMineQuery} target="_blank">{row[column.name]}</a>
    }
    if (column.name === 'dpBrainOS'){
      if(row[column.name] !== loadingPattern){
        if (row[column.name] === 'Coming Soon™'){
          return <a className={classes.braiinsOS} href="https://braiins.com/os/plus" target="_blank">{row[column.name]}</a>
        }else{
          let index = costToMineRows.findIndex((costToMineRow) => costToMineRow.hardwareModel == row['hardwareModel'])
  
          let { costToMineQueryForBraiins } = getCostToMineQuery( { 
                                                        val               : index, 
                                                        btcPrice          : costToMineBTCDifficulties[index] 
                                                                            ? costToMineBTCDifficulties[index].btcPrice : '', 
                                                        networkDifficulty : costToMineBTCDifficulties[index] 
                                                                            ? costToMineBTCDifficulties[index].networkDifficulty : '', 
                                                        otherHardware     : "Braiins OS+ Autotuning"});
    
          return <a className={classes.braiinsOS} href={"/cost-to-mine?" + costToMineQueryForBraiins} target="_blank">{row[column.name]}</a>
        }
      }
    }
    return row[column.name];
  };

  return (
    <div className={classNames(classes.section, 'mt-5')}>
      <div className={classes.sectionHead}>
        <div className={classes.sectionTitle}>Profitability of Popular SHA-256 ASICs</div>
        <MIFormControl
          label="Electricity Price"
          justifyContent="flex-end"
          position="unset"
          labelMargin="0 1rem 0 0 "
          width={'unset'}
        >
          <MIBlurInput
            errorTooltip={'unset'}
            width={225}
            suffix="USD"
            name="electricity"
            value={state.electricity}
            min={0}
            max={0.15}
            onBlur={(v) => handleBlur('electricity', v)}
            onChange={(e) => handleOnChange('electricity', e.target.value)}
          />
        </MIFormControl>
      </div>
      <MITable
        columns={costToMineTableColumns}
        rows={state.configHardware}
        resolveCell={resolveCell}
      />
    </div>
  );
}

const mapStateToProps = store => ({
  costToMineData: store.rootReducer.costToMine.costToMineData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCostToMine
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CostToMine);
