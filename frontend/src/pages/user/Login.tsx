'use client';
import Link from 'next/link';
import { useState } from 'react';
// import { useAuth } from '../../../hooks/auth';
import Preloader from '@/components/Preloader';
import Errors from '@/components/Errors';
import { TError } from '@/types/Types';
import { getBooks, setLogin } from '@/api/services';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<TError>({ message: '' });

  //   const handleSetMainError = (message: string) => {
  //     setMainError({ message: message });
  //   };

  //   const handleSetBodyError = (message: string) => {
  //     setBodyError({ message: message, errors: [] });
  //   };
  //   const { loading, isLoading, user } = useAuth({ middleware: 'guest' });

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const res = await setLogin(email, password);
      console.log(res);
      router.push('/');
    } catch (e: any) {
      console.log(e);
      setError({ message: e });
    }
  };

  //   if (isLoading || user) return <Preloader></Preloader>;
  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <h1 className="text-3xl font-bold text-center text-gray-700">Login</h1>
      <form className="mt-6" onSubmit={handleSignIn}>
        <div className="mb-4">
          <Errors error={error}></Errors>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Login
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-center text-gray-700">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
