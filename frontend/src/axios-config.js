import axios from 'axios';

const isDeployment = true;

const instance = axios.create({
  baseURL: isDeployment ? 'https://sbnc-tracker-api.onrender.com': 'http://localhost:8080',
  withCredentials: true,
});

axios.defaults.withCredentials = true;

export default instance;