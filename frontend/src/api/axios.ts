const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  Authorization: `Bearer ${
    typeof window !== 'undefined' ? window.localStorage.getItem('token') : ''
  }`,
  'Access-Control-Allow-Origin': 'https://rendyp-book.vercel.app',
};

export default headers;
