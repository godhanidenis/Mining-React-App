import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import MIFormControl from '../../../components/MIFormControl';
import MIInput from '../../../components/MIInput';
import MIBlurInput from '../../../components/MIBlurInput';
import MISwitch from '../../../components/MISwitch';
import HardwareDialog from '../../../components/HardwareDialog';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';

import LogoWhite from '../../../assets/img/logo.png';
import vector from '../../../assets/img/Vector.png';
import BraiinsOSLogo from '../../../assets/img/braiins-os-logo-widget.svg';

import { isEmbed, isProfitabilityCalculator, isCostToMine, isEmbedCostToMine } from '../../../constants';
import lang from '../../../lang';

import {
  getProfitability,
} from '../../../store/actions/profitabilityCalculator';

import {
  getCostToMine,
} from '../../../store/actions/costToMine';
import history from '../../../history';

let qs = require('qs');
let hardwareData = require('../../../hardware.json');

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#161616',
    padding: '1.5rem 1rem',
    width: 344,
  },
  rootMobile: {
    backgroundColor: '#161616',
    padding: '1.5rem 1rem',
    width: '100%',
    marginTop: '20px'
  },
  advancedOption: {
    cursor: 'pointer',
  },
  advOptionIcon: {
    fill: '#8d8d8d',
    height: '22px',
    marginLeft: '12px',
    width: '22px',
    cursor: 'pointer',
  },
  gridItem: {
    marginBottom: '15px',
    padding: '0 1px'
  },
  optionLine: {
    borderBottom: '1px solid #8d8d8d',
    margin: '34px 0 0 5px',
    width: '100%',
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  bottomText: {
    color: '#fff'
  },
  subTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 600,
  },
  btnConfirm: {
    background: '#6B50FF !important',
    borderRadius: '0',
    color: '#B8B8B8',
    fontSize: '14px',
    marginLeft: '114px !important',
    textTransform: 'capitalize',
  },
  btnLabel: {
    display: 'block',
    textAlign: 'left',
    color: '#fff'
  },
  content: {
    backgroundColor: '#262626'
  },
  image_93: {
    marginBottom: '0',
    height: "13px"
  },
  bottomTextResponsive: {
    fontSize: '17px'
  }
}));
let timeout = null;
let timeOutTime = 0;

