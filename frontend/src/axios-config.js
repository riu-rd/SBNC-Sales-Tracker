import axios from 'axios';

const isDeployment = true;

const instance = axios.create({
  baseURL: isDeployment ? 'https://sbnc-sales-tracker.onrender.com': 'http://localhost:8080',
});

// Set global configuration for all axios instances
instance.defaults.withCredentials = true;

export default instance;