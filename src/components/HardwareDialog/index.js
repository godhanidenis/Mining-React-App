import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import MIFormControl from '../MIFormControl';
import MIInput from '../MIInput';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

import { isEmbedCostToMine } from '../../constants';
import lang from '../../lang';

let hardwareData = require('../../hardware.json');

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'block',
    position: 'relative',
  },
  btnCancel: {
    background: '#525252 !important',
    borderRadius: '0',
    color: '#B8B8B8',
    fontSize: '16px',
    padding: '12px 15px 24px',
    textTransform: 'capitalize',
    width: '50%',
  },
  btnConfirm: {
    background: '#6B50FF !important',
    borderRadius: '0',
    color: '#B8B8B8',
    fontSize: '16px',
    marginLeft: '0 !important',
    padding: '12px 15px 24px',
    textTransform: 'capitalize',
    width: '50%',
  },
  btnLabel: {
    display: 'block',
    textAlign: 'left',
  },
  btnOpenPopup: {
    padding: '0',
    display: 'flex',
  },
  btnOpenPopupMobile: {
    width: '100%',
  },
  closeButton: {
    color: theme.palette.grey[500],
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  dialogActions: {
    marginTop: '20px',
    padding: '0',
  },
  dialogContent: {
    overflow: 'unset',
    width: '400px',
  },
  formControl: {
    width: '100%',
  },
  icon: {
    color: "#B9B9B9"
  },
  label: {
    color: '#B8B8B8'
  },
  option: {
    backgroundColor: '#393939 !important',
    color: '#B9B9B9',
  },
  selectBox: {
    backgroundColor: '#393939',
    boxSizing: 'border-box',
    color: '#B9B9B9',
    height: '45px',
    padding: '12px 24px 12px 12px',
    width: '100%'
  },
  selectModel: {
    marginTop: '20px'
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '400'
  },
}));

