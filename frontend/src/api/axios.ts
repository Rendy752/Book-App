import Axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
  // 'Access-Control-Allow-Credentials': true,

  // 'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',

  // 'Access-Control-Allow-Headers':
  //   'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
};

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers,
  withCredentials: true,
});

export default headers;
