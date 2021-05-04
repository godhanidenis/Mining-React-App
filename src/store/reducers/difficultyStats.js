import types from '../types';

const INITIAL_STATE = {
  difficultyStatsData: {
    "difficulty": 0,
    "blocks_epoch": 0,
    "epoch_block_time": 0,
    "estimated_adjustment": 0,
    "estimated_next_diff": 0,
    "adjustment_date": 0,
    "previous_adjustment": 0
  },
  isFetching: false,
  msg: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_DIFFICULTYSTATS_REQUEST:
      return {
        ...state,
        difficultyStatsData: { 
          difficulty: state.difficultyStatsData.difficulty,
          blocks_epoch: state.difficultyStatsData.blocks_epoch,
          epoch_block_time: state.difficultyStatsData.epoch_block_time,
          estimated_adjustment: state.difficultyStatsData.estimated_adjustment,
          estimated_next_diff: state.difficultyStatsData.estimated_next_diff,
          estimated_adjustment_date: state.difficultyStatsData.estimated_adjustment_date,
          previous_adjustment: state.difficultyStatsData.previous_adjustment
        },
        msg: action.payload.msg,
        isFetching: true,
      };
    case types.GET_DIFFICULTYSTATS_REQUEST_SUCCESS:
      return {
        ...state,
        difficultyStatsData: action.payload,
        msg: action.payload.msg,
        isFetching: false,
      };
    case types.GET_DIFFICULTYSTATS_REQUEST_FAIL:
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
