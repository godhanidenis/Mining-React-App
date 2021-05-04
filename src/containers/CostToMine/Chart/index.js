import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Scatter } from 'react-chartjs-2';
// import 'chartjs-plugin-annotation';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import Lottie from 'react-lottie';

let animationData = require('../../../loader.json');
let hardwareData = require('../../../hardware.json');
let chartReference = {}
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

let checkLine = 'line'
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
    top: 45,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 600,
  },
  bottomText: {
    color: '#fff',
    fontWeight: 600
  },
  subTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 600,
  },
  btnConfirm: {
    background: '#6B50FF !important',
    borderRadius: '0',
    color: '#B8B8B8',
    fontSize: '14px',
    marginLeft: '114px !important',
    textTransform: 'capitalize',
  },
  btnLabel: {
    display: 'block',
    textAlign: 'left',
    color: '#fff'
  },
}));

let positive = []
let negative = []

const Chart = (props) => {

  const classes = useStyles(props);
  const chartRef = useRef(null)
  const matches = useMediaQuery('(max-width:767px)');

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
    pointRadius: 3,
    storage: [],
    hardwareName: Object.keys(hardwareData)[1] + ' / ' + Object.keys(hardwareData[Object.keys(hardwareData)[1]])[0]
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
  let xaxis_gridline_colours = [];
  let yaxis_gridline_colours = [];
  let rightCostLine = []

  const setChartOption = (lineMin, lineMax, breakEven, storage) => {
    // color array to display gridlines of xaxis at 0.02 and yaxis at 10000 increment
    for (let i = 0; i < xPoints.length; i++) {
      if (i % 2 == 0) {
        xaxis_gridline_colours.push("#525252");
        yaxis_gridline_colours.push("#525252");
      }
      else {
        xaxis_gridline_colours.push("#161616");
        yaxis_gridline_colours.push("");
      }
    }
    // Draw diagonal upto btc_price
    // costLineStorage[costLineStorage.length - 1]['y'] = storage[0]['y']
    setState((prevState) => ({
      ...prevState,
      chartOptions: {
        annotation: {
          drawTime: 'afterDatasetsDraw',
          annotations: [
            {
              /*Add this to show diagonal line*/
              drawTime: 'afterDatasetsDraw',
              // id: 'be_line',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'primary',
              value: costLineStorage[0]['y'],
              endValue: costLineStorage[costLineStorage.length - 1]['y'],
              borderColor: '#6B50FF',
              borderWidth: 2.5,
              label: {
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                content: breakEven.toFixed(3).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }),
                enabled: false,
                xAdjust: -50,
                yAdjust: 30,
                position: 'top',
                fontSize: matches ? 8 : 14
              },
            },
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
                fontSize: matches ? 8 : 14
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
                xAdjust: -350,
                yAdjust: matches ? 8 : -15,
                position: 'right',
                fontSize: matches ? 8 : 14
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
          // align: 'start',
          // labels: {
          //   usePointStyle: false,
          //   fontColor: 'white',
          //   position: 'left',
          //   boxWidth: 20,
          //   padding: 20
          // }, 
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
                labelString: 'Cost to Mine 1 BTC',
                fontSize: matches ? 8 : 14,
                fontColor: 'white',
                // fontFamily: 'sans-serif',
              },
              ticks: {
                stepSize: 10000,
                suggestedMax: storage[0]['y'] + 10000,
                display: !isMobileDevice(),
                callback: function (value, index, values) {
                  if (storage[0]['y'] + 11000 >= value) {
                    return value.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    });
                  }
                },
                beginAtZero: true,
                fontColor: 'white',
                // reverse: false,
                // stepSize: 5000,
                // autoSkip: true,
                // // min: 0,
                maxTicksLimit: 30,
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
                labelString: 'Profit/Loss (USD)',
                fontSize: matches ? 8 : 14,
                fontColor: 'white',
              },
              ticks: {
                stepSize: 10000,
                display: !isMobileDevice(),
                callback: function (value, index, values) {
                  if (storage[0]['y'] + 11000 >= value) {
                    return value.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    });
                  }
                },
                suggestedMax: storage[0]['y'] + 10000,
                beginAtZero: true,
                fontColor: 'white',
                maxTicksLimit: 30,
              },
              gridLines: {
                color: yaxis_gridline_colours,
              },
            },
          ],
          xAxes: [
            {
              id: 'x-axis',
              scaleLabel: {
                display: !isMobileDevice(),
                labelString: 'Electricity Price (USD)',
                fontSize: matches ? 8 : 14,
                fontColor: 'white',
              },
              ticks: {
                stepSize: 0.01,
                // suggestedMin: 0,
                // suggestedMax: 0.15
              },
              gridLines: {
                color: xaxis_gridline_colours,
              },
            },
          ],
        },
      },
      chartData: {
        datasets: [
          {
            label: 'Cost to Mine 1 BTC',
            data: storage,
            yAxisID: 'primary',
            borderWidth: 1,
            type: 'line',
            pointRadius: 1,
            // backgroundColor: '#6B50FF',
            // borderColor: '#6B50FF',
            // pointBackgroundColor: '#6B50FF',
            // pointBorderColor: '#6B50FF',
            fill: 'origin',
          },
          {
            label: 'Cost line',
            data: rightCostLine,
            yAxisID: 'primary',
            borderWidth: 3,
            type: 'line',
            pointRadius: pointRadius,
            // backgroundColor: 'green',
            borderColor: '#6B50FF',
            pointBackgroundColor: '#6B50FF',
            pointBorderColor: '#6B50FF',
            fill: 'origin',
            order: 0
          },
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
        rightCostLine.push(coordinates)
        if (coordinates['y'] > 0) {
          positive.push(coordinates)
        }
        else {
          negative.push(coordinates)
        }
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
    let coordinates = {}
    if (chartData && chartData.datasets && chartData.datasets.length > 0) {
      if (isHover) {
        for (let i = 0; i < chartData.datasets[0].data.length; i++) {
          if (chartData.datasets[0].data[i]['y'] > 0) {
            // console.log(chartData.datasets[0].data[i]['y'])
            // console.log(state.storage[i][])
            colors.push('green');
          } else {
            colors.push('red');
          }
          pointRadius = 3;
        }
      }
      setState((prevState) => ({
        ...prevState,
        chartData: {
          datasets: [
            {
              label: 'Cost to Mine 1 BTC',
              data: state.storage,
              yAxisID: 'primary',
              borderWidth: 1,
              type: 'line',
              pointRadius: pointRadius,
              // backgroundColor: [],
              // borderColor: colors,
              pointBackgroundColor: colors,
              // pointBorderColor: colors,
              fill: 'origin',
            },
            // {
            //   label: 'Profit',
            //   data: positive,
            //   yAxisID: 'primary',
            //   borderWidth: 1,
            //   type: 'line',
            //   pointRadius: 0,
            //   // backgroundColor: [],
            //   borderColor: 'green',
            //   pointBackgroundColor: 'green',
            //   pointBorderColor: 'green',
            //   fill: 'origin',
            // },
            // {
            //   label: 'Loss',
            //   data: negative,
            //   yAxisID: 'primary',
            //   borderWidth: 1,
            //   type: 'line',
            //   pointRadius: 0,
            //   // backgroundColor: [],
            //   borderColor: 'red',
            //   pointBackgroundColor: 'red',
            //   pointBorderColor: 'red',
            //   fill: 'origin',
            // },
          ],
        },
        chartUpdate: false
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
            label: 'Cost to Mine 1 BTC',
            data: state.storage,
            yAxisID: 'primary',
            borderWidth: 1,
            type: 'line',
            pointRadius: 1,
            // backgroundColor: [],
            // borderColor: [],
            // pointBackgroundColor: [],
            // pointBorderColor: [],
            fill: 'origin',
            align: 'start'
          },
          // {
          //   label: 'Profit',
          //   data: positive,
          //   yAxisID: 'primary',
          //   borderWidth: 1,
          //   type: 'line',
          //   pointRadius: 1,
          //   // backgroundColor: [],
          //   borderColor: 'green',
          //   pointBackgroundColor: 'green',
          //   pointBorderColor: 'green',
          //   fill: 'origin',
          //   align: 'start'
          // },
          // {
          //   label: 'Loss',
          //   data: negative,
          //   yAxisID: 'primary',
          //   borderWidth: 1,
          //   type: 'line',
          //   pointRadius: 1,
          //   // backgroundColor: [],
          //   borderColor: 'red',
          //   pointBackgroundColor: 'red',
          //   pointBorderColor: 'red',
          //   fill: 'origin',
          //   align: 'start'
          // },
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
  // set annotation and update chart
  const updateAnnotation = (chart) => {
    chart.options.annotation.annotations[0]['type'] = checkLine
    chart.update();
  }

  //cost to mine btc on/off function
  const costClick = () => {
    let element = document.getElementById('cost_mine')
    if (checkLine === 'line') {
      element.style.textDecoration = 'line-through'
      checkLine = ''
      state.chartOptions.annotation.annotations[0]['type'] = ''
      updateAnnotation(chartRef.current.chartInstance)
    }
    else {
      element.style.textDecoration = 'none'
      checkLine = 'line'
      state.chartOptions.annotation.annotations[0]['type'] = 'line'
      updateAnnotation(chartRef.current.chartInstance)
    }
  }

  // handle mouse over on  cost to mine
  const handleMouseEvent = () => {
    let element_symbol = document.getElementById('cost_symbol')
    element_symbol.style.cursor = 'pointer'
  }

  return (
    <div className={classes.root}>
      { props.isFetching && (
        <div>
          <div className={classes.overlay}></div>
          <div className={classes.loader}>
            <Lottie
              options={loaderOptions}
              height={matches ? 80 : 200}
              width={matches ? 80 : 200} />
          </div>
        </div>
      )
      }
      <div className={classes.title + ' title'}>{state.hardwareName}</div>
      <Box className={classes.legend} display={{ xs: 'none !important', sm: 'flex !important' }}>
        <div id="cost_symbol" onMouseOver={handleMouseEvent} className={classes.legendItem}>
          <div onClick={costClick} className={classes.legendSymbol} style={{ backgroundColor: "#6B50FF" }} />
          <div onMouseOver={handleMouseEvent} onClick={costClick} className={classes.legendLabel} id="cost_mine">Cost to Mine 1 BTC</div>
        </div>
        <div className={classes.legendItem}>
          <div className={classes.legendSymbol} style={{ backgroundColor: "green" }} />
          <div className={classes.legendLabel}>Profit</div>
        </div>
        <div className={classes.legendItem}>
          <div className={classes.legendSymbol} style={{ backgroundColor: "red" }} />
          <div className={classes.legendLabel}>Loss</div>
        </div>
      </Box>
      <div className="chart-wrapper" onMouseOver={(e) => chartMouseHandler(true)} onMouseLeave={(e) => chartMouseHandler(false)}>
        <Scatter
          data={chartData}
          plugins={state.chartPlugins}
          options={state.chartOptions}
          ref={chartRef}
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