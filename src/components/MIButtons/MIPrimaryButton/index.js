import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: '#6B50FF',
    border: 'none',
    color: '#fff',
    width: props => props.width,
    height: props => props.height,
    paddingLeft: props => props.paddingLeft || '18px',
    paddingRight: props => props.paddingRight || '18px',
    margin: props => props.margin || 0,
  }
}));

const MIPrimaryButton = (props) => {
  const classes = useStyles(props);

  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MIPrimaryButton);
