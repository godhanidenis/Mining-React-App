import React from 'react';
import { connect } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { homeSectionHead, homeSectionTitle } from '../../../styles';

const useStyles = makeStyles(theme => ({
  chart: {
    backgroundColor: '#161616',
    width: '100%',
  },
  legendItem: {
    alignItems: 'center',
    borderBottom: '1px solid #262626',
    display: 'flex',
    marginBottom: 2,
  },
  legendLabel: {
    color: '#fff',
    fontSize: 14,
  },
  legendSymbol: {
    borderRadius: 4,
    height: 8,
    marginRight: 20,
    width: 8,
  },
  legendValue: {
    color: '#fff',
    fontSize: 14,
  },
  sectionHead: homeSectionHead,
  sectionTitle: homeSectionTitle,
}));

const data = [
  {
    "id": "hashRateCurrent",
    "label": "Hash Rate (current)",
    "value": 121.72,
    "color": "#F95355",
    "suffix": "EH/s",
  },
  {
    "id": "hashRate30Days",
    "label": "Hash rate (30 days)",
    "value": 114.49,
    "color": "#A72DEA",
    "suffix": "EH/s",
  },
  {
    "id": "hashValue",
    "label": "Hash value ($/TH/day)",
    "value": 0.074,
    "color": "#6B50FF",
    "prefix": "$",
  },
  {
    "id": "hashPrice",
    "label": "Hash price ($/TH/day)",
    "value": 0.078,
    "color": "#4559FF",
    "prefix": "$",
  },
  {
    "id": "avgFeesPerBlock",
    "label": "Average fees per block (144 blocks)",
    "value": 0.44,
    "color": "#56D8E0",
    "suffix": "BTC",
  },
  {
    "id": "feesPercentOfBlockReward",
    "label": "Fees % of block reward",
    "value": 6.66,
    "color": "#F4C01A",
    "suffix": "%",
  },
  {
    "id": "totalMiningRevenue",
    "label": "Total mining revenue (1 day)",
    "value": 8.25,
    "color": "#EB6307",
    "suffix": "M",
    "prefix": "$",
  },
  {
    "id": "hashRate30Days",
    "label": "Hash rate (30 days)",
    "value": 114.49,
    "color": "#D9222C",
    "suffix": "EH/s",
  },
  {
    "id": "hashValue",
    "label": "Hash value ($/TH/day)",
    "value": 0.074,
    "color": "#13A454",
    "prefix": "$",
  },
  {
    "id": "hashPrice",
    "label": "Hash price ($/TH/day)",
    "value": 0.078,
    "color": "#A01743",
    "prefix": "$",
  },
  {
    "id": "avgFeesPerBlock",
    "label": "Average fees per block (144 blocks)",
    "value": 0.44,
    "color": "#7E1CB2",
    "suffix": "BTC",
  },
  {
    "id": "feesPercentOfBlockReward",
    "label": "Fees % of block reward",
    "value": 6.60,
    "color": "#5ADF88",
    "suffix": "%",
  },
  {
    "id": "totalMiningRevenue",
    "label": "Total mining revenue (1 day)",
    "value": 8.25,
    "color": "#7CA8FF",
    "suffix": "M",
    "prefix": "$",
  }
];

const HashRateDistribution = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.section}>
      <div className={classes.sectionHead}>
        <div className={classes.sectionTitle}>Hash Rate Distribution</div>
      </div>
      <div className={classes.chart}>
        <Grid container>
          <Grid item xs={6}>
            <Box margin="16px">
              {
                data.map((item) => (
                  <Box className={classes.legendItem}>
                    <div className={classes.legendSymbol} style={{ backgroundColor: item.color }}/>
                    <Box display="flex" justifyContent="space-between" width="100%">
                      <div className={classes.legendLabel}>{item.label}</div>
                      <Box display="flex">
                        <div className={classes.legendValue}>{item.prefix}</div>
                        <div className={classes.legendValue}> {item.value} </div>
                        <div className={classes.legendValue}>{item.suffix}</div>
                      </Box>
                    </Box>
                  </Box>
                ))
              }
            </Box>
          </Grid> 
          <Grid item xs={6}>
            <ResponsivePie
              data={data}
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              colors={{ scheme: 'nivo' }}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0]] }}
              enableRadialLabels={false}
              enableSlicesLabels={false}
              animate={true}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HashRateDistribution);
