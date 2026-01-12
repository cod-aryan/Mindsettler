import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Your backend entry point
  withCredentials: true,               // Essential for JWT Cookies
});

export default API;