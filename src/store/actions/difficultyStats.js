import types from '../types';
import api from '../api';

export const getDifficultyStats = () => (dispatch) => {
  const msg = 'Fetching';
  const data = {};
  const payload = {data, msg};
  dispatch({
    type: types.GET_DIFFICULTYSTATS_REQUEST,
    payload,
  });

  return api.getDifficultyStats()
    .then(res => {
      const msg = 'Success!';
      const data = {
        "difficulty": res.difficulty,
        "blocks_epoch": res.blocks_epoch,
        "epoch_block_time": res.epoch_block_time,
        "estimated_adjustment": res.estimated_adjustment,
        "estimated_next_diff": res.estimated_next_diff,
        "estimated_adjustment_date": res.estimated_adjustment_date,
        "previous_adjustment": res.previous_adjustment
      }
      const payload = {...data, msg};
      dispatch({
        type: types.GET_DIFFICULTYSTATS_REQUEST_SUCCESS,
        payload,
      });
    
      return payload;
    })
    .catch(err => {
      const msg = 'Failed!';
      const payload = {...err, msg};

      dispatch({
        type: types.GET_DIFFICULTYSTATS_REQUEST_FAIL,
        payload,
      });

      throw payload;
    });
};
