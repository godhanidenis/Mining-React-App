import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: props => props.width || '100%',
  },
  input: {
    color: props => props.color || '#e0e0e0',
    backgroundColor: props => props.backgroundColor || '#393939',
    border: 'none',
    fontSize: props => props.fontSize || 14,
    height: props => props.height || 32,
    margin: props => props.margin,
    outline: 'none',
    padding: props => props.padding || '7px 8px',
    width: props => props.width || '100%',
    '&:focus': {
      border: '2px solid #ffffff',
      transition: 'all 250ms ease',
    },
  },
  suffix: {
    backgroundColor: 'rgb(57, 57, 57)',
    color: '#8d8d8d',
    fontSize: 14,
    padding: '0 7px',
    position: 'absolute',
    right: 5,
  },
}));

const MIInput = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    value: ''
  })

  // useEffect(() => {
  //   if (props.min !== undefined && props.max !== undefined) {
  //     if (props.value >= props.min && props.value <= props.max) {
  //       setState((prevState) => ({
  //         ...prevState,
  //         value: props.value,
  //       }));
  //       props.inputOnChange(props.name, props.value);
  //     } else {
  //       props.inputOnChange(props.name, state.value);
  //     }
  //   } else {
  //     setState((prevState) => ({
  //       ...prevState,
  //       value: props.value,
  //     }));
  //   }
  // }, [props.value, props.min, props.max]);

  return (
    <div className={classes.root}>
      <input
        className={classes.input +" hardware_name"}
        value={props.value}
        // onKeyDown={props.onKeyDown}
        onBlur={props.onBlur}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
      />
      <span className={classes.suffix}>{props.suffix}</span>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MIInput);
