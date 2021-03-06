import React from 'react';
import { connect } from 'react-redux';

import Routes from './Routes';

import './App.css';

function App(props) {
  const { location } = props;

  return (
    <Routes location={location}/>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
