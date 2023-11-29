import axios from 'axios';

const isDevelopment = 'development';

const instance = axios.create({
  baseURL: isDevelopment === 'development' ? 'http://localhost:8080' : '/',
  withCredentials: true,
});

export default instance;