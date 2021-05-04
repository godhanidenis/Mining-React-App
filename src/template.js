import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({

}));

const Template = (props) => {
  const classes = useStyles(props);

  return (
    <div/>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);
