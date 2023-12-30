import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    Accept: 'application/json',
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default axios;
