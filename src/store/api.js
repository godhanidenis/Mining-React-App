import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let api = {
  getProfitability: (queryString) => axios.get('/api/v0.1/calculator?' + queryString)
    .then(res => res.data),
  getCostToMine: (queryString) => axios.get('/api/v0.1/cost-to-mine?' + queryString)
    .then(res => res.data),
  getDifficultyStats: () => axios.get('/api/v0.1/difficulty-stats')
    .then(res => res.data),
  getHashRateStats: () => axios.get('/api/v0.1/hash-rate-stats')
    .then(res => res.data)    
};

export default api;
