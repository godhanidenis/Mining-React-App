import types from '../types';

const INITIAL_STATE = {
  profitabilityData: {
    apiDifficulty: 0,
    apiPrice: 0,
    assetChange: 0,
    assets: [],
    avgBreakEven: 0,
    avgCost: 0,
    blockReward: 0,
    breakEven: [],
    cashFlow: [],
    consumption: 0,
    cost: [],
    cumulativeProfit: [],
    diff: [],
    electrictiy: 0,
    finalBtc: 0,
    finalCash: 0,
    hashrate: 0,
    hardware: [],
    initialDifficulty: 0,
    initialPrice: 0,
    month: [],
    poolFee: 0,
    price: [],
    profit: [],
    revenue: [],
    totalBtc: [],
    irr: 0,
    capexBreakEven: 0
  },
  msg: '',
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
   
    case types.GET_PROFITABILITY_REQUEST:
      return {
        ...state,
        msg: action.payload.msg,
        isFetching: true,
      };
    case types.GET_PROFITABILITY_REQUEST_SUCCESS:
      return {
        ...state,
        profitabilityData: action.payload,
        msg: action.payload.msg,
        isFetching: false
      };
    
    case types.GET_PROFITABILITY_REQUEST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        isFetching: false
      };

    // Initial state
    default:
      return state;
  }
}
