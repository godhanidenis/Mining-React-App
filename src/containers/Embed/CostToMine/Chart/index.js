import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Scatter } from 'react-chartjs-2';
// import 'chartjs-plugin-annotation';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import Lottie from 'react-lottie';

import lang from '../../../../lang';

let animationData = require('../../../../loader.json');
let hardwareData = require('../../../../hardware.json');

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#161616',
    padding: '10px 16px',
    position: 'relative'
  },
  legend: {
    display: 'flex',
    marginBottom: 10,
    marginTop: 8,
  },
  legendItem: {
    alignItems: 'center',
    display: 'flex',
    marginRight: 36,
  },
  legendLabel: {
    color: '#C6C6C6',
  },
  legendSymbol: {
    borderRadius: 5,
    height: 10,
    marginRight: 6,
    width: 10,
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
    fontSize: 24,
    fontWeight: 600,
  }
}));

const Chart = (props) => {
  const classes = useStyles(props);
  const matches = useMediaQuery('(max-width:767px)');

  let language = window.location.pathname.split('/')[2]
  if (language === 'cost-to-mine') {
    language = 'en'
  }

  const [state, setState] = useState({
    data: {
      breakEven: '',
      cost: 0,
      costLine: [],
      electricityList: [],
      profitArea: [],
    },
    chartUpdate: false,
    chartData: {},
    chartOptions: {},
    chartPlugins: [ChartAnnotation, {
      beforeRender: function (x) {
        const c = x.chart;
        if (x.data.datasets.length > 0) {
          const dataset = x.data.datasets[0];
          const yScale = x.scales['primary'];
          let yPos = yScale.getPixelForValue(0);

          const gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
          gradientFill.addColorStop(0, 'green');
          gradientFill.addColorStop(yPos / c.height - 0.00000001, 'green');
          gradientFill.addColorStop(yPos / c.height + 0.00000001, 'red');
          gradientFill.addColorStop(1, 'red');

          const model =
            x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset
              ._model;
          model.backgroundColor = gradientFill;

          if (x.chart.config.options.scales.yAxes[1].ticks.min !== x.chart.chart.scales.primary.min) {
            x.chart.config.options.scales.yAxes[1].ticks.min =
              x.chart.chart.scales.primary.min;
            x.chart.config.options.scales.yAxes[1].ticks.max =
              x.chart.chart.scales.primary.max;
            
            setState((prevState) => ({
              ...prevState,
              chartUpdate: true,
            }));
          }

        } //end if
      },
    }],
    colors: [],
    pointRadius: 0,
    storage: [],
    hardwareName: Object.keys(hardwareData)[1] + ' / ' + Object.keys(hardwareData[Object.keys(hardwareData)[1]])[0],
    pathname: window.location.pathname,
  });

  const { chartData, colors, pointRadius } = state;
  
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      hardwareName: props.hardwareName || Object.keys(hardwareData)[1] + ' / ' + Object.keys(hardwareData[Object.keys(hardwareData)[1]])[0],
    }))

  }, [props.hardwareName]);

  let xPoints = [];
  let yPoints = [];
  let linePoints = [];
  let lineMin;
  let lineMax;
  let storage = [];
  let costLineStorage = [];

  const setChartOption = (lineMin, lineMax, breakEven, storage) => {
    setState((prevState) => ({
      ...prevState,
      chartOptions: {
        annotation: {
          annotations: [
            {
              drawTime: 'afterDatasetsDraw',
              // id: 'be_line',
              type: 'line',
              mode: 'vertical',
              scaleID: 'x-axis',
              value: breakEven.toFixed(3),
              borderColor: 'grey',
              borderWidth: 1.5,
              label: {
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                content: breakEven.toFixed(3).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }),
                enabled: true,
                xAdjust: -25,
                yAdjust: 0,
                position: 'top',
                fontSize: matches? 8: 14
              },
            },
            {
              drawTime: 'afterDatasetsDraw',
              // id: 'max_line',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'primary',
              value: storage[0],
              borderColor: 'grey',
              borderWidth: 1.5,
              label: {
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                content: lineMax.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }),
                enabled: true,
                // xAdjust: -350,
                yAdjust: matches? 8: -15,
                position: 'right',
                fontSize: matches? 8: 14
              },
            },
          ],
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        legend: {
          // display: !isMobileDevice(),
          display: false,
          labels: {
            usePointStyle: true,
            fontColor: 'white',
            position: 'left',
          },
        },
        responsive: true,
        title: {
          fontColor: 'white',
        },
        tooltips: {
          mode: 'index',
        },

        scales: {
          yAxes: [
            {
              id: 'primary',
              type: 'linear',
              position: 'left',
              // margin: 100,
              scaleLabel: {
                display: !isMobileDevice(),
                labelString: lang[language]['Cost to Mine 1 BTC'],
                fontSize: matches? 8: 14,
                fontColor: 'white',
                // fontFamily: 'sans-serif',
              },
              ticks: {
                display: !isMobileDevice(),
                callback: function (value, index, values) {
                  return value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  });
                },
                beginAtZero: true,
                fontColor: 'white',
                // reverse: false,
                // stepSize: 5000,
                // autoSkip: true,
                // // min: 0,
                maxTicksLimit: 5,
              },
              // gridLines: {
              //   color: '#525252'
              // },
            },
            {
              id: 'secondary',
              type: 'linear',
              position: 'right',
              // scaleStepWidth: 300,
              scaleLabel: {
                display: !isMobileDevice(),
                labelString: lang[language]['Profit/Loss (USD)'],
                fontSize: matches? 8: 14,
                fontColor: 'white',
              },
              ticks: {
                display: !isMobileDevice(),
                callback: function (value, index, values) {
                  return value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  });
                },

                beginAtZero: true,
                fontColor: 'white',
                maxTicksLimit: 5,
              },
              // gridLines: {
              //   color: '#525252'
              // },
            },
          ],
          xAxes: [
            {
              id: 'x-axis',
              scaleLabel: {
                display: !isMobileDevice(),
                labelString: lang[language]['Electricity Price (USD)'],
                fontSize: matches? 8: 14,
                fontColor: 'white',
              },
              ticks: {
                stepSize: 0.01,
                // suggestedMin: 0,
                // suggestedMax: 0.15
              },
              // gridLines: {
              //   color: '#525252'
              // },
            },
          ],
        },
      },
      chartData: {
        datasets: [
          {
            label: lang[language]['Cost to Mine 1 BTC'],
            data: storage,
            yAxisID: 'primary',
            borderWidth: 1,
            type: 'line',
            pointRadius: pointRadius,
            // backgroundColor: [],
            borderColor: colors,
            pointBackgroundColor: colors,
            pointBorderColor: colors,
            fill: 'origin',
          },
          // {
          //   label: 'Cost line',
          //   data: costLineStorage,
          //   yAxisID: 'primary',
          //   borderWidth: 3,
          //   type: 'line',
          //   pointRadius: pointRadius,
          //   // backgroundColor: 'green',
          //   borderColor: '#6B50FF',
          //   pointBackgroundColor: '#6B50FF',
          //   pointBorderColor: '#6B50FF',
          //   fill: 'origin',
          //   order: 0
          // },
        ],
      },
      storage,
    }))
  }

  const setChartData = (data) => {
    if (data && data.profitArea && data.profitArea.length > 0) {
      for (let i = 0; i < data.profitArea.length; i++) {
        xPoints[i] = data.electricityList[i];
        yPoints[i] = data.profitArea[i];
        linePoints[i] = data.costLine[i];
        let x = xPoints[i];
        let y = yPoints[i];
        let line = linePoints[i];
        let coordinates = { x: x, y: y };
        let lineCoordinates = { x: x, y: line };
        lineMin = Math.min.apply(null, yPoints);
        lineMax = Math.max.apply(null, yPoints);
        storage.push(coordinates);
        costLineStorage.push(lineCoordinates);
        
        if (i === data.profitArea.length - 1) {
          setChartOption(lineMin, lineMax, data.breakEven, storage);
        }
      }

      // for (let i = 0; i < data.costLine.length; i++) {
      //   yPoints[i + data.profitArea.length] = data.costLine[i];
      // }

      const chartWrapper = document.getElementsByClassName('chart-wrapper');
      const heightRatio = 0.5;
      chartWrapper.height = chartWrapper.width * heightRatio;

    } //end if

  }

  const chartMouseHandler = (isHover) => {
    let colors = [];
    let pointRadius = 0;
    if (chartData && chartData.datasets && chartData.datasets.length > 0) {
      if (isHover) {
        for (let i = 0; i < chartData.datasets[0].data.length; i++) {
          if (chartData.datasets[0].data[i]['y'] > 0) {
            colors.push('green');
          } else {
            colors.push('red');
          }
          pointRadius = 3;
        }
      }

      //setState
      setState((prevState) => ({
        ...prevState,
        chartData: {
          datasets: [
            {
              label: lang[language]['Cost to Mine 1 BTC'],
              data: state.storage,
              yAxisID: 'primary',
              borderWidth: 1,
              type: 'line',
              pointRadius: pointRadius,
              // backgroundColor: [],
              borderColor: colors,
              pointBackgroundColor: colors,
              pointBorderColor: colors,
              fill: 'origin',
            }
          ],
        },
      }))
    } //end if

  }

  //update chart
  if (state.chartUpdate) {
    setState((prevState) => ({
      ...prevState,
      chartData: {
        datasets: [
          {
            label: lang[language]['Cost to Mine 1 BTC'],
            data: state.storage,
            yAxisID: 'primary',
            borderWidth: 1,
            type: 'line',
            pointRadius: [],
            // backgroundColor: [],
            borderColor: [],
            pointBackgroundColor: [],
            pointBorderColor: [],
            fill: 'origin',
          }
        ],
      },
      chartUpdate: false
    }))
  }

  if (props.costToMineData && state.data && props.costToMineData.breakEven !== state.data.breakEven && props.costToMineData.breakEven > 0) {
    setState((prevState) => ({
      ...prevState,
      data: props.costToMineData,
    }))
    
    setChartData(props.costToMineData);
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
    <div className={classes.root}>
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
      <div className={classes.title}>{ state.hardwareName }</div>
      <Box className={classes.legend} display={{ xs: 'none !important', sm: 'flex !important'}}>
        <div className={classes.legendItem}>
          <div className={classes.legendSymbol} style={{ backgroundColor: "#6B50FF" }}/>
          <div className={classes.legendLabel}>
            {lang[language]['Cost to Mine 1 BTC']}
          </div>
        </div>
        <div className={classes.legendItem}>
          <div className={classes.legendSymbol} style={{ backgroundColor: "green" }}/>
          <div className={classes.legendLabel}>
            <span>{lang[language]['Profit']}</span>
          </div>
        </div>
        <div className={classes.legendItem}>
          <div className={classes.legendSymbol} style={{ backgroundColor: "red" }}/>
          <div className={classes.legendLabel}>
            <span>{lang[language]['Loss']}</span>
          </div>
        </div>
      </Box>
      <div className="chart-wrapper" onMouseOver={(e) => chartMouseHandler(true)} onMouseLeave={(e) => chartMouseHandler(false)}>
        <Scatter
          data={chartData}
          plugins={state.chartPlugins}
          options={state.chartOptions}
        />
      </div>
    </div>
  );
}

const mapStateToProps = store => ({
  costToMineData: store.rootReducer.costToMine.costToMineData,
  isFetching: store.rootReducer.costToMine.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
