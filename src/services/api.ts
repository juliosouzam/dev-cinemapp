import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.omdbapi.com',
  params: {
    apikey: process.env.REACT_APP_API_KEY,
  },
});

export default api;
