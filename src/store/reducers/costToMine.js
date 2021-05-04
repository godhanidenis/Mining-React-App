import types from '../types';

const INITIAL_STATE = {
  costToMineData: {
    breakEven: 0,
    cost: 0,
    costLine: [],
    difficulty: 0,
    electricityList: [],
    hardwareEfficiency: 0,
    margin: 0,
    price: 0,
    profitArea: [],
    btcMinedDaily: 0,
    dailyProfit: 0,
  },
  isFetching: false,
  msg: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_COSTTOMINE_REQUEST:
      return {
        ...state,
        costToMineData: { 
          breakEven: state.costToMineData.breakEven,
          cost: state.costToMineData.cost,
          costLine: [],
          difficulty: state.costToMineData.difficulty,
          electricityList: [],
          hardwareEfficiency: state.costToMineData.hardwareEfficiency,
          margin: state.costToMineData.margin,
          price: state.costToMineData.price,
          profitArea: [],
          btcMinedDaily: state.costToMineData.btcMinedDaily,
          dailyProfit: state.costToMineData.dailyProfit,
        },
        msg: action.payload.msg,
        isFetching: true,
      };
    case types.GET_COSTTOMINE_REQUEST_SUCCESS:
      return {
        ...state,
        costToMineData: action.payload,
        msg: action.payload.msg,
        isFetching: false,
      };
    case types.GET_COSTTOMINE_REQUEST_FAIL:
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
