import types from '../types';
import api from '../api';

export const getProfitability = (queryString) => (dispatch) => {
  const msg = 'Fetching';
  const data = {};
  const payload = {data, msg};
  dispatch({
    type: types.GET_PROFITABILITY_REQUEST,
    payload,
  });
  
  return api.getProfitability(queryString)
    .then(res => {
      if (typeof res === 'string' && !(queryString.includes('download')))
        res = eval('('+res+')' );
      const msg = 'Success!';
      const data = {
        apiDifficulty: res.api_difficulty,
        apiPrice: res.api_price,
        assetChange: res.asset_change,
        assets: res.assets,
        avgBreakEven: res.avg_break_even,
        avgCost: res.avg_cost,
        blockReward: res.block_reward,
        breakEven: res.break_even,
        cashFlow: res.cash_flow_list,
        consumption: res.consumption,
        cost: res.cost,
        cumulativeProfit: res.cumulative_profit,
        diff: res.diff,
        electrictiy: res.electrictiy,
        finalBtc: res.final_btc,
        finalCash: res.final_cash,
        hashrate: res.hashrate,
        hardware: res.hardware,
        initialDifficulty: res.initial_difficulty,
        initialPrice: res.initial_price,
        month: res.month,
        poolFee: res.pool_fee,
        price: res.price,
        profit: res.profit,
        revenue: res.revenue,
        totalBtc: res.total_btc,
        irr: res.irr,
        capexBreakEven: res.capex_breakeven
      }
      const payload = {...data, msg};
      dispatch({
        type: types.GET_PROFITABILITY_REQUEST_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      //console.log(err);
      const msg = 'Failed!';
      const payload = {...err, msg};

      dispatch({
        type: types.GET_PROFITABILITY_REQUEST_FAIL,
        payload,
      });

      throw payload;
  });
};