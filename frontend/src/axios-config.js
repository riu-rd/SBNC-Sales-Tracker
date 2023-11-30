import axios from 'axios';

const isDeployment = true;

const instance = axios.create({
  baseURL: isDeployment ? 'https://sbnc-sales-tracker.onrender.com': 'http://localhost:8080',
  withCredentials: true,
});

export default instance;