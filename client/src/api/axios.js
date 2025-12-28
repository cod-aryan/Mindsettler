import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:4000/api", // Your backend entry point
  withCredentials: true,               // Essential for JWT Cookies
});

export default API;