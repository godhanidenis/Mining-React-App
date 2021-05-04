import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';

import InfoIcon from '../../assets/img/info-circle.png';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    alignItems: 'center',
    display: props => props.display || 'flex',
    justifyContent: 'space-between',
    margin: props => props.margin || '0 0 8px 0',
  },
  infoIcon: {
    marginRight: 10,
  },
  inner: {
    height: 32,
    flex: 1,
  },
  inputError: {
    color: 'red',
    fontSize: '10px',
    display: 'none',
  },
  label: {
    color: '#c6c6c6',
    fontSize: 12,
    lineHeight: 'initial',
  },
  labelContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: props => props.justifyContent || 'space-between',
    margin: props => props.labelMargin || '0',
    height: 32,
    width: props => props.width || 180,
    position: props => props.position || 'absolute',
    top: 0,
    lineHeight: '32px',
  },
}));

const MIFormControl = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <span className={classes.labelContainer}>
          <span className={classes.label}>{props.label}</span>
          {
            props.info && (
              <Tooltip title={props.info}>
                <img className={classes.infoIcon} src={InfoIcon}/>
              </Tooltip>
            )
          }
        </span>
      </div>
      {props.children}
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MIFormControl);
