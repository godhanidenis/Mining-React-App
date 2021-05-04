import types from '../types';

const INITIAL_STATE = {
  hashRateStatsData: {
    "current_hashrate": 0,
    "hash_value": 0,
    "rev_usd": 0,
    "hash_price": 0,
    "hash_rate_30": 0,
    "avg_fees_per_block": 0,
    "fees_percent": 0
  },
  isFetching: false,
  msg: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_HASHRATESTATS_REQUEST:
      return {
        ...state,
        hashRateStatsData: {
          current_hashrate: state.hashRateStatsData.current_hashrate,
          hash_value: state.hashRateStatsData.hash_value,
          rev_usd: state.hashRateStatsData.rev_usd,
          hash_price: state.hashRateStatsData.hash_price,
          hash_rate_30: state.hashRateStatsData.hash_rate_30,
          avg_fees_per_block: state.hashRateStatsData.avg_fees_per_block,
          fees_percent: state.hashRateStatsData.fees_percent
        },
        msg: action.payload.msg,
        isFetching: true,
      };
    case types.GET_HASHRATESTATS_REQUEST_SUCCESS:
      return {
        ...state,
        hashRateStatsData: action.payload,
        msg: action.payload.msg,
        isFetching: false,
      };
    case types.GET_HASHRATESTATS_REQUEST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        isFetching: false,
      };

    // Initial state
    default:
      return state;
  }
}