const HardwareDialog = (props) => {
  const classes = useStyles(props);
 
  // Get Hardware name while requesting using query string
  let hardwareName = ''
  let modelName = ''
  if (props && props.data && props.data.hardwareName){
    hardwareName = props.data.hardwareName.split('/')[0].trim()
    modelName    = props.data.hardwareName.split('/')[1].trim()
  }

  const [state, setState] = useState({
    pathname: window.location.pathname,
    initial: true,
    open: false,
    modelOption: [],
    hardwareName: hardwareName ? hardwareName : Object.keys(hardwareData)[1],
    modelName:    modelName    ? modelName : Object.keys(hardwareData[Object.keys(hardwareData)[1]])[0],
    btnLabel: hardwareName && modelName ? hardwareName + ' / ' +  modelName : Object.keys(hardwareData)[1] + ' / ' + Object.keys(hardwareData[Object.keys(hardwareData)[1]])[0]
  });

  const location = useLocation();
  
  let language = location.pathname.split('/')[2]
  if (language === 'cost-to-mine' || location.pathname === '/cost-to-mine'){
    language = 'en'
  }

  const handleClickOpen = () => {
    setState((prevState) => ({
      ...prevState,
      open: true,
    }))
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      open: false,
    }))
  };

  //make array of hardwares
  let hardwareOption = [];
  for (let hardware in hardwareData) {
    hardwareOption.push(hardware);
  }

  const getHardwareModel = (hardware) => {
    
    let models = []
    for (let model in hardwareData[hardware]) {
      models.push(model);
    }

    setState((prevState) => ({
      ...prevState,
      modelOption: models,
      modelName: models.includes(state.modelName) ?  state.modelName : models[0]
    }))
  }

  const handleChangeHardware = (name) => {

    setState((prevState) => ({
      ...prevState,
      hardwareName: name
    }))
  };
  const handleChangeModel = (name) => {
 
    setState((prevState) => ({
      ...prevState,
      modelName: name
    }))
  };

  const handleConfirm = () => {
  
    let support = hardwareData[state.hardwareName][state.modelName]["support"]
    if(state.hardwareName.includes("Braiins OS+") && !isEmbedCostToMine(location.pathname)) {
      document.getElementsByClassName("main_title")[0].innerText="STATS WITH BRAIINS OS+"
      document.getElementsByClassName("bottom_block")[0].style.display="none"
    }
    if(state.hardwareName.includes("Braiins OS+ Autotuning") && state.modelName.includes("High Efficiency")){
      document.getElementsByClassName("sub_title")[0].innerText="Compare with Braiins OS+ Overclocking"
      document.getElementsByClassName("main_title")[0].innerText="STATS WITH BRAIINS OS+"
      document.getElementsByClassName("bottom_block")[0].style.display="none"
    }
    else if(state.hardwareName.includes("Braiins OS+ Autotuning") && state.modelName.includes("Overclocking")){
      document.getElementsByClassName("sub_title")[0].innerText="Compare with Braiins OS+ High Efficiency"
      document.getElementsByClassName("main_title")[0].innerText="STATS WITH BRAIINS OS+"
      document.getElementsByClassName("bottom_block")[0].style.display="none"
    }
    else{
      document.getElementsByClassName("bottom_block")[0].style.display="none"
      document.getElementsByClassName("sub_title")[0].innerText=""
      document.getElementsByClassName("main_title")[0].innerText="STATS"
    }
    if(state.hardwareName.includes("Bitmain") && support === "1"){
      document.getElementsByClassName("bottom_block")[0].style.display="block"
    }
    setState((prevState) => ({
      ...prevState,
      open: false,
      btnLabel: state.hardwareName + ' / ' + state.modelName
    }))
    props.onChange('hashrate', hardwareData[state.hardwareName][state.modelName]['hashrate']);
    props.onChange('consumption', hardwareData[state.hardwareName][state.modelName]['consumption']);
    props.setHardwareName(state.hardwareName + ' / ' + state.modelName);
    document.getElementsByClassName("hardware_name")[0].value=state.hardwareName + " / " + state.modelName
  };

  useEffect(() => {
    getHardwareModel(state.hardwareName);
    
    if(state.initial){
      if(state.hardwareName.includes("Braiins OS+")){
        props.onChange('hashrate', props.data.hashrate || hardwareData[state.hardwareName][state.modelName]['hashrate']);
        props.onChange('consumption', props.data.consumption || hardwareData[state.hardwareName][state.modelName]['consumption']);
      }
      if(state.hardwareName.includes("Braiins OS+") && !isEmbedCostToMine(location.pathname)){
        document.getElementsByClassName("main_title")[0].innerText="STATS WITH BRAIINS OS+"
        document.getElementsByClassName("bottom_block")[0].style.display="none"
      }
    }
    setState((prevState) =>({
      ...prevState,
      initial: false
    }))
  }, [state.hardwareName]);

  return (
    <div>
      <Box display={{ xs: 'none', md: ( isEmbedCostToMine(location.pathname) || location.pathname === '/embed/profitability-calculator' )? 'none' : 'block' }}>
        <MIFormControl label={lang[language]['Select hardware']}>
          <Button className={classes.btnOpenPopup} onClick={handleClickOpen}>
            <MIInput
              width={128}
              value={state.btnLabel}
              disabled={true}
            />
          </Button>
        </MIFormControl>
      </Box>

      <Box display={{ xs: 'block', md: ( isEmbedCostToMine(location.pathname) || location.pathname === '/embed/profitability-calculator' )? 'block' : 'none' }}>
        <MIFormControl label={lang[language]['Select hardware']} display="block" labelMargin="0 0 8px">
          <Button className={`${classes.btnOpenPopup} ${classes.btnOpenPopupMobile}`} onClick={handleClickOpen}>
            <MIInput
              width="100%"
              value={state.btnLabel}
              disabled={true}
            />
          </Button>
        </MIFormControl>
      </Box>

      <Dialog 
        open={state.open}
        onClose= {handleClose}
        PaperProps= {{
          style: {
            backgroundColor: '#282828'
          },
        }}
      >

        <DialogTitle className={classes.title} id="form-dialog-title">
          {lang[language]['Select hardware']}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className={classes.dialogContent}>
          <form>
            <FormControl variant="filled" className={classes.formControl}>
              <label className={classes.label} >
                {lang[language]['Select manufacturer']}
              </label>
              <Select
                classes={{
                  icon: classes.icon,
                  select: classes.selectBox
                }}
                native
                value={state.hardwareName}
                onChange={(e) => handleChangeHardware(e.target.value)}
                inputProps={{
                  id: 'select-manufacturer',
                }}
              >
                { 
                  hardwareOption.map(name => (
                    <option className={classes.option} value={name}>{name}</option>
                  ))
                }
              </Select>
            </FormControl>

            <FormControl variant="filled" className={[classes.formControl, classes.selectModel]}>
              <label className={classes.label} >
                {lang[language]['Select hardware model']}
              </label>
              <Select
                classes={{
                  icon: classes.icon,
                  select: classes.selectBox
                }}
                native
                value={state.modelName}
                onChange={(e) => handleChangeModel(e.target.value)}
                inputProps={{
                  id: 'select-model',
                }}
              >
                { 
                  state.modelOption.map(name => (
                    <option className={classes.option} value={name}>{name}</option>
                  ))
                }
              </Select>
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button 
            className={classes.btnCancel}
            classes={{
              label: classes.btnLabel
            }}
            onClick={handleClose} 
            color="primary"
          >
            {lang[language]['Cancel']}
          </Button>

          <Button 
            className={classes.btnConfirm}
            classes={{
              label: classes.btnLabel
            }}
            onClick={handleConfirm} 
            color="primary"
          >
            {lang[language]['Confirm']}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HardwareDialog);
