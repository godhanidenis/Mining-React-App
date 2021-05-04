import types from '../types';
import api from '../api';

export const getHashRateStats = () => (dispatch) => {
  const msg = 'Fetching';
  const data = {};
  const payload = {data, msg};
  dispatch({
    type: types.GET_HASHRATESTATS_REQUEST,
    payload,
  });

  return api.getHashRateStats()
    .then(res => {
      const msg = 'Success!';
      const data = {
        "current_hashrate": res.current_hashrate,
        "hash_value": res.hash_value,
        "rev_usd": res.rev_usd,
        "hash_price": res.hash_price,
        "hash_rate_30": res.hash_rate_30,
        "avg_fees_per_block": res.avg_fees_per_block,
        "fees_percent": res.fees_percent
      }
      const payload = {...data, msg};
      dispatch({
        type: types.GET_HASHRATESTATS_REQUEST_SUCCESS,
        payload,
      });
    
      return payload;
    })
    .catch(err => {
      const msg = 'Failed!';
      const payload = {...err, msg};

      dispatch({
        type: types.GET_HASHRATESTATS_REQUEST_FAIL,
        payload,
      });

      throw payload;
    });
};
