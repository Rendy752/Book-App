import axios, { AxiosError } from 'axios';
// import api from './axios';
import headers from './axios';
import { redirect } from 'next/navigation';

const ENDPOINT = {
  login: '/api/login',
  books: '/api/books',
};

export const setLogin = async (email: string, password: string) => {
  // console.log(api);
  try {
    // console.log(headers);
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.login,
      {
        email: email,
        password: password,
      },
      { headers },
    );
    // console.log(res);
    localStorage.setItem('token', res.data.token);
    redirect('/');
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      // const status = e.response!.status;
      // const code = e.code;
      const message = e.response!.data.message;
      // console.log(e, status, code, message);
      return message;
    }
    return e;
  }
};

export const getBooks = async () => {
  console.log(localStorage.getItem('token'));
  // console.log(api);
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.books,
      { headers },
    );
    console.log(res);
    console.log(res.data);
    return res.data;
  } catch (err) {
    return false;
  }
};
