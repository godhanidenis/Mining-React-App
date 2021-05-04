import types from '../types';
import api from '../api';

export const getCostToMine = (queryString) => (dispatch) => {
  const msg = 'Fetching';
  const data = {};
  const payload = {data, msg};
  dispatch({
    type: types.GET_COSTTOMINE_REQUEST,
    payload,
  });

  return api.getCostToMine(queryString)
    .then(res => {
      const msg = 'Success!';
      const data = {
        breakEven: res.break_even,
        cost: res.cost,
        costLine: res.cost_line,
        difficulty: res.difficulty,
        electricityList: res.electricity_list,
        hardwareEfficiency: res.hardware_efficiency,
        margin: res.margin,
        price: res.price,
        profitArea: res.profit_area,
        btcMinedDaily: res.btc_mined_daily,
        dailyProfit: res.daily_profit,
      }
      const payload = {...data, msg};
      dispatch({
        type: types.GET_COSTTOMINE_REQUEST_SUCCESS,
        payload,
      });
    
      return payload;
    })
    .catch(err => {
      const msg = 'Failed!';
      const payload = {...err, msg};

      dispatch({
        type: types.GET_COSTTOMINE_REQUEST_FAIL,
        payload,
      });

      throw payload;
    });
};


