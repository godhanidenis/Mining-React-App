import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Bar } from 'react-chartjs-2';
import Lottie from 'react-lottie';

let animationData = require('../../../loader.json');

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#161616',
    padding: '10px 16px',
  },
  chartWrap: {
    padding: '16px',
    backgroundColor: '#161616',
    position: 'relative',
  },
  loader: {
    left: '38%',
    position: 'absolute',
    top: '28%',
  },
  overlay: {
    backgroundColor: '#161616',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '1.3em',
  }
}));

const Chart = (props) => {
  const classes = useStyles(props);
  const matches = useMediaQuery('(max-width:767px)');

  const [state, setState] = useState({
    pointRadius: 0,
  });
  const { pointRadius} = state;
  let yAxesticks = []
  const data = {
      datasets: [
        {
          label: 'Cash Flow',
          data: props.profitabilityData.cashFlow,
          type: 'line',
          fill: false,
          yAxisID: 'secondary',
          borderWidth: matches? 1: 3,
          pointRadius: pointRadius,
          borderColor: 'rgb(251, 130, 168)',
          pointBackgroundColor: 'rgb(251, 130, 168)',
          pointBorderColor: 'rgb(251, 130, 168)',
          // backgroundColor: 'rgba(19, 164, 84,0.0)',
        },
        {
          label: 'Hardware Value',
          data: props.profitabilityData.hardware,
          type: 'line',
          fill: false,
          yAxisID: 'secondary',
          borderWidth: matches? 1: 3,
          pointRadius: pointRadius,
          borderColor: 'rgb(244, 192, 26)',
          pointBackgroundColor: 'rgb(244, 192, 26)',
          pointBorderColor: 'rgb(244, 192, 26)',
          // backgroundColor: 'rgba(255, 165, 0, 0.0)',
        },
        {
          label: 'Net Profit/Loss (Cumulative)',
          data: props.profitabilityData.cumulativeProfit,
          type: 'line',
          yAxisID: 'secondary',
          borderWidth: matches? 1: 3,
          pointRadius: pointRadius,
          borderColor: 'rgb(211, 38, 93)',
          backgroundColor: 'rgb(118, 72, 103)',
          pointBackgroundColor: 'rgb(211, 38, 93)',
          pointBorderColor: 'rgb(211, 38, 93)',
        },
        {
          label: 'Revenue per month',
          data: props.profitabilityData.revenue,
          yAxisID: 'primary',
          borderWidth: matches? 1: 3,
          borderColor: 'rgb(107, 80, 255)',
          backgroundColor: 'rgb(107, 80, 255)',
        },
        {
          label: 'Net profit per month',
          data: props.profitabilityData.profit,
          borderWidth: matches? 1: 3,
          borderColor: 'rgb(86, 216, 224)',
          backgroundColor: 'rgb(86, 216, 224)'
        },
      ]
    };

    const options = {
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }
      },
      legend: {
        display: matches? false: true,
        labels: {
          usePointStyle: true,
          fontColor: 'white',
          position: 'left',
          fontSize: 11
        },
      },
      responsive: true,
      title: {
        fontColor: 'white',
      },
      tooltips: {
        mode: 'index'
      },
      /*hover: {
        intersect: false
      },
      elements: {
        line: {
          fill: false
        }
      },*/

      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true,
            },
            labels: props.profitabilityData.month,
            scaleLabel: {
              display: true,
              labelString: 'Time Period',
              fontSize: matches? 8: 14,
              fontColor: 'white',
              // fontFamily: 'sans-serif',
            },
          }
        ],
        yAxes: [
          {
            id: 'primary',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Monthly Revenue',
              fontSize: matches? 8: 14,
              fontColor: 'white'
              // fontFamily: 'sans-serif',
            },
            ticks: {
              display: true,
              callback: function (value, index, values) {
                return value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                });
              },
              beginAtZero: true,
              fontColor: 'white',
              fontSize: matches? 8: 14,
              reverse: false,
              stepSize: 250,
              autoSkip: true,
              // min: 0,
              maxTicksLimit: matches? 2: 7,
            }
          },
          {
            id: 'secondary',
            type: 'linear',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Cumulative Profit and Cash Flow',
              fontSize: matches? 8: 14,
              fontColor: 'white',
              // fontFamily: 'Braiins Sans',
            },
            ticks: {
              display: true,
              callback: function (value, index, values) {
                return value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                });
              },
              fontColor: 'white',
              fontSize: matches? 8: 14,
              beginAtZero: true,
              reverse: false,
              autoSkip: true,
              maxTicksLimit: matches? 2: 7,
            }
          }
        ]
      }
    };

    const plugins = [{
      beforeInit: function(chart, options) {
        chart.legend.afterFit = function() {
          this.height = this.height + 22;
        };
      },
      afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        // ctx.fillText('This text drawn by a plugin', 100, 100);
      }
    }];

    const chartMouseHandler = (isHover) => {
      let pointRadius = 0;
      if (data && data.datasets && data.datasets.length > 0) {
        if (isHover) {
          pointRadius = 3;
        }
  
        //setState
        setState((prevState) => ({
          ...prevState,
          pointRadius
        }))
      } //end if
  
    }

    const loaderOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div className={classes.chartWrap} onMouseOver={(e) => chartMouseHandler(true)} onMouseLeave={(e) => chartMouseHandler(false)}>
        { props.isFetching && (
          <div>
            <div className={classes.overlay}></div>
            <div className={classes.loader}>
              <Lottie 
                options={loaderOptions}
                height={ matches? 80: 200 }
                width={ matches? 80: 200 }/>
            </div>
          </div>
          )
        }
        <h4 className={classes.title}>Revenue and Profit Calculator</h4>
        <Bar
          data={data}
          options={options}
          plugins={plugins}
        />
      </div>
    );
}

const mapStateToProps = store => ({
  profitabilityData: store.rootReducer.profitabilityCalculator.profitabilityData,
  isFetching: store.rootReducer.profitabilityCalculator.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chart);