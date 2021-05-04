import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './layouts/Main';

import HomeContainer from './containers/Home';
import CostToMineContainer from './containers/CostToMine';
import ProfitabilityCalculatorContainer from './containers/ProfitabilityCalculator';

import EmbedCostToMine from './containers/Embed/CostToMine';
import EmbedProfitabilityCalculator from './containers/Embed/ProfitabilityCalculator';

import CostToMineBlog from './containers/UserGuideBlogs/CostToMineBlog';
import ProfitabilityCalculatorBlog from './containers/UserGuideBlogs/ProfitibilityCalculatorBlog';

import history from './history';


const Routes = (props) => {
  const { location } = props;
  return (
    <Router history={history}>
      <Switch>
        <MainLayout>
          <Route
            path="/"
            exact
            component={HomeContainer}
          />
          <Route
            path="/cost-to-mine"
            exact
            component={() => <CostToMineContainer/>}
          />
          <Route
            path="/profitability-calculator"
            exact
            component={() => <ProfitabilityCalculatorContainer/>}
          />

          <Route
            path="/embed/cost-to-mine"
            component={() => <EmbedCostToMine/>}
          />
          <Route
            path="/embed/profitability-calculator"
            component={() => <EmbedProfitabilityCalculator/>}
          />

          <Route
            path="/embed/:locale(es|zh|ru|fa)/cost-to-mine"
            component={() => <EmbedCostToMine/>}
          />
          <Route
            path="/embed/:locale(es|zh|ru|fa)/profitability-calculator"
            component={() => <EmbedProfitabilityCalculator/>}
          />
          <Route
            path="/profitability-calculator-user-guide"
            exact
            component={() => <ProfitabilityCalculatorBlog />}
          />
          <Route
            path="/cost-to-mine-bitcoin-user-guide"
            exact
            component={() => <CostToMineBlog />}
          />
        </MainLayout>
      </Switch>
    </Router>
  );
};

export default Routes;