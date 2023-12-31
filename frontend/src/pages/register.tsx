import Link from 'next/link';
import { useState } from 'react';
import Preloader from '@/components/Preloader';
import { Errors } from '@/components/Errors';
import { IError } from '@/types/Types';
import { setRegister } from '@/api/services';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError>({ message: '' });
  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await setRegister(name, email, password, passwordConfirmation);
      setError((prev) => ({ ...prev, message: '' }));
      setIsLoading(false);
      toast.success('Registration Success');
      router.replace('/login');
    } catch (e: any) {
      setIsLoading(false);
      setError((prev) => ({ ...prev, message: e }));
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <h1 className="text-3xl font-bold text-center text-gray-700">Register</h1>
      <form className="mt-6" onSubmit={handleLogout}>
        {error.message && (
          <div className="mb-4">
            <Errors error={error.message}></Errors>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-800"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
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
        <div className="flex justify-between gap-2">
          <div className="mb-2 w-full">
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
          <div className="mb-2 w-full">
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        <div className="mt-2">
          {isLoading ? (
            <Preloader></Preloader>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          )}
        </div>
      </form>

      <p className="mt-4 text-sm text-center text-gray-700">
        Already have an account?
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