const LeftMenu = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    isAdvancedOptionsVisible: false,
    isBraiinsOptionsVisible: false,
    initialStateChanged: false,
    stateChangeType: '',
    btcPrice: '',
    networkDifficulty: '',
    hashrate: isCostToMine(window.location.pathname) ? 17 : 6800,
    consumption: isCostToMine(window.location.pathname) ? 1500 : 336000,
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
    queryString: '',
    pathname: '',
    hardwareName:props.data.hardwareName
  });

  let language = window.location.pathname.split('/')[2];

  if (language === 'cost-to-mine' || language === 'profitability-calculator' || language === undefined){
    language = 'en';
  }

  const handleClickSwitch = () => {
    setState((prevState) => ({
      ...prevState,
      isAdvancedOptionsVisible: !state.isAdvancedOptionsVisible,
      stateChangeType: 'clickSwitch',
    }))
  };

  const handleBraiinsSwitch = () => {
    let [hardwareName, hardwareModel] = state.hardwareName.split(' / ');

    if (!state.isBraiinsOptionsVisible) {
      if (hardwareModel === 'S9i' || hardwareModel === 'S9j') {
        hardwareModel = 'S9';
      }

      hardwareModel = hardwareData[hardwareName][hardwareModel].compare;
      hardwareName = "Braiins OS+ Autotuning"

      document.getElementsByClassName("sub_title")[0].innerText = "Compare with Braiins OS+ High Efficiency"
      document.getElementsByClassName("main_title")[0].innerText = "STATS WITH BRAIINS OS+"
    } else {
      const originalModel = document.getElementsByClassName("hardware_name")[0].value.split(' / ')[1];

      // hardwareModel = hardwareData[hardwareName][hardwareModel].compare;
      hardwareName = "Bitmain (Antminer)"
      // hardwareModel = hardwareModel.replace('High Efficiency', '').replace('Overclocking', '').replace('Antminer', '').trim();

      // if (originalModel === 'S9i' || originalModel === 'S9j') {
      hardwareModel = originalModel;
      // }

      document.getElementsByClassName("sub_title")[0].innerText = ""
      document.getElementsByClassName("main_title")[0].innerText = "STATS"
    }

    if (props.onChangeData) {
      props.onChangeData({
        hashrate: hardwareData[hardwareName][hardwareModel]["hashrate"],
        consumption: hardwareData[hardwareName][hardwareModel]["consumption"],
        hardwareName: hardwareName + " / " + hardwareModel,
        stateChangeType: 'inputChanged',
      });
    }

    setState((prevState) => ({
      ...prevState,
      isBraiinsOptionsVisible: !state.isBraiinsOptionsVisible,
    }));
  };

  const getProfitabilityQuery = () => {
    let queryString = '';
    let params = [
      { key: 'btcPrice', paramKey: 'btc_price', required: false },
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
      { key: 'discountRate', paramKey: 'discount_rate', required: false }
    ];
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
    if (!makeCall) {
      return false;
    }
    props.getProfitability(queryString)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        //console.log(err.msg);
      });

    //add shareable link and embed link
    props.addShareableLink(queryString);
    queryString = queryString.concat("&download=1")
    if (document.getElementById("csv_link")) {
      document.getElementById("csv_link").href = process.env.REACT_APP_API_URL + '/api/v0.1/calculator?' + queryString
    }
    setState((prevState) => ({
      ...prevState,
      queryString: queryString,
      stateChangeType: ''
    }))
  }

  const createCostToMineQuery = (btcPrice = '', networkDifficulty = '') => {

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
      } else {
        if (param.key === 'hardwareName'){
          costToMineQuery += `&${param.paramKey}=${state[param.key].replaceAll('+', '%2B')}`;
        }else if(param.key === 'networkDifficulty'){
          costToMineQuery += `&${param.paramKey}=${ networkDifficulty ? networkDifficulty : state[param.key]}`;
        }
        else{
          costToMineQuery += `&${param.paramKey}=${state[param.key]}`;
        }
      }
    });
    return { costToMineQuery, makeCall }

  }

  const getCostToMineQuery = () => {

    let { costToMineQuery, makeCall } = createCostToMineQuery()

    if (!makeCall) {
      return false;
    }
    props.getCostToMine(costToMineQuery)
      .then(res => {
        let { costToMineQuery} = createCostToMineQuery(res.price, res.difficulty)
        //console.log('left menu', costToMineQuery)
        props.addShareableLink(costToMineQuery);
      })
      .catch(err => {
        //console.log(err.msg);
      });

    //add shareable link and embed
    
  }

  const apiCallHandler = () => {
    if (isProfitabilityCalculator(state.pathname)) {
      getProfitabilityQuery();
    }
    if (isCostToMine(state.pathname)) {
      getCostToMineQuery();
    }
  }

  const handleChangeHardware = (key, val) => {

    if (state.isBraiinsOptionsVisible) {
      setState((prevState => ({
        ...prevState,
        isBraiinsOptionsVisible: false
      })))
    }
    handleOnChange(key, val);
    setState((prevState) => ({
      ...prevState,
      stateChangeType: 'inputChanged',
    }));
  }

  const handleOnChange = (key, val) => {
    setState((prevState) => ({
      ...prevState,
      [key]: val,
    }))
    timeOutTime = 1000;
  }
  const handleOnKeyDown = () => {
    setState((prevState) => ({
      ...prevState,
      stateChangeType: 'inputChanged'
    }))
  }

  const handleBlur = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      stateChangeType: 'inputChanged',
      [key]: value,
    }));

    if (props.onChangeInput && (key === 'hashrate' || key === 'consumption' || key === 'hardwareName')) {
      props.onChangeInput(key, value);
    }
  }

  const location = useLocation();
  if (state.pathname !== location.pathname) {
    //check for query string
    if (location.search !== "") {
      let params = location.search.split("?");
      params = qs.parse(params[1], {decoder: (c) => c});
      //check from url and change states
      setState((prevState) => ({
        ...prevState,
        btcPrice: params['btc_price'] || '',
        networkDifficulty: params['network_difficulty'] || '',
        hashrate: params['hashrate'] || (isCostToMine(state.pathname) ? 13.5 : 6800),
        consumption: params['consumption'] || (isCostToMine(state.pathname) ? 1160 : 336000),
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
        initialHardware: params['initial_hardware'] || 0,
        monthlyOpex: params['monthly_opex'] || 0,
        hardwareChange: params['hardware_change'] || 0,
        initialInfra: params['initial_infra'] || 0,
        infraChange: params['initial_change'] || 0,
        hodlRatio: params['hodl_ratio'] || 0,
        discountRate: params['discount_rate'] || 0,
        pathname: location.pathname,
        hardwareName: params['hardwareName'] ? decodeURIComponent(params['hardwareName']) : '',
        initialStateChanged: true,
        stateChangeType: 'inputChanged'
      }));
      
      props.setHardwareNameFromQuery(decodeURIComponent(params['hardwareName']), params['hashrate'], params['consumption']);
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

  useEffect(() => {

    if (state.stateChangeType === 'inputChanged') {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        apiCallHandler();
        timeOutTime = 0;
      }, timeOutTime);
    }
  }, [state]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      hashrate: props.data.hashrate,
      consumption: props.data.consumption,
      hardwareName: props.data.hardwareName,
      stateChangeType: props.data.stateChangeType
    }));
  }, [
    props.data.hashrate,
    props.data.consumption,
    props.data.hardwareName,
    props.data.stateChangeType
  ]);

  // update btc price and network difficulty
  if (!state.initialStateChanged) {

    // for profitability calculator
    if (props.profitabilityData && props.profitabilityData.apiPrice && isProfitabilityCalculator(state.pathname)) {
      setState((prevState) => ({
        ...prevState,
        btcPrice: props.profitabilityData.apiPrice,
        networkDifficulty: props.profitabilityData.apiDifficulty,
        initialStateChanged: true,
        stateChangeType: 'initialStateChange'
      }));
    }

    //for cost to mine
    if (props.costToMineData && props.costToMineData.price && isCostToMine(state.pathname)) {
      setState((prevState) => ({
        ...prevState,
        btcPrice: props.costToMineData.price,
        networkDifficulty: props.costToMineData.difficulty,
        initialStateChanged: true,
        stateChangeType: 'initialStateChange'
      }));
    }

  }

  const setHardwareName = (hardwareName) => {

    props.setHardwareName(hardwareName);
    setState((prevState) => ({
      ...prevState,
      hardwareName
    }))
  }

  return (
    <Box display="flex" width={isEmbed(state.pathname) ? '100%' : 'initial'}>
      <Box className={classes.root} display={{ xs: 'none', md: isEmbed(state.pathname) ? 'none' : 'block' }}>
        {
          !isEmbed(state.pathname) && (
            <div>
              <div className={classes.title}>INPUTS</div>
              <MIFormControl label="BTC Price">
                <MIBlurInput
                  width={128}
                  suffix="USD"
                  name="btcPrice"
                  value={state.btcPrice}
                  min={0}
                  max={1000000}
                  onBlur={(v) => handleBlur('btcPrice', v)}
                  onChange={(e) => handleOnChange('btcPrice', e.target.value)}
                />
              </MIFormControl>
              <MIFormControl label="Network Difficulty">
                <MIBlurInput
                  width={128}
                  name="networkDifficulty"
                  value={state.networkDifficulty}
                  min={1000000000000}
                  max={100000000000000}
                  onBlur={(v) =>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ('networkDifficulty', v)}
                  onChange={(e) => handleOnChange('networkDifficulty', e.target.value)}
                />
              </MIFormControl>
              {
                state.pathname === '/cost-to-mine' && (
                  <HardwareDialog data = {state} onChange={handleChangeHardware} setHardwareName={setHardwareName} />
                )
              }
              <MIFormControl label="Hashrate">
                <MIBlurInput
                  width={128}
                  suffix="TH/s"
                  name="hashrate"
                  value={state.hashrate}
                  min={0}
                  max={100000000}
                  onBlur={(v) => handleBlur('hashrate', v)}
                  onChange={(e) => handleOnChange('hashrate', e.target.value)}
                />
              </MIFormControl>
              <MIFormControl label="Consumption">
                <MIBlurInput
                  width={128}
                  suffix="W"
                  name="consumption"
                  value={state.consumption}
                  min={0}
                  max={20000000000}
                  onBlur={(v) => handleBlur('consumption', v)}
                  onChange={(e) => handleOnChange('consumption', e.target.value)}
                />
              </MIFormControl>
              <MIFormControl label="Electricity Price per kWh">
                <MIBlurInput
                  width={128}
                  suffix="USD"
                  name="electricity"
                  value={state.electricity}
                  min={0}
                  max={0.15}
                  onBlur={(v) => handleBlur('electricity', v)}
                  onChange={(e) => handleOnChange('electricity', e.target.value)}
                />
              </MIFormControl>
              <MIFormControl label="Block Subsidy">
                <MIBlurInput
                  width={128}
                  name="blockReward"
                  value={state.blockReward}
                  min={0}
                  max={6.25}
                  onBlur={(v) => handleBlur('blockReward', v)}
                  onChange={(e) => handleOnChange('blockReward', e.target.value)}
                />
              </MIFormControl>
              <MIFormControl label="Pool Fee">
                <MIBlurInput
                  width={128}
                  suffix="%"
                  name="poolFee"
                  value={state.poolFee}
                  min={0}
                  max={5}
                  onBlur={(v) => handleBlur('poolFee', v)}
                  onChange={(e) => handleOnChange('poolFee', e.target.value)}
                />
              </MIFormControl>
              {
                state.pathname === '/profitability-calculator' && (
                  <React.Fragment>
                    <MIFormControl
                      label="Avg. Transaction Fees"
                      info="Average value of transaction fees per block mined"
                    >
                      <MIBlurInput
                        width={128}
                        suffix="BTC"
                        name="txFees"
                        value={state.txFees}
                        min={0}
                        max={15}
                        onBlur={(v) => handleBlur('txFees', v)}
                        onChange={(e) => handleOnChange('txFees', e.target.value)}
                      />
                    </MIFormControl>
                    <MIFormControl
                      label="Time Period"
                      info="Time period over which you wish to run the cash flow / profitability calculations"
                    >
                      <MIBlurInput
                        width={128}
                        suffix="month(s)"
                        name="timePeriod"
                        value={state.timePeriod}
                        min={0}
                        max={60}
                        onBlur={(v) => handleBlur('timePeriod', v)}
                        onChange={(e) => handleOnChange('timePeriod', e.target.value)}
                      />
                    </MIFormControl>
                    <MIFormControl
                      label="Other Fees"
                      info="Additional operational expenses such as dev fees for firmware, management and hosting fees, etc."
                    >
                      <MIBlurInput
                        width={128}
                        suffix="%"
                        name="otherFees"
                        value={state.otherFees}
                        min={0}
                        max={99}
                        onBlur={(v) => handleBlur('otherFees', v)}
                        onChange={(e) => handleOnChange('otherFees', e.target.value)}
                      />
                    </MIFormControl>
                    <MIFormControl
                      label="Difficulty Increment"
                      info="Monthly change in difficulty over the given Time Period. Note there are approximately 2 difficulty adjustments per month, so this increment should be roughly double your expected average difficulty adjustment"
                    >
                      <MIBlurInput
                        width={128}
                        suffix="%/month"
                        name="diffIncrement"
                        value={state.diffIncrement}
                        min={-20}
                        max={20}
                        onBlur={(v) => handleBlur('diffIncrement', v)}
                        onChange={(e) => handleOnChange('diffIncrement', e.target.value)}
                      />
                    </MIFormControl>
                    <MIFormControl
                      label="Price Increment"
                      info="Monthly increase or decrease in BTC price over the given Time Period"
                    >
                      <MIBlurInput
                        width={128}
                        suffix="%/month"
                        name="priceIncrement"
                        value={state.priceIncrement}
                        min={-20}
                        max={20}
                        onBlur={(v) => handleBlur('priceIncrement', v)}
                        onChange={(e) => handleOnChange('priceIncrement', e.target.value)}
                        inputOnChange={handleOnChange}
                      />
                    </MIFormControl>
                  </React.Fragment>
                )}
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <div onClick={handleClickSwitch} className={classNames(classes.title, 'mt-4')}>Advanced Options</div>
                <MISwitch
                  checked={state.isAdvancedOptionsVisible}
                  onChange={handleClickSwitch}
                />
              </Box>
              {
                state.isAdvancedOptionsVisible && (
                  <React.Fragment>
                    {
                      state.pathname === '/profitability-calculator' && (
                        <React.Fragment>
                          <MIFormControl
                            label="CAPEX"
                            info="Initial capital expenditure (e.g. purchasing hardware, setting up more capacity, labor and materials for installation, etc.) "
                          >
                            <MIBlurInput
                              width={128}
                              suffix="USD"
                              name="capex"
                              value={state.capex}
                              min={0}
                              max={1000000000}
                              onBlur={(v) => handleBlur('capex', v)}
                              onChange={(e) => handleOnChange('capex', e.target.value)}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="Monthly OPEX"
                            info="Fixed monthly expenses (e.g. labor, security, insurance, taxes, etc.)"
                          >
                            <MIBlurInput
                              width={128}
                              suffix="USD"
                              name="monthlyOpex"
                              value={state.monthlyOpex}
                              min={0}
                              max={1000000000}
                              onBlur={(v) => handleBlur('monthlyOpex', v)}
                              onChange={(e) => handleOnChange('monthlyOpex', e.target.value)}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="Initial Hardware Value"
                            info="Total starting value of your ASIC hardware inventory"
                          >
                            <MIBlurInput
                              width={128}
                              suffix="USD"
                              name="initialHardware"
                              value={state.initialHardware}
                              min={0}
                              max={1000000000}
                              onBlur={(v) => handleBlur('initialHardware', v)}
                              onChange={(e) => handleOnChange('initialHardware', e.target.value)}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="Hardware Appreciation / Depreciaton"
                            info="Monthly % change in the value of your ASIC hardware inventory"
                          >
                            <MIBlurInput
                              width={128}
                              suffix="%/month"
                              name="hardwareChange"
                              value={state.hardwareChange}
                              min={-20}
                              max={20}
                              onBlur={(v) => handleBlur('hardwareChange', v)}
                              onChange={(e) => handleOnChange('hardwareChange', e.target.value)}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="Initial Infra Value"
                            info="Total starting value of your infrastructure (e.g. land, data center infrastructure, containers, immersion cooling systems, etc.)"
                          >
                            <MIBlurInput
                              width={128}
                              suffix="USD"
                              name="initialInfra"
                              value={state.initialInfra}
                              min={0}
                              max={1000000000}
                              onBlur={(v) => handleBlur('initialInfra', v)}
                              onChange={(e) => handleOnChange('initialInfra', e.target.value)}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="Infra Appreciation / Depreciaton"
                            info="Monthly % change in the value of your infrastructure"
                          >
                            <MIBlurInput
                              width={128}
                              suffix="%/month"
                              name="infraChange"
                              value={state.infraChange}
                              min={-20}
                              max={20}
                              onBlur={(v) => handleBlur('infraChange', v)}
                              onChange={(e) => handleOnChange('infraChange', e.target.value)}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="HODL Ratio"
                            info="The % of your monthly profit that you hold as BTC instead of cashing out entirely to fiat"
                          >
                            <MIBlurInput
                              width={128}
                              suffix="%"
                              name="hodlRatio"
                              value={state.hodlRatio}
                              min={0}
                              max={100}
                              onBlur={(v) => handleBlur('hodlRatio', v)}
                              onChange={(e) => handleOnChange('hodlRatio', e.target.value)}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="Discount Rate"
                            info="The interest rate used in discounted cash flow (DCF) analysis to determine the present value of future cash flows."
                          >
                            <MIBlurInput
                              width={128}
                              suffix="%"
                              name="discountRate"
                              value={state.discountRate}
                              min={0}
                              max={100}
                              onBlur={(v) => handleBlur('discountRate', v)}
                              onChange={(e) => handleOnChange('discountRate', e.target.value)}
                            />
                          </MIFormControl>
                        </React.Fragment>
                      )
                    }
                    {
                      state.pathname === '/cost-to-mine' && (
                        <React.Fragment>
                          <MIFormControl
                            label="Difficulty Increment"
                            info="Adjust the current difficulty by any percentage"
                          >
                            <MIBlurInput
                              width={128}
                              suffix="%"
                              name="diffIncrement"
                              value={state.diffIncrement}
                              min={-20}
                              max={100}
                              onBlur={(v) => handleBlur('diffIncrement', v)}
                              onChange={(e) => handleOnChange('diffIncrement', e.target.value)}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="Other Fees"
                            info="Additional operational expenses such as dev fees for firmware, management and hosting fees, etc."
                          >
                            <MIBlurInput
                              width={128}
                              suffix="%"
                              name="otherFees"
                              value={state.otherFees}
                              min={0}
                              max={99}
                              onBlur={(v) => handleBlur('otherFees', v)}
                              onChange={(e) => handleOnChange('otherFees', e.target.value)}
                              inputOnChange={handleOnChange}
                            />
                          </MIFormControl>
                          <MIFormControl
                            label="Avg. Transaction Fees"
                            info="Average value of transaction fees per block mined"
                          >
                            <MIBlurInput
                              width={128}
                              suffix="BTC"
                              name="avgTxFeesBlock"
                              value={state.avgTxFeesBlock}
                              min={0}
                              max={15}
                              onBlur={(v) => handleBlur('avgTxFeesBlock', v)}
                              onChange={(e) => handleOnChange('avgTxFeesBlock', e.target.value)}
                              inputOnChange={handleOnChange}
                            />
                          </MIFormControl>
                        </React.Fragment>
                      )
                    }
                  </React.Fragment>
                )
              }
              {
                state.pathname === '/cost-to-mine' && (
                  <Box className={classes.content + ' p-3 bottom_block'}>
                    <div className="row">
                      <img src={BraiinsOSLogo} width={130} className="ml-3" />
                      {/* <img src={LogoWhite} width="95" alt="" className={classes.image_93 + ' ml-3 mt-2'} />
                      <img src={vector} width="45" alt="" className={classes.image_93 + ' ml-3 mt-2'} /> */}
                    </div>
                    <div className="row mt-4">
                      <div className={classes.bottomText + ' col-12'}>Get up to 20% better efficiency with Braiins OS+ </div>
                    </div>
                    <div className="row mt-4">
                      <div className={classes.bottomText + ' col-10'}>
                        Show results for Braiins OS+
                    </div>
                      <div className="col-2">
                        <MISwitch
                          checked={state.isBraiinsOptionsVisible}
                          onChange={handleBraiinsSwitch}
                          setHardwareName={setHardwareName}
                        />
                      </div>
                    </div>
                  </Box>
                )
              }
            </div>
          )
        }
      </Box>

      {/*****Mobile Menu*****/}
      <Box className={classes.rootMobile} display={{ xs: 'block', md: isEmbed(state.pathname) ? 'block' : 'none' }}>
        {
          (isCostToMine(state.pathname) || isProfitabilityCalculator(state.pathname)) && (
            <div>
              <div className={classes.title}>{lang[language]['INPUTS']}</div>
              <Grid container>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl label={lang[language]['BTC Price']} display="block" labelMargin="0 0 8px">
                    <MIBlurInput
                      width="100%"
                      suffix="USD"
                      name="btcPrice"
                      value={state.btcPrice}
                      min={0}
                      max={1000000}
                      onBlur={(v) => handleBlur('btcPrice', v)}
                      onChange={(e) => handleOnChange('btcPrice', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl label={lang[language]['Network Difficulty']} display="block" labelMargin="0 0 8px">
                    <MIBlurInput
                      width="100%"
                      name="networkDifficulty"
                      value={state.networkDifficulty}
                      min={1000000000000}
                      max={100000000000000}
                      onBlur={(v) => handleBlur('networkDifficulty', v)}
                      onChange={(e) => handleOnChange('networkDifficulty', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                {
                  isCostToMine(state.pathname) && (
                    <Grid item xs={12} sm={4} className={classes.gridItem}>
                      <HardwareDialog data = {state} onChange={handleChangeHardware} setHardwareName={setHardwareName} />
                    </Grid>
                  )
                }
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl label={lang[language]['Hashrate']} display="block" labelMargin="0 0 8px">
                    <MIBlurInput
                      width="100%"
                      suffix="TH/s"
                      name="hashrate"
                      value={state.hashrate}
                      min={0}
                      max={100000000}
                      onBlur={(v) => handleBlur('hashrate', v)}
                      onChange={(e) => handleOnChange('hashrate', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl label={lang[language]['Consumption']} display="block" labelMargin="0 0 8px">
                    <MIBlurInput
                      width="100%"
                      suffix="W"
                      name="consumption"
                      value={state.consumption}
                      min={0}
                      max={20000000000}
                      onBlur={(v) => handleBlur('consumption', v)}
                      onChange={(e) => handleOnChange('consumption', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl label={lang[language]['Electricity Price per kWh']} display="block" labelMargin="0 0 8px">
                    <MIBlurInput
                      width="100%"
                      suffix="USD"
                      name="electricity"
                      value={state.electricity}
                      min={0}
                      max={0.15}
                      onBlur={(v) => handleBlur('electricity', v)}
                      onChange={(e) => handleOnChange('electricity', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl label={lang[language]['Block Subsidy']} display="block" labelMargin="0 0 8px">
                    <MIBlurInput
                      width="100%"
                      name="blockReward"
                      value={state.blockReward}
                      min={0}
                      max={6.25}
                      onBlur={(v) => handleBlur('blockReward', v)}
                      onChange={(e) => handleOnChange('blockReward', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl label={lang[language]['Pool Fee']} display="block" labelMargin="0 0 8px">
                    <MIBlurInput
                      width="100%"
                      suffix="%"
                      name="poolFee"
                      value={state.poolFee}
                      min={0}
                      max={5}
                      onBlur={(v) => handleBlur('poolFee', v)}
                      onChange={(e) => handleOnChange('poolFee', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl
                    label={lang[language]['Avg. Transaction Fees']}
                    info={lang[language]['Average value of transaction fees per block mined']}
                    display="block" labelMargin="0 0 8px"
                  >
                    <MIBlurInput
                      width="100%"
                      suffix="BTC"
                      name="txFees"
                      value={state.txFees}
                      min={0}
                      max={15}
                      onBlur={(v) => handleBlur('txFees', v)}
                      onChange={(e) => handleOnChange('txFees', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl
                    label={lang[language]['Time Period']}
                    info={lang[language]['Time period over which you wish to run the cash flow / profitability calculations']}
                    display="block" labelMargin="0 0 8px"
                  >
                    <MIBlurInput
                      width="100%"
                      suffix="month(s)"
                      name="timePeriod"
                      value={state.timePeriod}
                      min={0}
                      max={60}
                      onBlur={(v) => handleBlur('timePeriod', v)}
                      onChange={(e) => handleOnChange('timePeriod', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl
                    label={lang[language]['Other Fees']}
                    info={lang[language]['Additional operational expenses such as dev fees for firmware, management and hosting fees, etc.']}
                    display="block" labelMargin="0 0 8px"
                  >
                    <MIBlurInput
                      width="100%"
                      suffix="%"
                      name="otherFees"
                      value={state.otherFees}
                      min={0}
                      max={99}
                      onBlur={(v) => handleBlur('otherFees', v)}
                      onChange={(e) => handleOnChange('otherFees', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl
                    label={lang[language]['Difficulty Increment']}
                    info={lang[language]['Monthly change in difficulty over the given Time Period. Note there are approximately 2 difficulty adjustments per month, so this increment should be roughly double your expected average difficulty adjustment']}
                    display="block" labelMargin="0 0 8px"
                  >
                    <MIBlurInput
                      width="100%"
                      suffix="%/month"
                      name="diffIncrement"
                      value={state.diffIncrement}
                      min={-20}
                      max={20}
                      onBlur={(v) => handleBlur('diffIncrement', v)}
                      onChange={(e) => handleOnChange('diffIncrement', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                  <MIFormControl
                    label={lang[language]['Price Increment']}
                    info={lang[language]['Monthly increase or decrease in BTC price over the given Time Period']}
                    display="block" labelMargin="0 0 8px"
                  >
                    <MIBlurInput
                      width="100%"
                      suffix="%/month"
                      name="priceIncrement"
                      value={state.priceIncrement}
                      min={-20}
                      max={20}
                      onBlur={(v) => handleBlur('priceIncrement', v)}
                      onChange={(e) => handleOnChange('priceIncrement', e.target.value)}
                      inputOnChange={handleOnChange}
                    />
                  </MIFormControl>
                </Grid>
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                  <Grid container>
                    <Grid xs={6} sm={3} className={classNames(classes.advancedOption, classes.title, 'mt-4')} onClick={handleClickSwitch}>
                      {lang[language]['Advanced Options']}
                      {state.isAdvancedOptionsVisible ? (
                        <KeyboardArrowDownIcon className={classes.advOptionIcon}/>
                      ) : (
                        <KeyboardArrowRightIcon className={classes.advOptionIcon}/>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                {
                  state.isAdvancedOptionsVisible && (
                    <React.Fragment>
                      {
                        isProfitabilityCalculator(state.pathname) && (
                          <React.Fragment>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['CAPEX']}
                                info={lang[language]['Initial capital expenditure (e.g. purchasing hardware, setting up more capacity, labor and materials for installation, etc.)']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="USD"
                                  name="capex"
                                  value={state.capex}
                                  min={0}
                                  max={1000000000}
                                  onBlur={(v) => handleBlur('capex', v)}
                                  onChange={(e) => handleOnChange('capex', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Monthly OPEX']}
                                info={lang[language]['Fixed monthly expenses (e.g. labor, security, insurance, taxes, etc.)']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="USD"
                                  name="monthlyOpex"
                                  value={state.monthlyOpex}
                                  min={0}
                                  max={1000000000}
                                  onBlur={(v) => handleBlur('monthlyOpex', v)}
                                  onChange={(e) => handleOnChange('monthlyOpex', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Initial Hardware Value']}
                                info={lang[language]['Total starting value of your ASIC hardware inventory']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="USD"
                                  name="initialHardware"
                                  value={state.initialHardware}
                                  min={0}
                                  max={1000000000}
                                  onBlur={(v) => handleBlur('initialHardware', v)}
                                  onChange={(e) => handleOnChange('initialHardware', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Hardware Appreciation / Depreciation']}
                                info={lang[language]['Monthly % change in the value of your ASIC hardware inventory']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="%/month"
                                  name="hardwareChange"
                                  value={state.hardwareChange}
                                  min={-20}
                                  max={20}
                                  onBlur={(v) => handleBlur('hardwareChange', v)}
                                  onChange={(e) => handleOnChange('hardwareChange', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Initial Infra Value']}
                                info={lang[language]['Total starting value of your infrastructure (e.g. land, data center infrastructure, containers, immersion cooling systems, etc.)']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="USD"
                                  name="initialInfra"
                                  value={state.initialInfra}
                                  min={0}
                                  max={1000000000}
                                  onBlur={(v) => handleBlur('initialInfra', v)}
                                  onChange={(e) => handleOnChange('initialInfra', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Infra Appreciation / Depreciation']}
                                info={lang[language]['Monthly % change in the value of your infrastructure']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="%/month"
                                  name="infraChange"
                                  value={state.infraChange}
                                  min={-20}
                                  max={20}
                                  onBlur={(v) => handleBlur('infraChange', v)}
                                  onChange={(e) => handleOnChange('infraChange', e.target.value)}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['HODL Ratio']}
                                info={lang[language]['The % of your monthly profit that you hold as BTC instead of cashing out entirely to fiat']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="%/month"
                                  name="hodlRatio"
                                  value={state.hodlRatio}
                                  min={0}
                                  max={100}
                                  onBlur={(v) => handleBlur('hodlRatio', v)}
                                  onChange={(e) => handleOnChange('hodlRatio', e.target.value)}
                                // inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Discount Rate']}
                                info={lang[language]['The interest rate used in discounted cash flow (DCF) analysis to determine the present value of future cash flows.']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="%/month"
                                  name="discountRate"
                                  value={state.discountRate}
                                  min={0}
                                  max={100}
                                  onBlur={(v) => handleBlur('discountRate', v)}
                                  onChange={(e) => handleOnChange('discountRate', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                          </React.Fragment>
                        )
                      }
                      {
                        isCostToMine(state.pathname) && (
                          <React.Fragment>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Difficulty Increment']}
                                info={lang[language]['Adjust the current difficulty by any percentage']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="%"
                                  name="diffIncrement"
                                  value={state.diffIncrement}
                                  min={-20}
                                  max={100}
                                  onBlur={(v) => handleBlur('diffIncrement', v)}
                                  onChange={(e) => handleOnChange('diffIncrement', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Other Fees']}
                                info={lang[language]['Additional operational expenses such as dev fees for firmware, management and hosting fees, etc.']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="%"
                                  name="otherFees"
                                  value={state.otherFees}
                                  min={0}
                                  max={99}
                                  onBlur={(v) => handleBlur('otherFees', v)}
                                  onChange={(e) => handleOnChange('otherFees', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.gridItem}>
                              <MIFormControl
                                label={lang[language]['Avg. Transaction Fees']}
                                info={lang[language]['Average value of transaction fees per block mined']}
                                display="block" labelMargin="0 0 8px"
                              >
                                <MIBlurInput
                                  width="100%"
                                  suffix="BTC"
                                  name="avgTxFeesBlock"
                                  value={state.avgTxFeesBlock}
                                  min={0}
                                  max={15}
                                  onBlur={(v) => handleBlur('avgTxFeesBlock', v)}
                                  onChange={(e) => handleOnChange('avgTxFeesBlock', e.target.value)}
                                  inputOnChange={handleOnChange}
                                />
                              </MIFormControl>
                            </Grid>
                          </React.Fragment>
                        )
                      }
                    </React.Fragment>
                  )
                }
              </Grid>
              {
                state.pathname === '/cost-to-mine' && (
                  <Box className={classes.content + ' p-3 bottom_block'}>
                    <div className="row">
                      <img src={BraiinsOSLogo} />
                      {/* <img src={LogoWhite} width="95" alt="" className={classes.image_93 + ' ml-3 mt-2'} />
                      <img src={vector} width="45" alt="" className={classes.image_93 + ' ml-3 mt-2'} /> */}
                    </div>
                    <div className="row mt-4">
                      <div className={classes.bottomTextResponsive + ' col-xs-12'}>Get up to 20% better efficiency with Braiins OS+ </div>
                    </div>
                    <div className="row mt-4">
                      <div className={classes.bottomTextResponsive + ' col-xs-10'}>
                        Show results for Braiins OS+
                    </div>
                      <div className="col-xs-2">
                        {state.isBraiinsOptionsVisible ?
                          <KeyboardArrowDownIcon
                            className={classes.advOptionIcon}
                            onClick={handleBraiinsSwitch}
                          />
                          : <KeyboardArrowRightIcon
                            className={classes.advOptionIcon}
                            onClick={handleBraiinsSwitch}
                          />
                        }
                      </div>
                    </div>
                  </Box>
                )
              }
            </div>
          )
        }
      </Box>

    </Box>
  );
}

const mapStateToProps = store => ({
  profitabilityData: store.rootReducer.profitabilityCalculator.profitabilityData,
  costToMineData: store.rootReducer.costToMine.costToMineData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProfitability,
  getCostToMine,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
