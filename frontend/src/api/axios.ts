const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  Authorization: `Bearer ${
    typeof window !== 'undefined' ? window.localStorage.getItem('token') : ''
  }`,
  'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
};

export default headers;
