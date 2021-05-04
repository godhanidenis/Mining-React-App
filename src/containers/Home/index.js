import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from "react-helmet";

import OverallStats from './OverallStats';
import CostToMine from './CostToMine';

import HashRateDistribution from './HashRateDistribution';
import OtherMiningTools from './OtherMiningTools';
import MoreComingSoon from './MoreComingSoon';
import Grid from '@material-ui/core/Grid';
import BlogArticles from './BlogArticles'

import { pageTitle } from '../../styles';

const useStyles = makeStyles({
  pageTitle: pageTitle,
});


const Home = (props) => {
  const classes = useStyles();
  
  return (
    <div>
      <Helmet>
        <meta name="description" content="Bitcoin Mining Insights is a collection of tools and stats built to help Bitcoin miners."/>
        <meta property="og:site_name" content="Braiins | Mining Insights"/>
        <meta property="og:url" content="https://insights.braiins.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Braiins | Mining Insights"/>
        <meta property="og:description" content="Bitcoin Mining Insights is a collection of tools and stats built by Braiins to help Bitcoin miners."/>
        <meta property="og:image" content={window.location.origin + '/bitcoin_mining_insights.png'}/>
        <title>Mining Insights | Braiins.com</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <div className={classes.pageTitle}>
            Mining Insights
          </div>
        </Grid>
      <Grid item xs={12} lg={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}  >
              <OverallStats/>
            </Grid>
            <Grid item xs={12}  >
              <CostToMine/>
            </Grid>
            <Grid item xs={12}  >
              <MoreComingSoon/>
            </Grid>             
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4} >
        <Grid container spacing={1}>
          <Grid item xs={12}  >
            <OtherMiningTools/>
          </Grid>
          <Grid item xs={12} >
            <BlogArticles />
          </Grid>
        </Grid>
      </Grid>
  
      {/* <HashRateDistribution/> */}

      </Grid>
    </div>
  );
}

const mapStateToProps = store => ({
  costToMineData:        store.rootReducer.costToMine.costToMineData,
});

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
