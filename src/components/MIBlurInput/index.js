import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  errorContainer: {
    height: props => props.errorTooltip || 20,
    marginTop: 5,
  },
  inner: {
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
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
  inputError: {
    color: 'red',
    fontSize: '10px',
    left: 0,
    position: 'absolute',
    whiteSpace: 'nowrap'
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

const MIBlurInput = (props) => {
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

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      value: props.value,
    }));
  }, [props.value]);

  const handleBlur = () => {
    if (state.value >= props.min && state.value <= props.max && state.value !== props.value) {
      props.onBlur(state.value);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setState((prevState) => ({
      ...prevState,
      value,
    }));
  }

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <input
          className={classes.input}
          value={state.value}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={props.disabled}
          placeholder={props.placeholder}
          name={props.name}
        />
        <span className={classes.suffix}>{props.suffix}</span>
      </div>
      {
        props.min !== null && props.max !== null && state.value !== null && (parseFloat(state.value) > props.max || parseFloat(state.value) < props.min) ? (
          <div className={classes.errorContainer}>
            <p className={classes.inputError}>{`Value is outside the accepted range. \nInput a value in the range ${props.min} - ${props.max}`}</p>
          </div>
        ) : null
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MIBlurInput);
