import axios, { AxiosError } from 'axios';
// import api from './axios';
import headers from './axios';
import { redirect } from 'next/navigation';

const ENDPOINT = {
  register: '/api/register',
  login: '/api/login',
  profile: '/api/user',
  logout: '/api/user/logout',
  books: '/api/books',
};

export const setRegister = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.register,
      {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      },
      { headers },
    );
    return Promise.resolve(res.data);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const message = e.response!.data.message;
      return Promise.reject(message);
    }
    return Promise.reject(e);
  }
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
    return Promise.resolve(res.data);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      // const status = e.response!.status;
      // const code = e.code;
      const message = e.response!.data.message;
      // console.log(e, status, code, message);
      return Promise.reject(message);
    }
    return Promise.reject(e);
  }
};

export const getProfile = async () => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.profile,
      { headers },
    );
    // console.log(res);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const setLogout = async () => {
  try {
    const res = await axios.delete(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.logout,
      { headers },
    );
    // console.log(res);
    const checkLocalStorage =
      typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    if (checkLocalStorage) localStorage.removeItem('token');
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getBooks = async () => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.books,
      { headers },
    );
    // console.log(res);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
