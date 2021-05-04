import { combineReducers } from 'redux';

import home from './home';
import profitabilityCalculator from './profitabilityCalculator';
import costToMine from './costToMine';
import difficultyStats from './difficultyStats';
import hashRateStats from './hashRateStats';

export default combineReducers({
  home,
  profitabilityCalculator,
  costToMine,
  difficultyStats,
  hashRateStats
});